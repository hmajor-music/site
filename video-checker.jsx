// ── Video pre-check: client-side MP4 metadata analysis ──────────
// TASCAM BD-MP1MKII（会場の再生機）の仕様に基づき、動画ファイルを
// アップロードせずブラウザ内だけで解析し、推奨/再生可能/要修正を判定する。
//
// サーバーへは一切送信しない。File.slice() で必要なバイト範囲だけを
// 読み、ISO Base Media File Format(MP4/MOVの共通コンテナ構造)の
// box(ftyp/moov/trak/stsd/stts/stsz 等)を手動でパースして、
// コーデック・解像度・フレームレート・ビットレート・音声仕様を求める。
//
// <video>要素のメタデータ(videoWidth/videoHeight程度)だけでは
// コーデック種別やフレームレート、ビットレートまでは取得できないため、
// コンテナを直接読む方式にしている。

// ---- low-level box parsing --------------------------------------

function readFourCC(dv, offset) {
  return String.fromCharCode(
    dv.getUint8(offset), dv.getUint8(offset + 1), dv.getUint8(offset + 2), dv.getUint8(offset + 3)
  );
}

// dv 内の [start, end) 範囲にある box を1階層分だけ列挙する
function parseBoxes(dv, start, end) {
  const boxes = [];
  let offset = start;
  while (offset + 8 <= end) {
    let size = dv.getUint32(offset, false);
    const type = readFourCC(dv, offset + 4);
    let headerSize = 8;
    if (size === 1) {
      if (offset + 16 > end) break;
      const hi = dv.getUint32(offset + 8, false);
      const lo = dv.getUint32(offset + 12, false);
      size = hi * 4294967296 + lo;
      headerSize = 16;
    } else if (size === 0) {
      size = end - offset;
    }
    if (size < headerSize || offset + size > end) break;
    boxes.push({ type, start: offset, size, headerSize, bodyStart: offset + headerSize, bodyEnd: offset + size });
    offset += size;
  }
  return boxes;
}

// ファイル先頭からトップレベルのbox(ftyp/moov/mdat等)を、
// ヘッダーだけ読みながら列挙する(動画本体=mdatは読み込まない)
async function findTopLevelBoxes(file) {
  const boxes = [];
  let offset = 0;
  const fileSize = file.size;
  while (offset + 8 <= fileSize && boxes.length < 5000) {
    const headBuf = await file.slice(offset, Math.min(offset + 16, fileSize)).arrayBuffer();
    if (headBuf.byteLength < 8) break;
    const dv = new DataView(headBuf);
    let size = dv.getUint32(0, false);
    const type = readFourCC(dv, 4);
    let headerSize = 8;
    if (size === 1) {
      if (headBuf.byteLength < 16) break;
      const hi = dv.getUint32(8, false);
      const lo = dv.getUint32(12, false);
      size = hi * 4294967296 + lo;
      headerSize = 16;
    } else if (size === 0) {
      size = fileSize - offset;
    }
    if (size < headerSize) break;
    boxes.push({ type, start: offset, size, headerSize });
    offset += size;
  }
  return boxes;
}

function parseMdhd(dv, box) {
  const version = dv.getUint8(box.bodyStart);
  if (version === 1) {
    const timescale = dv.getUint32(box.bodyStart + 20, false);
    const hi = dv.getUint32(box.bodyStart + 24, false);
    const lo = dv.getUint32(box.bodyStart + 28, false);
    return { timescale, duration: hi * 4294967296 + lo };
  }
  const timescale = dv.getUint32(box.bodyStart + 12, false);
  const duration = dv.getUint32(box.bodyStart + 16, false);
  return { timescale, duration };
}

function computeFps(dv, sttsBox, trackDurationSec) {
  if (!trackDurationSec) return 0;
  const entryCount = dv.getUint32(sttsBox.bodyStart + 4, false);
  let totalSamples = 0;
  let offset = sttsBox.bodyStart + 8;
  for (let i = 0; i < entryCount; i++) {
    totalSamples += dv.getUint32(offset, false);
    offset += 8;
  }
  return totalSamples / trackDurationSec;
}

function sumSampleSizes(dv, stszBox) {
  const sampleSize = dv.getUint32(stszBox.bodyStart + 4, false);
  const sampleCount = dv.getUint32(stszBox.bodyStart + 8, false);
  if (sampleSize !== 0) return sampleSize * sampleCount;
  let total = 0;
  let offset = stszBox.bodyStart + 12;
  for (let i = 0; i < sampleCount; i++) {
    total += dv.getUint32(offset, false);
    offset += 4;
  }
  return total;
}

function sniffNonIsoContainer(bytes) {
  if (bytes.length >= 4 && String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === 'RIFF') {
    return 'AVI形式です。MP4（H.264）で書き出し直してください。';
  }
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) {
    return 'WebM / Matroska形式です。MP4（H.264）で書き出し直してください。';
  }
  if (bytes.length >= 4 && bytes[0] === 0x30 && bytes[1] === 0x26 && bytes[2] === 0xb2 && bytes[3] === 0x75) {
    return 'WMV（ASF）形式です。MP4（H.264）で書き出し直してください。';
  }
  return null;
}

function codecLabel(fourcc) {
  const map = { hvc1: 'H.265 / HEVC', hev1: 'H.265 / HEVC', mp4v: 'MPEG-4 Visual', vp09: 'VP9', av01: 'AV1' };
  return map[fourcc] || fourcc;
}

// ---- metadata extraction -----------------------------------------

async function analyzeVideoFile(file) {
  const headBytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const nonIsoIssue = sniffNonIsoContainer(headBytes);
  if (nonIsoIssue) {
    return { formatIssue: nonIsoIssue, videoCodecIssue: null, audioIssue: null, video: null, audio: null };
  }

  const topBoxes = await findTopLevelBoxes(file);
  const ftypBox = topBoxes.find((b) => b.type === 'ftyp');
  const moovBox = topBoxes.find((b) => b.type === 'moov');

  if (!moovBox) {
    return {
      formatIssue: '動画情報を読み取れませんでした（未対応の形式か、壊れたファイルの可能性があります）。',
      videoCodecIssue: null, audioIssue: null, video: null, audio: null,
    };
  }

  let formatIssue = null;
  if (ftypBox) {
    const ftypBuf = await file.slice(ftypBox.start, ftypBox.start + Math.min(ftypBox.size, 16)).arrayBuffer();
    if (ftypBuf.byteLength >= ftypBox.headerSize + 4) {
      const majorBrand = readFourCC(new DataView(ftypBuf), ftypBox.headerSize);
      if (majorBrand === 'qt  ') {
        formatIssue = 'QuickTime（MOV）形式です。MP4（H.264）で書き出し直してください。';
      }
    }
  }

  const moovBuf = await file.slice(moovBox.start, moovBox.start + moovBox.size).arrayBuffer();
  const dv = new DataView(moovBuf);
  const moovChildren = parseBoxes(dv, moovBox.headerSize, moovBuf.byteLength);

  let videoTrack = null;
  let audioTrack = null;

  for (const trak of moovChildren.filter((b) => b.type === 'trak')) {
    const trakChildren = parseBoxes(dv, trak.bodyStart, trak.bodyEnd);
    const mdia = trakChildren.find((b) => b.type === 'mdia');
    if (!mdia) continue;
    const mdiaChildren = parseBoxes(dv, mdia.bodyStart, mdia.bodyEnd);
    const hdlr = mdiaChildren.find((b) => b.type === 'hdlr');
    const mdhd = mdiaChildren.find((b) => b.type === 'mdhd');
    const minf = mdiaChildren.find((b) => b.type === 'minf');
    if (!hdlr || !mdhd || !minf) continue;

    const handlerType = readFourCC(dv, hdlr.bodyStart + 8);
    const { timescale, duration } = parseMdhd(dv, mdhd);
    const trackDurationSec = timescale ? duration / timescale : 0;

    const minfChildren = parseBoxes(dv, minf.bodyStart, minf.bodyEnd);
    const stbl = minfChildren.find((b) => b.type === 'stbl');
    if (!stbl) continue;
    const stblChildren = parseBoxes(dv, stbl.bodyStart, stbl.bodyEnd);
    const stsd = stblChildren.find((b) => b.type === 'stsd');
    const stts = stblChildren.find((b) => b.type === 'stts');
    const stsz = stblChildren.find((b) => b.type === 'stsz');
    if (!stsd) continue;

    const entryStart = stsd.bodyStart + 8; // version(1)+flags(3)+entry_count(4), 先頭1エントリのみ見る
    const codec = readFourCC(dv, entryStart + 4);

    if (handlerType === 'vide' && !videoTrack) {
      const width = dv.getUint16(entryStart + 32, false);
      const height = dv.getUint16(entryStart + 34, false);
      const fps = stts ? computeFps(dv, stts, trackDurationSec) : 0;
      const totalBytes = stsz ? sumSampleSizes(dv, stsz) : 0;
      const bitrateMbps = trackDurationSec > 0 ? (totalBytes * 8) / trackDurationSec / 1e6 : 0;
      videoTrack = { codec, width, height, fps, bitrateMbps };
    } else if (handlerType === 'soun' && !audioTrack) {
      const channels = dv.getUint16(entryStart + 24, false);
      const sampleRate = dv.getUint32(entryStart + 32, false) >>> 16;
      audioTrack = { codec, channels, sampleRate };
    }
  }

  const videoCodecIssue = !videoTrack
    ? '映像トラックが見つかりません。'
    : (['avc1', 'avc3'].includes(videoTrack.codec) ? null : `映像コーデックが H.264 ではありません（検出: ${codecLabel(videoTrack.codec)}）。`);

  const audioIssue = !audioTrack
    ? '音声トラックがありません。'
    : (audioTrack.codec === 'mp4a' ? null : `音声コーデックが AAC ではありません（検出: ${audioTrack.codec}）。`);

  return { formatIssue, videoCodecIssue, audioIssue, video: videoTrack, audio: audioTrack };
}

// ---- classification -----------------------------------------------

function fmtFps(fps) {
  return `${fps.toFixed(2)}fps`;
}

function classifyVideo(meta) {
  const redIssues = [];
  if (meta.formatIssue) redIssues.push(meta.formatIssue);
  if (meta.videoCodecIssue) redIssues.push(meta.videoCodecIssue);
  if (meta.audioIssue) redIssues.push(meta.audioIssue);

  if (meta.video) {
    if (meta.video.width > 1920 || meta.video.height > 1080) {
      redIssues.push(`解像度が ${meta.video.width}×${meta.video.height} です（1920×1080を超えています）。`);
    }
    if (meta.video.fps >= 60) {
      redIssues.push(`フレームレートが ${fmtFps(meta.video.fps)} です（60fps以上）。`);
    }
  }

  if (redIssues.length > 0 || !meta.video) {
    return { tier: 'fix', issues: redIssues.length ? redIssues : ['動画情報を解析できませんでした。'] };
  }

  const { width: w, height: h, fps, bitrateMbps: br } = meta.video;
  const audio = meta.audio;

  const isGoldRes = w === 1920 && h === 1080;
  const isGoldFps = fps >= 29.97 && fps <= 30.03;
  const isGoldBitrate = br >= 8 && br <= 16;
  const isGoldAudio = !!audio && audio.sampleRate === 48000 && audio.channels === 2;

  if (isGoldRes && isGoldFps && isGoldBitrate && isGoldAudio) {
    return { tier: 'recommended', issues: [] };
  }

  const isOkRes = w >= 1280 && h >= 720 && !isGoldRes;
  const isOkFps = fps >= 24 && fps <= 30.03;
  const isOkBitrate = br >= 3 && br < 8;

  if (isOkRes && isOkFps && isOkBitrate) {
    return { tier: 'ok', issues: [] };
  }

  const mismatches = [];
  if (!isGoldRes && !isOkRes) mismatches.push(`解像度: ${w}×${h}（推奨 1920×1080 / 可 1280×720〜）`);
  if (!isGoldFps && !isOkFps) mismatches.push(`フレームレート: ${fmtFps(fps)}（推奨 30fps付近）`);
  if (!isGoldBitrate && !isOkBitrate) mismatches.push(`映像ビットレート: ${br.toFixed(1)}Mbps（推奨 8〜16Mbps）`);
  if (!isGoldAudio) mismatches.push(`音声: ${audio.sampleRate / 1000}kHz / ${audio.channels}ch（推奨 48kHz ステレオ）`);
  return { tier: 'fix', issues: mismatches.length ? mismatches : ['会場の推奨設定から外れています。'] };
}

// ---- UI --------------------------------------------------------

const TIER_META = {
  recommended: {
    label: '🟢 推奨',
    box: 'border-goldDeep bg-cream/40',
    text: 'text-goldDeep',
    message: '会場の推奨設定を満たしています。このままご提出いただけます。',
  },
  ok: {
    label: '🟡 再生可能',
    box: 'border-gold bg-cream/30',
    text: 'text-goldDeep',
    message: '再生可能な設定です。',
  },
  fix: {
    label: '🔴 要修正',
    box: 'border-red-300 bg-red-50',
    text: 'text-red-600',
    message: '再生機器で正常に表示されません。指定のフォーマットで再書き出しをお願いします。',
  },
};

function VideoCheckResult({ fileName, meta, verdict }) {
  const t = TIER_META[verdict.tier];
  return (
    <div className={`mt-6 border ${t.box} px-5 sm:px-7 py-5 sm:py-6`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className={`font-mincho text-base sm:text-[17px] ${t.text}`}>{t.label}</span>
        <span className="font-gothic text-muted text-[11px] truncate max-w-[220px]">{fileName}</span>
      </div>
      <p className={`font-gothic mt-2.5 text-[12.5px] ${t.text}`}>{t.message}</p>

      {verdict.issues.length > 0 && (
        <ul className="mt-3.5 flex flex-col gap-1.5">
          {verdict.issues.map((issue, i) => (
            <li key={i} className="font-gothic text-red-600 text-[11.5px] flex items-start gap-2">
              <IconClose size={13} className="shrink-0 mt-0.5" />
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      )}

      {meta && meta.video && (
        <div className="mt-5 pt-4 border-t border-line/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>解像度</span>
            <span className="font-gothic text-ink/80 text-[12px]">{meta.video.width}×{meta.video.height}</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>フレームレート</span>
            <span className="font-gothic text-ink/80 text-[12px]">{fmtFps(meta.video.fps)}</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>映像ビットレート</span>
            <span className="font-gothic text-ink/80 text-[12px]">{meta.video.bitrateMbps.toFixed(1)}Mbps</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>音声</span>
            <span className="font-gothic text-ink/80 text-[12px]">
              {meta.audio ? `${meta.audio.sampleRate / 1000}kHz / ${meta.audio.channels}ch` : 'なし'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoChecker() {
  const [status, setStatus] = React.useState('idle'); // idle | loading | done
  const [fileName, setFileName] = React.useState('');
  const [result, setResult] = React.useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setStatus('loading');
    setFileName(file.name);
    setResult(null);
    try {
      const meta = await analyzeVideoFile(file);
      setResult({ meta, verdict: classifyVideo(meta) });
    } catch (e) {
      setResult({
        meta: null,
        verdict: { tier: 'fix', issues: ['動画情報を解析できませんでした。ファイル形式をご確認ください。'] },
      });
    }
    setStatus('done');
  };

  return (
    <div className="bg-white border border-line p-6 sm:p-9">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-goldDeep"><IconUpload size={18} /></span>
        <h3 className="font-mincho text-ink text-base sm:text-[17px]">動画ファイルを事前チェック</h3>
      </div>
      <p className="font-gothic text-ink/60 leading-relaxed text-[11.5px] sm:text-[12px] mb-5">
        提出前にお手元の動画ファイルを選択すると、会場の再生機器での適合状況をブラウザ上だけで判定します。ファイルはどこにもアップロードされません。
      </p>

      <label className="inline-flex items-center gap-2.5 cursor-pointer bg-ink text-ivory px-5 sm:px-6 py-3 font-gothic text-[12px] sm:text-[12.5px] transition-colors duration-300 hover:bg-ink/85">
        <IconUpload size={15} />
        動画ファイルを選択
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files && e.target.files[0])}
        />
      </label>

      {status === 'loading' && (
        <div className="mt-5 font-gothic text-muted text-[12px] flex items-center gap-2">
          <span className="anim-dot">●</span> 解析しています…
        </div>
      )}

      {status === 'done' && result && (
        <VideoCheckResult fileName={fileName} meta={result.meta} verdict={result.verdict} />
      )}
    </div>
  );
}

Object.assign(window, { VideoChecker, analyzeVideoFile, classifyVideo });

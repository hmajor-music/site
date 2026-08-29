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
    return T('AVI形式です。MP4（H.264）で書き出し直してください。', 'This is an AVI file. Please re-export as MP4 (H.264).');
  }
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) {
    return T('WebM / Matroska形式です。MP4（H.264）で書き出し直してください。', 'This is a WebM / Matroska file. Please re-export as MP4 (H.264).');
  }
  if (bytes.length >= 4 && bytes[0] === 0x30 && bytes[1] === 0x26 && bytes[2] === 0xb2 && bytes[3] === 0x75) {
    return T('WMV（ASF）形式です。MP4（H.264）で書き出し直してください。', 'This is a WMV (ASF) file. Please re-export as MP4 (H.264).');
  }
  return null;
}

function codecLabel(fourcc) {
  const map = {
    avc1: 'H.264 / AVC', avc3: 'H.264 / AVC',
    hvc1: 'H.265 / HEVC', hev1: 'H.265 / HEVC',
    mp4v: 'MPEG-4 Visual', vp09: 'VP9', av01: 'AV1',
  };
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
      formatIssue: T('動画情報を読み取れませんでした（未対応の形式か、壊れたファイルの可能性があります）。', 'Could not read the video metadata (the format may be unsupported, or the file may be corrupted).'),
      videoCodecIssue: null, audioIssue: null, video: null, audio: null,
    };
  }

  let formatIssue = null;
  if (ftypBox) {
    const ftypBuf = await file.slice(ftypBox.start, ftypBox.start + Math.min(ftypBox.size, 16)).arrayBuffer();
    if (ftypBuf.byteLength >= ftypBox.headerSize + 4) {
      const majorBrand = readFourCC(new DataView(ftypBuf), ftypBox.headerSize);
      if (majorBrand === 'qt  ') {
        formatIssue = T('QuickTime（MOV）形式です。MP4（H.264）で書き出し直してください。', 'This is a QuickTime (MOV) file. Please re-export as MP4 (H.264).');
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
    ? T('映像トラックが見つかりません。', 'No video track was found.')
    : (['avc1', 'avc3'].includes(videoTrack.codec) ? null : T(`映像コーデックが H.264 ではありません（検出: ${codecLabel(videoTrack.codec)}）。`, `The video codec is not H.264 (detected: ${codecLabel(videoTrack.codec)}).`));

  const audioIssue = !audioTrack
    ? T('音声トラックがありません。', 'No audio track was found.')
    : (audioTrack.codec === 'mp4a' ? null : T(`音声コーデックが AAC ではありません（検出: ${audioTrack.codec}）。`, `The audio codec is not AAC (detected: ${audioTrack.codec}).`));

  return { formatIssue, videoCodecIssue, audioIssue, video: videoTrack, audio: audioTrack };
}

// ---- classification -----------------------------------------------

function fmtFps(fps) {
  return `${fps.toFixed(2)}fps`;
}

function audioChannelLabel(channels) {
  return { 1: T('モノラル', 'Mono'), 2: T('ステレオ', 'Stereo'), 6: T('5.1chサラウンド', '5.1ch surround') }[channels] || `${channels}ch`;
}

function audioLabel(audio) {
  if (!audio) return T('なし', 'None');
  return `${audio.sampleRate / 1000}kHz / ${audio.channels}ch（${audioChannelLabel(audio.channels)}）`;
}

// チャンネル数だけで判定できる音質の善し悪しを見る。
// コーデック不一致・トラック欠落は analyzeVideoFile 側の audioIssue で別途弾く。
function evaluateAudioChannels(audio) {
  if (audio.channels === 6) {
    return {
      red: T(
        '音声が 5.1ch サラウンドです。会場の音響卓（PA）で声や特定パートの音が消える事故の原因になるため、2ch（ステレオ）で書き出し直してください。',
        'The audio is 5.1ch surround. This can cause voices or specific parts to drop out on the venue\'s PA system, so please re-export as 2ch (stereo).'
      ),
    };
  }
  if (audio.channels !== 1 && audio.channels !== 2) {
    return { red: T(`音声が ${audio.channels}ch です。2ch（ステレオ）で書き出し直してください。`, `The audio has ${audio.channels} channels. Please re-export as 2ch (stereo).`) };
  }
  if (audio.channels === 1) {
    return {
      gold: false,
      caution: T(
        'モノラル（1ch）音声です。会場スピーカーの片側からしか音が流れない可能性があるため、ステレオ（2ch）を推奨します。',
        'The audio is mono (1ch). Sound may only come from one side of the venue speakers, so stereo (2ch) is recommended.'
      ),
    };
  }
  // 2ch（ステレオ）: 48kHz・44.1kHz のどちらも推奨レベル
  return { gold: audio.sampleRate === 48000 || audio.sampleRate === 44100, caution: null };
}

function classifyVideo(meta) {
  const redIssues = [];
  if (meta.formatIssue) redIssues.push(meta.formatIssue);
  if (meta.videoCodecIssue) redIssues.push(meta.videoCodecIssue);

  let audioTier = 'fix';
  let audioCaution = null;
  if (meta.audioIssue) {
    redIssues.push(meta.audioIssue);
  } else if (meta.audio) {
    const audioEval = evaluateAudioChannels(meta.audio);
    if (audioEval.red) {
      redIssues.push(audioEval.red);
    } else {
      audioTier = audioEval.gold ? 'gold' : 'ok';
      audioCaution = audioEval.caution || null;
    }
  }

  if (meta.video) {
    if (meta.video.width > 1920 || meta.video.height > 1080) {
      redIssues.push(T(`解像度が ${meta.video.width}×${meta.video.height} です（1920×1080を超えています）。`, `The resolution is ${meta.video.width}×${meta.video.height} (exceeds 1920×1080).`));
    }
    if (meta.video.fps >= 60) {
      redIssues.push(T(`フレームレートが ${fmtFps(meta.video.fps)} です（60fps以上）。`, `The frame rate is ${fmtFps(meta.video.fps)} (60fps or higher).`));
    }
    if (meta.video.bitrateMbps > 30) {
      redIssues.push(T(
        `映像ビットレートが ${meta.video.bitrateMbps.toFixed(1)}Mbps です（30Mbps超）。会場の再生機でカクつきや再生停止の原因となるため、20Mbps以下で書き出し直してください。`,
        `The video bitrate is ${meta.video.bitrateMbps.toFixed(1)}Mbps (over 30Mbps). This can cause stuttering or playback stopping on the venue player, so please re-export at 20Mbps or below.`
      ));
    }
  }

  if (redIssues.length > 0 || !meta.video) {
    return {
      tier: 'fix',
      issues: redIssues.length ? redIssues : [T('動画情報を解析できませんでした。', 'Could not analyze the video metadata.')],
      audioCaution,
      bitrateCaution: null,
    };
  }

  const { width: w, height: h, fps, bitrateMbps: br } = meta.video;

  const resTier = (w === 1920 && h === 1080) ? 'gold' : ((w >= 1280 && h >= 720) ? 'ok' : 'fix');
  const fpsTier = (fps >= 29.97 && fps <= 30.03) ? 'gold' : ((fps >= 24 && fps <= 30.03) ? 'ok' : 'fix');

  // ビットレートは 30Mbps 超をすでに上で弾いているので、ここでは0〜30Mbpsの範囲だけを見る。
  // 20〜30Mbpsは再生自体は可能だが、会場の再生機でカクつきが増える傾向があるため
  // 「再生可能」止まりとし、注意文を添える。
  let brTier;
  let bitrateCaution = null;
  if (br >= 8 && br <= 20) {
    brTier = 'gold';
  } else if (br >= 3 && br < 8) {
    brTier = 'ok';
  } else if (br > 20) {
    brTier = 'ok';
    bitrateCaution = T(
      `映像ビットレートが ${br.toFixed(1)}Mbps です。20Mbpsを超えると会場の再生機でカクつきが発生する可能性が増えるため、20Mbps以下を推奨します。`,
      `The video bitrate is ${br.toFixed(1)}Mbps. Above 20Mbps, stuttering becomes more likely on the venue player, so 20Mbps or below is recommended.`
    );
  } else {
    brTier = 'fix';
  }

  if (resTier === 'fix' || fpsTier === 'fix' || brTier === 'fix') {
    const mismatches = [];
    if (resTier === 'fix') mismatches.push(T(`解像度: ${w}×${h}（推奨 1920×1080 / 可 1280×720〜）`, `Resolution: ${w}×${h} (recommended 1920×1080 / acceptable 1280×720+)`));
    if (fpsTier === 'fix') mismatches.push(T(`フレームレート: ${fmtFps(fps)}（推奨 30fps付近）`, `Frame rate: ${fmtFps(fps)} (recommended around 30fps)`));
    if (brTier === 'fix') mismatches.push(T(`映像ビットレート: ${br.toFixed(1)}Mbps（推奨 8〜20Mbps）`, `Video bitrate: ${br.toFixed(1)}Mbps (recommended 8–20Mbps)`));
    return { tier: 'fix', issues: mismatches, audioCaution, bitrateCaution };
  }

  if (resTier === 'gold' && fpsTier === 'gold' && brTier === 'gold' && audioTier === 'gold') {
    return { tier: 'recommended', issues: [], audioCaution, bitrateCaution };
  }

  return { tier: 'ok', issues: [], audioCaution, bitrateCaution };
}

// ---- UI --------------------------------------------------------

const TIER_META = {
  recommended: {
    label: () => T('🟢 推奨', '🟢 Recommended'),
    box: 'border-goldDeep bg-cream/40',
    text: 'text-goldDeep',
    message: () => T('会場の推奨設定を満たしています。このままご提出いただけます。', 'This meets the venue\'s recommended settings. You can submit it as-is.'),
  },
  ok: {
    label: () => T('🟡 再生可能', '🟡 Playable'),
    box: 'border-gold bg-cream/30',
    text: 'text-goldDeep',
    message: () => T('再生可能な設定です。', 'These settings are playable.'),
  },
  fix: {
    label: () => T('🔴 要修正', '🔴 Needs fixing'),
    box: 'border-red-300 bg-red-50',
    text: 'text-red-600',
    message: () => T('再生機器で正常に表示されません。指定のフォーマットで再書き出しをお願いします。', 'This will not display correctly on the playback device. Please re-export in the specified format.'),
  },
};

function VideoCheckResult({ fileName, meta, verdict }) {
  const t = TIER_META[verdict.tier];
  return (
    <div className={`mt-6 border ${t.box} px-5 sm:px-7 py-5 sm:py-6`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span className={`font-mincho text-base sm:text-[17px] ${t.text}`}>{t.label()}</span>
        <span className="font-gothic text-muted text-[11px] truncate max-w-[220px]">{fileName}</span>
      </div>
      <p className={`font-gothic mt-2.5 text-[12.5px] ${t.text}`}>{t.message()}</p>

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
        <div className="mt-5 pt-4 border-t border-line/60 grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>{T('映像コーデック', 'Video codec')}</span>
            <span className="font-gothic text-ink/80 text-[12px]">{codecLabel(meta.video.codec)}</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>{T('解像度', 'Resolution')}</span>
            <span className="font-gothic text-ink/80 text-[12px]">{meta.video.width}×{meta.video.height}</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>{T('フレームレート', 'Frame rate')}</span>
            <span className="font-gothic text-ink/80 text-[12px]">{fmtFps(meta.video.fps)}</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>{T('映像ビットレート', 'Video bitrate')}</span>
            <span className="font-gothic text-ink/80 text-[12px]">{meta.video.bitrateMbps.toFixed(1)}Mbps</span>
          </div>
          <div>
            <span className="font-gothic text-muted block text-[10px]" style={{ letterSpacing: '.1em' }}>{T('音声', 'Audio')}</span>
            <span className="font-gothic text-ink/80 text-[12px]">{audioLabel(meta.audio)}</span>
          </div>
        </div>
      )}

      {verdict.bitrateCaution && (
        <div className="mt-4 flex items-start gap-2.5 border border-gold/50 bg-cream/40 px-3.5 sm:px-4 py-3 sm:py-3.5">
          <IconAlert size={15} className="shrink-0 mt-0.5 text-goldDeep" />
          <p className="font-gothic text-goldDeep leading-relaxed text-[11.5px] sm:text-[12px]">{verdict.bitrateCaution}</p>
        </div>
      )}

      {verdict.audioCaution && (
        <div className="mt-4 flex items-start gap-2.5 border border-gold/50 bg-cream/40 px-3.5 sm:px-4 py-3 sm:py-3.5">
          <IconAlert size={15} className="shrink-0 mt-0.5 text-goldDeep" />
          <p className="font-gothic text-goldDeep leading-relaxed text-[11.5px] sm:text-[12px]">{verdict.audioCaution}</p>
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
        verdict: { tier: 'fix', issues: [T('動画情報を解析できませんでした。ファイル形式をご確認ください。', 'Could not analyze the video metadata. Please check the file format.')] },
      });
    }
    setStatus('done');
  };

  return (
    <div className="bg-white border border-line p-6 sm:p-9">
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-goldDeep"><IconUpload size={18} /></span>
        <h3 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-base sm:text-[17px]`}>{T('動画ファイルを事前チェック', 'Pre-Check Your Video File')}</h3>
      </div>
      <p className="font-gothic text-ink/60 leading-relaxed text-[11.5px] sm:text-[12px] mb-5">
        {T(
          '提出前にお手元の動画ファイルを選択すると、会場の再生機器での適合状況をブラウザ上だけで判定します。ファイルはどこにもアップロードされません。',
          "Select your video file before submitting and it's checked against the venue player's requirements entirely in your browser. The file is never uploaded anywhere."
        )}
      </p>

      <label className="inline-flex items-center gap-2.5 cursor-pointer bg-ink text-ivory px-5 sm:px-6 py-3 font-gothic text-[12px] sm:text-[12.5px] transition-colors duration-300 hover:bg-ink/85">
        <IconUpload size={15} />
        {T('動画ファイルを選択', 'Choose Video File')}
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files && e.target.files[0])}
        />
      </label>

      {status === 'loading' && (
        <div className="mt-5 font-gothic text-muted text-[12px] flex items-center gap-2">
          <span className="anim-dot">●</span> {T('解析しています…', 'Analyzing…')}
        </div>
      )}

      {status === 'done' && result && (
        <VideoCheckResult fileName={fileName} meta={result.meta} verdict={result.verdict} />
      )}
    </div>
  );
}

Object.assign(window, { VideoChecker, analyzeVideoFile, classifyVideo });

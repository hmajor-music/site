// ── Export Guide section (再生トラブルを防ぐ書き出しガイド) ──────────

const EXPORT_SPECS = [
  { icon: <IconFilm size={18} />,    k: 'ファイル形式',   kEn: 'File format',      v: 'MP4', accent: true },
  { icon: <IconSparkle size={18} />, k: '映像コーデック',  kEn: 'Video codec',      v: 'H.264（AVC）', accent: true },
  { icon: <IconMonitor size={18} />, k: '解像度',         kEn: 'Resolution',       v: '1920×1080（フルHD）' },
  { icon: <IconClock size={18} />,   k: 'フレームレート',  kEn: 'Frame rate',       v: '23.976〜30fps（固定）' },
  { icon: <IconSpeaker size={18} />, k: '音声',           kEn: 'Audio',            v: 'AAC・48kHz・ステレオ' },
  { icon: <IconArrowR size={18} />,  k: '映像ビットレート', kEn: 'Video bitrate',    v: '8〜20Mbps（固定ビットレート）' },
];

const EXPORT_DONTS = [
  ['H.265 / HEVC（高効率）', '最も多い再生エラーの原因', 'H.265 / HEVC ("High Efficiency")', 'The single most common cause of playback errors'],
  ['4K・8K の解像度', '会場の再生機は最大1080pまで', '4K or 8K resolution', 'The venue player supports up to 1080p only'],
  ['可変フレームレート（VFR）', 'スマホ録画・画面収録に多い', 'Variable frame rate (VFR)', 'Common in phone recordings & screen captures'],
  ['可変ビットレート（VBR）', '固定ビットレート（CBR）を選択してください', 'Variable bitrate (VBR)', 'Please choose constant bitrate (CBR)'],
  ['60fps での書き出し', '23.976〜30fps に下げてください', 'Exporting at 60fps', 'Please set it to 23.976–30fps'],
  ['配信・画面録画の映像', '権利・形式の両面で不可', 'Streamed or screen-recorded footage', 'Not allowed, both for rights and format reasons'],
];

const APP_GUIDES = [
  {
    name: 'Clipchamp',
    tag: 'Windows標準・無料',
    tagEn: 'Built into Windows · Free',
    blocks: [
      { os: '共通', osEn: 'All platforms', icon: <IconLaptop size={14} />, steps: [
        ['編集が完了したら、画面右上の「エクスポート」をクリック', 'When editing is done, click "Export" in the top right'],
        ['画質は「1080p」を選択（4K は選ばないでください）', 'Choose "1080p" quality (do not choose 4K)'],
        ['自動的に MP4（H.264）／音声 AAC で書き出されます', 'It automatically exports as MP4 (H.264) with AAC audio'],
        ['ダウンロードされた .mp4 を、データ提出フォームから送信', 'Send the downloaded .mp4 via the submission form'],
      ] },
    ],
    note: 'Clipchamp は 1080p・H.264 で書き出されるため、会場の再生機と相性の良いアプリです。',
    noteEn: 'Clipchamp exports at 1080p / H.264 by default, making it well suited to the venue player.',
  },
  {
    name: 'CapCut',
    tag: 'スマホ / PC・無料',
    tagEn: 'Phone / PC · Free',
    blocks: [
      { os: 'スマートフォン', osEn: 'Smartphone', icon: <IconPhone size={14} />, steps: [
        ['右上の「↑（エクスポート）」をタップ', 'Tap the "↑ (Export)" icon in the top right'],
        ['解像度を 1080p、フレームレートを 30 に設定', 'Set resolution to 1080p and frame rate to 30'],
        ['コーデック設定がある場合は H.265 ではなく H.264 を選択', 'If a codec option appears, choose H.264, not H.265'],
        ['端末に保存し、提出フォームから送信', 'Save to your device, then send via the submission form'],
      ] },
      { os: 'PC', osEn: 'PC', icon: <IconLaptop size={14} />, steps: [
        ['右上の「エクスポート」をクリック', 'Click "Export" in the top right'],
        ['解像度 1080p ／ フレームレート 30fps ／ フォーマット MP4', 'Resolution 1080p / Frame rate 30fps / Format MP4'],
        ['コーデックは H.264（HEVC は選ばない）', 'Codec H.264 (do not choose HEVC)'],
        ['書き出した .mp4 を提出フォームから送信', 'Send the exported .mp4 via the submission form'],
      ] },
    ],
    note: 'CapCut は設定で HEVC を選べてしまいます。必ず H.264 になっているかご確認ください。',
    noteEn: 'CapCut lets you accidentally select HEVC — please double-check that H.264 is selected.',
  },
  {
    name: 'iMovie',
    tag: 'Mac / iPhone・無料',
    tagEn: 'Mac / iPhone · Free',
    blocks: [
      { os: 'Mac', osEn: 'Mac', icon: <IconLaptop size={14} />, steps: [
        ['右上の共有ボタン →「ファイルを書き出す」を選択', 'Share button (top right) → "Export File"'],
        ['解像度 1080p ／ 品質「高」／ 圧縮「高速」を選択', 'Choose resolution 1080p / Quality "High" / Compress "Faster"'],
        ['H.264・MP4 で書き出されます（4K は選ばない）', 'It exports as H.264 / MP4 (do not choose 4K)'],
        ['提出フォームから送信', 'Send via the submission form'],
      ] },
      { os: 'iPhone', osEn: 'iPhone', icon: <IconPhone size={14} />, steps: [
        ['「完了」→ 共有ボタン →「ビデオを保存」', '"Done" → Share button → "Save Video"'],
        ['書き出しサイズは 1080p HD を選択（4K は選ばない）', 'Choose export size 1080p HD (not 4K)'],
        ['写真アプリに保存後、提出フォームから送信', 'After saving to Photos, send via the submission form'],
      ] },
    ],
    note: '撮影素材が HEVC でも、iMovie から書き出すと H.264 になります。心配な場合は 設定 → カメラ → フォーマット →「互換性優先」に。',
    noteEn: 'Even if the original footage is HEVC, iMovie exports it as H.264. If in doubt, set Settings → Camera → Formats → "Most Compatible".',
  },
];

function AppGuide({ g, open, onToggle }) {
  return (
    <div className={`bg-white border overflow-hidden transition-colors duration-300 ${open ? 'border-gold' : 'border-line'}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 sm:gap-4 text-left px-4 sm:px-6 py-4 sm:py-5">
        <span className="font-enserif text-ink text-lg sm:text-[21px]">{g.name}</span>
        <span className="font-gothic text-muted border border-beige px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px]">{T(g.tag, g.tagEn)}</span>
        <span className={`ml-auto shrink-0 text-goldDeep transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><IconPlus size={20} /></span>
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className={`px-4 sm:px-6 pb-5 sm:pb-6 grid gap-5 ${g.blocks.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {g.blocks.map((b, bi) => (
              <div key={bi} className={g.blocks.length > 1 && bi > 0 ? 'border-t md:border-t-0 pt-4 md:pt-0 border-line/60' : ''}>
                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <span className="text-goldDeep/70">{b.icon}</span>
                  <span className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-[13px] sm:text-[13.5px]`}>{T(b.os, b.osEn)}</span>
                </div>
                <ol className="flex flex-col gap-2 sm:gap-2.5">
                  {b.steps.map((s, si) => {
                    const [jp, en] = Array.isArray(s) ? s : [s, null];
                    return (
                      <li key={si} className="flex items-start gap-2.5 sm:gap-3">
                        <span className="shrink-0 font-enserif text-gold w-4 text-[11px] sm:text-[12px]">{si + 1}</span>
                        <span className="font-gothic text-ink/80 leading-relaxed text-[12px] sm:text-[12.5px]">{T(jp, en)}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 flex items-start gap-2.5 sm:gap-3 border border-beige px-3.5 sm:px-4 py-3 sm:py-3.5">
            <span className="text-goldDeep mt-0.5 shrink-0"><IconSparkle size={15} /></span>
            <p className="font-gothic text-goldDeep leading-relaxed text-[11.5px] sm:text-[12px]">{T(g.note, g.noteEn)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- 作成から提出までの流れ -------------------------------------
const EXPORT_STEPS = [
  { icon: <IconFilm size={20} />, label: '映像を作成', sub: 'マニュアルのルールで編集', labelEn: 'Create your video', subEn: 'Edit following the manual' },
  { icon: <IconDownload size={20} />, label: '指定の設定で書き出し', sub: 'MP4・H.264・1080p・23.976〜30fps', labelEn: 'Export with these settings', subEn: 'MP4 · H.264 · 1080p · 23.976–30fps' },
  { icon: <IconMonitor size={20} />, label: '事前チェック', sub: '下のツールでその場で確認', labelEn: 'Check it', subEn: 'Verify instantly with the tool below' },
  { icon: <IconUpload size={20} />, label: 'データを提出', sub: '専用フォームから提出', labelEn: 'Submit your file', subEn: 'Via the dedicated form' },
  { icon: <IconCheck size={20} />, label: '会場で再生確認', sub: '当日まで安心してお任せ', labelEn: 'Venue playback check', subEn: 'We take it from there' },
];

function ExportFlow() {
  return (
    <div className="mb-8 sm:mb-12 border border-line bg-white flex flex-col sm:flex-row">
      {EXPORT_STEPS.map((s, i) => (
        <React.Fragment key={s.label}>
          <Reveal delay={i * 80} className="flex-1 flex sm:flex-col items-center text-left sm:text-center gap-4 sm:gap-2.5 px-5 sm:px-3 py-5 sm:py-7">
            <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gold/50 bg-cream/40 text-goldDeep flex items-center justify-center">
              {s.icon}
            </div>
            <div>
              <div className="font-gothic text-goldDeep text-[9.5px] sm:text-[10px]" style={{ letterSpacing: '.16em' }}>STEP {i + 1}</div>
              <div className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-[13.5px] sm:text-[14px] mt-0.5`} style={{ letterSpacing: '.02em' }}>{T(s.label, s.labelEn)}</div>
              <div className="font-gothic text-muted text-[10.5px] sm:text-[11px] mt-1">{T(s.sub, s.subEn)}</div>
            </div>
          </Reveal>
          {i < EXPORT_STEPS.length - 1 && (
            <div className="hidden sm:flex items-center justify-center text-line/80 px-0.5">
              <IconChevR size={16} />
            </div>
          )}
          {i < EXPORT_STEPS.length - 1 && (
            <div className="sm:hidden flex justify-center text-line/80 border-t border-line/60 py-1.5">
              <IconChevD size={16} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ExportGuideSection() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="export" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="Export Guide" title="再生トラブルを防ぐ、書き出しガイド" titleEn="An export guide to prevent playback trouble"
        sub="会場の再生機（TASCAM BD-MP1MKII）で確実に流すための設定です。この通りに書き出せば、当日の“映らない”をほぼ防げます。"
        subEn="These settings are matched to the venue's player (TASCAM BD-MP1MKII). Export exactly this way and you'll almost never see a “won't play” problem on the day." center />

      <ExportFlow />

      <AlertBand />

      {/* HEVC 警告 */}
      <Reveal className="flex items-stretch mb-8 sm:mb-10" style={{ background: '#2C2823' }}>
        <div className="w-1.5 bg-gold shrink-0"></div>
        <div className="flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-8">
          <div className="shrink-0 border border-gold/45 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-gold"><IconAlert size={24} /></div>
          <div className="flex-1">
            <div className="font-gothic text-goldSoft mb-2 sm:mb-3 text-[11px] sm:text-[12px]">{T('WARNING — 再生エラーで最も多い原因', 'WARNING — The most common cause of playback errors')}</div>
            {LANG === 'en' ? (
              <div className="font-enserif text-ivory leading-snug text-lg sm:text-[22px]">
                Phone "<span className="text-gold">High Efficiency (HEVC / H.265)</span>" video will not play.
              </div>
            ) : (
              <div className="font-mincho text-ivory leading-snug text-lg sm:text-[22px]">
                iPhone・スマホの「<span className="text-gold">高効率（HEVC / H.265）</span>」は再生できません。
              </div>
            )}
            <p className="font-gothic text-ivory/70 sm:text-ivory/60 mt-2.5 leading-relaxed text-[12px] sm:text-[13px]">
              {LANG === 'en' ? (
                <>By default, phones export in HEVC, which the venue player cannot show. Please re-export as <span className="text-goldSoft font-medium">H.264</span> using one of the apps below.</>
              ) : (
                <>スマートフォンは初期設定だと HEVC で書き出され、会場の再生機では映りません。下記アプリで <span className="text-goldSoft font-medium">H.264</span> として書き出してください。</>
              )}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2.5 mt-4">
              <span className="font-gothic text-ivory/80 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px]">
                {T('iPhone：設定 → カメラ → フォーマット →「互換性優先」', 'iPhone: Settings → Camera → Formats → "Most Compatible"')}
              </span>
              <span className="font-gothic text-ivory/80 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px]">
                {T('書き出し時に コーデック H.264 を選択', 'Select codec H.264 when exporting')}
              </span>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 動画ファイル事前チェック */}
      <Reveal className="mb-8 sm:mb-12">
        <VideoChecker />
      </Reveal>

      {/* 確実な設定 / 避ける設定 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 sm:mb-12">
        <Reveal className="col-span-1 lg:col-span-3 bg-white border border-line p-6 sm:p-9">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-goldDeep"><IconCheck size={17} /></span>
            <h3 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-base sm:text-[17px]`}>{T('確実に再生できる設定', 'Settings that play reliably')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
            <div>{EXPORT_SPECS.slice(0, 3).map((s) => <SpecRow key={s.k} {...s} />)}</div>
            <div>{EXPORT_SPECS.slice(3).map((s) => <SpecRow key={s.k} {...s} />)}</div>
          </div>
        </Reveal>

        <Reveal delay={100} className="col-span-1 lg:col-span-2 bg-white border border-line p-6 sm:p-9">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-ink/40"><IconClose size={17} /></span>
            <h3 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-base sm:text-[17px]`}>{T('避けてください', 'Please avoid')}</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {EXPORT_DONTS.map(([t, s, tEn, sEn]) => (
              <li key={t} className="flex items-start gap-3">
                <span className="shrink-0 mt-1 text-ink/35"><IconClose size={13} /></span>
                <span>
                  <span className="font-gothic font-medium text-ink block text-[12.5px] sm:text-[13px]">{T(t, tEn)}</span>
                  <span className="font-gothic text-muted text-[11px] sm:text-[11.5px]">{T(s, sEn)}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* アプリ別手順 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5 sm:mb-7">
        <h3 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-lg sm:text-[21px]`} style={{ letterSpacing: '.05em' }}>{T('アプリ別・書き出し手順', 'Export Steps by App')}</h3>
        <span className="font-gothic text-muted text-[11.5px] sm:text-[12px]">{T('よく使われる無料アプリで解説します', 'Covering popular free apps')}</span>
      </div>
      <div className="flex flex-col gap-3.5">
        {APP_GUIDES.map((g, i) => (
          <Reveal key={g.name} delay={i * 80}>
            <AppGuide g={g} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>

      {/* 提出メモ */}
      <Reveal className="mt-8 sm:mt-10 border border-beige px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <span className="shrink-0 text-goldDeep"><IconUpload size={22} /></span>
        <p className="font-gothic text-ink/75 leading-relaxed text-[12px] sm:text-[12.5px]">
          {T(
            '上記設定なら、5〜6分の映像でもファイルは数百MB〜2GB程度に収まり、提出フォームからスムーズに送信できます。',
            'With these settings, a 5–6 minute video typically stays in the hundreds of MB to about 2GB — small enough to submit smoothly through the form.'
          )}
        </p>
      </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { ExportGuideSection, AppGuide });

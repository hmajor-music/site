// ── Export Guide section (再生トラブルを防ぐ書き出しガイド) ──────────

const EXPORT_SPECS = [
  { icon: <IconFilm size={18} />,    k: 'ファイル形式',   v: 'MP4', accent: true },
  { icon: <IconSparkle size={18} />, k: '映像コーデック',  v: 'H.264（AVC）', accent: true },
  { icon: <IconMonitor size={18} />, k: '解像度',         v: '1920×1080（フルHD）' },
  { icon: <IconClock size={18} />,   k: 'フレームレート',  v: '30fps（固定）' },
  { icon: <IconSpeaker size={18} />, k: '音声',           v: 'AAC・48kHz・ステレオ' },
  { icon: <IconArrowR size={18} />,  k: '映像ビットレート', v: '8〜20Mbps 目安' },
];

const EXPORT_DONTS = [
  ['H.265 / HEVC（高効率）', '最も多い再生エラーの原因'],
  ['4K・8K の解像度', '会場の再生機は最大1080pまで'],
  ['可変フレームレート（VFR）', 'スマホ録画・画面収録に多い'],
  ['60fps での書き出し', '30fps に下げてください'],
  ['配信・画面録画の映像', '権利・形式の両面で不可'],
];

const APP_GUIDES = [
  {
    name: 'Clipchamp',
    tag: 'Windows標準・無料',
    blocks: [
      { os: '共通', icon: <IconLaptop size={14} />, steps: [
        '編集が完了したら、画面右上の「エクスポート」をクリック',
        '画質は「1080p」を選択（4K は選ばないでください）',
        '自動的に MP4（H.264）／音声 AAC で書き出されます',
        'ダウンロードされた .mp4 を、データ提出フォームから送信',
      ] },
    ],
    note: 'Clipchamp は 1080p・H.264 で書き出されるため、会場の再生機と相性の良いアプリです。',
  },
  {
    name: 'CapCut',
    tag: 'スマホ / PC・無料',
    blocks: [
      { os: 'スマートフォン', icon: <IconPhone size={14} />, steps: [
        '右上の「↑（エクスポート）」をタップ',
        '解像度を 1080p、フレームレートを 30 に設定',
        'コーデック設定がある場合は H.265 ではなく H.264 を選択',
        '端末に保存し、提出フォームから送信',
      ] },
      { os: 'PC', icon: <IconLaptop size={14} />, steps: [
        '右上の「エクスポート」をクリック',
        '解像度 1080p ／ フレームレート 30fps ／ フォーマット MP4',
        'コーデックは H.264（HEVC は選ばない）',
        '書き出した .mp4 を提出フォームから送信',
      ] },
    ],
    note: 'CapCut は設定で HEVC を選べてしまいます。必ず H.264 になっているかご確認ください。',
  },
  {
    name: 'iMovie',
    tag: 'Mac / iPhone・無料',
    blocks: [
      { os: 'Mac', icon: <IconLaptop size={14} />, steps: [
        '右上の共有ボタン →「ファイルを書き出す」を選択',
        '解像度 1080p ／ 品質「高」／ 圧縮「高速」を選択',
        'H.264・MP4 で書き出されます（4K は選ばない）',
        '提出フォームから送信',
      ] },
      { os: 'iPhone', icon: <IconPhone size={14} />, steps: [
        '「完了」→ 共有ボタン →「ビデオを保存」',
        '書き出しサイズは 1080p HD を選択（4K は選ばない）',
        '写真アプリに保存後、提出フォームから送信',
      ] },
    ],
    note: '撮影素材が HEVC でも、iMovie から書き出すと H.264 になります。心配な場合は 設定 → カメラ → フォーマット →「互換性優先」に。',
  },
];

function AppGuide({ g, open, onToggle }) {
  return (
    <div className={`bg-white border overflow-hidden transition-colors duration-300 ${open ? 'border-gold' : 'border-line'}`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 sm:gap-4 text-left px-4 sm:px-6 py-4 sm:py-5">
        <span className="font-enserif text-ink text-lg sm:text-[21px]">{g.name}</span>
        <span className="font-gothic text-muted border border-beige px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px]">{g.tag}</span>
        <span className={`ml-auto shrink-0 text-goldDeep transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><IconPlus size={20} /></span>
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className={`px-4 sm:px-6 pb-5 sm:pb-6 grid gap-5 ${g.blocks.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            {g.blocks.map((b, bi) => (
              <div key={bi} className={g.blocks.length > 1 && bi > 0 ? 'border-t md:border-t-0 pt-4 md:pt-0 border-line/60' : ''}>
                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <span className="text-goldDeep/70">{b.icon}</span>
                  <span className="font-mincho text-ink text-[13px] sm:text-[13.5px]">{b.os}</span>
                </div>
                <ol className="flex flex-col gap-2 sm:gap-2.5">
                  {b.steps.map((s, si) => (
                    <li key={si} className="flex items-start gap-2.5 sm:gap-3">
                      <span className="shrink-0 font-enserif text-gold w-4 text-[11px] sm:text-[12px]">{si + 1}</span>
                      <span className="font-gothic text-ink/80 leading-relaxed text-[12px] sm:text-[12.5px]">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="mx-4 sm:mx-6 mb-4 sm:mb-6 flex items-start gap-2.5 sm:gap-3 border border-beige px-3.5 sm:px-4 py-3 sm:py-3.5">
            <span className="text-goldDeep mt-0.5 shrink-0"><IconSparkle size={15} /></span>
            <p className="font-gothic text-goldDeep leading-relaxed text-[11.5px] sm:text-[12px]">{g.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExportGuideSection() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="export" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="Export Guide" title="再生トラブルを防ぐ、書き出しガイド。"
        sub="会場の再生機（TASCAM BD-MP1MKII）で確実に流すための設定です。この通りに書き出せば、当日の“映らない”をほぼ防げます。" center />

      {/* HEVC 警告 */}
      <div className="flex items-stretch mb-8 sm:mb-10" style={{ background: '#2C2823' }}>
        <div className="w-1.5 bg-gold shrink-0"></div>
        <div className="flex-1 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-8">
          <div className="shrink-0 border border-gold/45 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-gold"><IconAlert size={24} /></div>
          <div className="flex-1">
            <div className="font-gothic text-goldSoft mb-2 sm:mb-3 text-[11px] sm:text-[12px]">WARNING — 再生エラーで最も多い原因</div>
            <div className="font-mincho text-ivory leading-snug text-lg sm:text-[22px]">
              iPhone・スマホの「<span className="text-gold">高効率（HEVC / H.265）</span>」は再生できません。
            </div>
            <p className="font-gothic text-ivory/70 sm:text-ivory/60 mt-2.5 leading-relaxed text-[12px] sm:text-[13px]">
              スマートフォンは初期設定だと HEVC で書き出され、会場の再生機では映りません。下記アプリで <span className="text-goldSoft font-medium">H.264</span> として書き出してください。
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-2.5 mt-4">
              <span className="font-gothic text-ivory/80 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px]">iPhone：設定 → カメラ → フォーマット →「互換性優先」</span>
              <span className="font-gothic text-ivory/80 border border-white/15 px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[12px]">書き出し時に コーデック H.264 を選択</span>
            </div>
          </div>
        </div>
      </div>

      {/* 動画ファイル事前チェック */}
      <div className="mb-8 sm:mb-12">
        <VideoChecker />
      </div>

      {/* 確実な設定 / 避ける設定 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8 sm:mb-12">
        <div className="col-span-1 lg:col-span-3 bg-white border border-line p-6 sm:p-9">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-goldDeep"><IconCheck size={17} /></span>
            <h3 className="font-mincho text-ink text-base sm:text-[17px]">確実に再生できる設定</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8">
            <div>{EXPORT_SPECS.slice(0, 3).map((s) => <SpecRow key={s.k} {...s} />)}</div>
            <div>{EXPORT_SPECS.slice(3).map((s) => <SpecRow key={s.k} {...s} />)}</div>
          </div>
          <div className="mt-5 sm:mt-6 flex items-start sm:items-center gap-3 bg-ivory border border-line px-3.5 sm:px-4 py-3 sm:py-3.5">
            <span className="text-goldDeep shrink-0 mt-0.5 sm:mt-0"><IconFilm size={16} /></span>
            <span className="font-gothic text-ink/75 text-[11.5px] sm:text-[12.5px]">映像の<span className="font-medium text-ink">前後に黒画面を5秒</span>入れると、頭切れ・メニュー映り込みを防げます。</span>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-white border border-line p-6 sm:p-9">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-ink/40"><IconClose size={17} /></span>
            <h3 className="font-mincho text-ink text-base sm:text-[17px]">避けてください</h3>
          </div>
          <ul className="flex flex-col gap-3">
            {EXPORT_DONTS.map(([t, s]) => (
              <li key={t} className="flex items-start gap-3">
                <span className="shrink-0 mt-1 text-ink/35"><IconClose size={13} /></span>
                <span>
                  <span className="font-gothic font-medium text-ink block text-[12.5px] sm:text-[13px]">{t}</span>
                  <span className="font-gothic text-muted text-[11px] sm:text-[11.5px]">{s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* アプリ別手順 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-5 sm:mb-7">
        <h3 className="font-mincho text-ink text-lg sm:text-[21px]" style={{ letterSpacing: '.05em' }}>アプリ別・書き出し手順</h3>
        <span className="font-gothic text-muted text-[11.5px] sm:text-[12px]">よく使われる無料アプリで解説します</span>
      </div>
      <div className="flex flex-col gap-3.5">
        {APP_GUIDES.map((g, i) => (
          <AppGuide key={g.name} g={g} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>

      {/* 提出メモ */}
      <div className="mt-8 sm:mt-10 border border-beige px-5 sm:px-8 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <span className="shrink-0 text-goldDeep"><IconUpload size={22} /></span>
        <p className="font-gothic text-ink/75 leading-relaxed text-[12px] sm:text-[12.5px]">
          上記設定なら、5〜6分の映像でもファイルは数百MB〜2GB程度に収まり、提出フォームからスムーズに送信できます。
        </p>
      </div>
      </div>
    </section>
  );
}

Object.assign(window, { ExportGuideSection, AppGuide });

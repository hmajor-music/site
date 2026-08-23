// ── Lower sections: Manual / Philosophy ─────────────────────────

// ---- MANUAL ---------------------------------------------------
function SpecRow({ icon, k, v, accent }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-line last:border-0">
      <span className="text-goldDeep/70">{icon}</span>
      <span className="font-gothic text-muted w-20 shrink-0" style={{ fontSize: 11.5 }}>{k}</span>
      <span className={`font-mincho ${accent ? 'text-goldDeep' : 'text-ink'}`} style={{ fontSize: 14, letterSpacing: '.02em' }}>{v}</span>
    </div>);

}

// small heading for sub-rows
function SubHead({ children }) {
  return (
    <div className="flex flex-col items-center text-center mt-14 sm:mt-24 mb-6 sm:mb-10">
      <span className="h-px w-8 sm:w-10 bg-ink/20"></span>
      <h3 className="font-mincho text-ink mt-4 sm:mt-6 text-xl sm:text-[22px]" style={{ letterSpacing: '.05em', fontWeight: 400 }}>{children}</h3>
    </div>);
}

function ManualSection() {
  return (
    <section id="manual" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24 bg-cream/50">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="Manual" title="映像づくりの、基本ルール。"
      sub="ここを押さえれば、当日の再生トラブルはほぼ防げます。" center />

      <AlertBand />

      <div className="max-w-2xl mx-auto">
        {/* 映像 */}
        <div className="bg-white border border-line p-6 sm:p-10">
          <div className="flex items-center gap-3.5 sm:gap-4 mb-5 sm:mb-7">
            <span className="text-goldDeep/70"><IconFilm size={22} /></span>
            <h3 className="font-mincho text-ink text-base sm:text-[19px]" style={{ letterSpacing: '.04em' }}>映像の作り方・ルール</h3>
          </div>
          <div className="mb-6 sm:mb-8">
            <SpecRow icon={<IconMonitor size={18} />} k="アスペクト比" v="16 : 9" accent />
            <SpecRow icon={<IconSparkle size={18} />} k="解像度" v="1920×1080（フルHD）まで対応可" accent />
            <SpecRow icon={<IconFilm size={18} />} k="データ形式" v="MP4（H.264）" />
            <SpecRow icon={<IconClock size={18} />} k="長さの目安" v="4〜6分 程度" />
          </div>
          {/* aspect do / don't */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div>
              <div className="overflow-hidden ph-stripes" style={{ aspectRatio: '16/9' }}></div>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 font-gothic text-goldDeep text-[11px] sm:text-[12px]">
                <IconCheck size={14} /> 16:9 でぴったり
              </div>
            </div>
            <div>
              <div className="overflow-hidden bg-ink flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                <div className="ph-stripes h-full" style={{ aspectRatio: '4/3' }}></div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 font-gothic text-muted text-[11px] sm:text-[12px]">
                <IconClose size={14} /> 4:3 だと黒帯・見切れ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 上映トラブルを防ぐ 3つのポイント ── */}
      <SubHead>上映トラブルを防ぐ、3つのポイント</SubHead>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-line md:border-r-0 md:border-b-0">
        {/* 1. 黒画面 */}
        <div className="bg-white border-b md:border-r border-line p-6 sm:p-8 flex flex-col">
          <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="font-enserif text-gold text-lg sm:text-[22px]">01</span>
            <h4 className="font-mincho text-ink text-[15px] sm:text-[16px]" style={{ letterSpacing: '.03em' }}>映像の前後に黒画面を5秒</h4>
          </div>
          <div className="flex h-10 overflow-hidden border border-line mb-2">
            <div className="bg-ink flex items-center justify-center" style={{ width: '20%' }}>
              <span className="font-gothic text-white/70" style={{ fontSize: 9.5 }}>黒 5秒</span>
            </div>
            <div className="ph-stripes flex-1 flex items-center justify-center">
              <span className="font-mono px-2 py-0.5" style={{ fontSize: 9.5, color: '#9A8C6E', background: 'rgba(251,249,245,.8)' }}>本編</span>
            </div>
            <div className="bg-ink flex items-center justify-center" style={{ width: '20%' }}>
              <span className="font-gothic text-white/70" style={{ fontSize: 9.5 }}>黒 5秒</span>
            </div>
          </div>
          <p className="font-gothic text-ink/70 leading-[1.85] sm:leading-[1.95] mt-3 sm:mt-4 text-[12px]">
            冒頭は黒画面から始めると、違和感なく上映をスタートできます。結びに黒画面がないと、再生機器の
            <span className="text-goldDeep font-medium">メニュー画面が映り込む</span>、または早めに停止して
            <span className="text-goldDeep font-medium">最後の映像・音声が切れてしまう</span>リスクがあります。
          </p>
        </div>

        {/* 2. 解像度 / 変換 */}
        <div className="bg-white border-b md:border-r border-line p-6 sm:p-8 flex flex-col">
          <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="font-enserif text-gold text-lg sm:text-[22px]">02</span>
            <h4 className="font-mincho text-ink text-[15px] sm:text-[16px]" style={{ letterSpacing: '.03em' }}>解像度は 1920×1080</h4>
          </div>
          <div className="bg-ivory border border-line py-4 sm:py-5 text-center">
            <div className="font-enserif text-goldDeep leading-none text-2xl sm:text-[30px]">1920×1080</div>
            <div className="font-gothic text-muted mt-2 sm:mt-2.5 text-[9.5px] sm:text-[10px]" style={{ letterSpacing: '.22em' }}>フルHD ／ 16 : 9</div>
          </div>
          <div className="flex items-center gap-2 mt-3 sm:mt-4 font-gothic text-muted text-[11px] sm:text-[11.5px]">
            <IconClose size={15} className="text-ink/40" /> 4K 非対応
          </div>
          <p className="font-gothic text-ink/70 leading-[1.85] sm:leading-[1.95] mt-2 sm:mt-2.5 flex-1 text-[12px]">
            これを超える設定は会場プロジェクターが対応しておりません。必ず 1920×1080（16:9）で書き出してください。
          </p>
          <div className="mt-4 flex items-center gap-2.5 border border-beige px-3.5 sm:px-4 py-2.5 sm:py-3">
            <span className="text-goldDeep shrink-0"><IconDownload size={16} /></span>
            <span className="font-gothic text-goldDeep text-[11px] sm:text-[11.5px]">推奨変換ソフト：Clipchamp（無料）</span>
          </div>
        </div>

        {/* 3. 表示範囲 / セーフエリア */}
        <div className="bg-white border-b md:border-r border-line p-6 sm:p-8 flex flex-col last:border-b-0 md:last:border-b">
          <div className="flex items-baseline gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="font-enserif text-gold text-lg sm:text-[22px]">03</span>
            <h4 className="font-mincho text-ink text-[15px] sm:text-[16px]" style={{ letterSpacing: '.03em' }}>文字は内側に余裕を</h4>
          </div>
          <div className="relative overflow-hidden bg-ink" style={{ aspectRatio: '16/9' }}>
            <div className="absolute border border-dashed border-gold/60 flex items-center justify-center" style={{ inset: '5%' }}>
              <span className="font-gothic text-gold/85 text-center leading-relaxed text-[10px] sm:text-[10.5px]">文字は<br />この内側に</span>
            </div>
          </div>
          <p className="font-gothic text-ink/70 leading-[1.85] sm:leading-[1.95] mt-3 sm:mt-4 text-[12px]">
            PC画面の表示がそのままプロジェクターに投影されます。端ぎりぎりの文字は
            <span className="text-goldDeep font-medium">一部が途切れる</span>可能性があるため、表示領域より少し内側に配置してください。
          </p>
        </div>
      </div>
      </div>
    </section>);
}

// ---- PHILOSOPHY (選曲はプロにおまかせ) ------------------------
function PhilosophySection() {
  return (
    <section id="philosophy" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24">
      <div className="grid grid-cols-1 md:grid-cols-5" style={{ background: '#F4EEE3' }}>
        <img src="logo/meeting.jpg" alt="" className="col-span-1 md:col-span-2 block w-full h-56 sm:h-80 md:h-full object-cover" style={{ objectPosition: '55% 50%' }} />
        <div className="col-span-1 md:col-span-3 px-6 sm:px-14 py-8 sm:py-16">
          <Eyebrow en="Our Philosophy">選曲について</Eyebrow>
          <h3 className="font-mincho text-ink leading-[1.4] sm:leading-[1.5] mt-5 sm:mt-8 text-xl sm:text-2xl lg:text-[27px]" style={{ letterSpacing: '.05em', fontWeight: 400 }}>
            曲はシーンごとに<span className="text-goldDeep">”決め切らなくて”</span>大丈夫です。
          </h3>
          <p className="font-gothic text-ink/70 leading-[1.9] sm:leading-[2.15] mt-5 sm:mt-8 text-[12.5px] sm:text-[13px]">
            近ごろは念入りに調べてからお越しになる方が増え、その熱量や想いをとても嬉しく思っています。
            事前にお渡ししている「my Favorite songs」に、お好きなアーティストや思い出の映画、普段聴く音楽などを書いていただければ準備はバッチリです。
          </p>
          <p className="font-gothic text-ink/70 leading-[1.9] sm:leading-[2.15] mt-3.5 sm:mt-5 text-[12.5px] sm:text-[13px]">
            ただ、「どのシーンでどの曲を流すか」まで完璧に決める必要はありません。
          </p>
          <p className="font-gothic text-ink/70 leading-[1.9] sm:leading-[2.15] mt-3.5 sm:mt-5 text-[12.5px] sm:text-[13px]">
            シーンに本当に響く一曲は、おふたりがどんな披露宴にしたいか、ゲストへの想い・会場の広さ・進行のテンポまで見合わせて、
            はじめてかみ合うものだからです。
          </p>
          <p className="font-gothic text-ink/70 leading-[1.9] sm:leading-[2.15] mt-3.5 sm:mt-5 text-[12.5px] sm:text-[13px]">
            「このアーティストが好き」という種があれば十分。お打ち合わせでは、数多くの現場を重ねてきたミュージックプランナーが、
            おふたりの「こうしたい」をうかがいながら、一番美しく映える配置をご提案し、一緒にカタチにしていきます。
          </p>
          <p className="font-mincho text-goldDeep mt-7 sm:mt-10 text-[15px] sm:text-[17px]" style={{ letterSpacing: '.06em' }}>
            どうぞ、私たちの耳と提案を信じて、リラックスしてお越しください。
          </p>
        </div>
      </div>
    </section>);
}

Object.assign(window, { ManualSection, PhilosophySection, SpecRow, SubHead });

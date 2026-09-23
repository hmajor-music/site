// ── Submit / Support / Footer ──────────────────────────────────

// ---- SUBMIT ---------------------------------------------------
function SubmitSection() {
  return (
    <section id="submit" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24 bg-cream/50">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="Data Submission" title="データ提出窓口" titleEn="Data Submission"
      sub={`下記の専用フォームから、映像データをご提出ください。${VENUE.name} でご披露宴のお客様専用の窓口です。`}
      subEn={`Please submit your video via the form below — exclusively for couples holding their reception at ${T(VENUE.name, VENUE.nameEn)}.`} center />

      <Reveal className="max-w-4xl mx-auto bg-white border border-line">
        <div className="grid grid-cols-1 md:grid-cols-5">
          {VENUE.venueImage
            ? <img src={VENUE.venueImage} alt={VENUE.name} className="block w-full h-52 sm:h-72 md:h-full object-cover col-span-1 md:col-span-2" />
            : <Placeholder label="VENUE PHOTO" className="w-full h-52 sm:h-72 md:h-full col-span-1 md:col-span-2" />}
          <div className="col-span-1 md:col-span-3 px-6 sm:px-11 py-7 sm:py-12 flex flex-col">
            <span className="inline-flex items-center gap-2 font-gothic text-muted text-[10.5px] sm:text-[11px]" style={{ letterSpacing: '.14em' }}>
              <IconPin size={13} className="text-goldDeep" />{T(VENUE.city, VENUE.cityEn)}
            </span>
            <div className="font-enserif text-ink mt-3 sm:mt-4 leading-tight text-2xl sm:text-[27px]" style={{ letterSpacing: '.02em' }}>{T(VENUE.name, VENUE.nameEn)}</div>
            <p className="font-gothic text-muted mt-3.5 sm:mt-5 leading-[1.85] sm:leading-[1.95] text-[12px] sm:text-[12.5px]">
              {VENUE.formUrl
                ? T('下のボタンから専用フォームを開き、必要事項をご入力のうえ映像データをアップロードしてください。', 'Please open the form below, fill in the details, and upload your video file.')
                : T('専用フォームは現在準備中です。データのご提出方法は担当プランナーよりご案内いたします。', 'The submission form is currently being prepared. Your planner will guide you on how to submit your data.')}
            </p>
            <div className="mt-6 md:mt-auto pt-4 md:pt-9">
              {VENUE.formUrl ? (
                <a href={VENUE.formUrl} target="_blank" rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-ink text-ivory border border-ink px-6 sm:px-8 py-3.5 sm:py-4 font-gothic transition-colors duration-300 hover:bg-transparent hover:text-ink w-full sm:w-auto text-[12px] sm:text-[12.5px]"
                  style={{ letterSpacing: '.12em' }}>
                  {T('提出フォームを開く', 'Open Submission Form')} <IconExternal size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-3 bg-line/60 text-muted border border-line px-6 sm:px-8 py-3.5 sm:py-4 font-gothic w-full sm:w-auto text-[12px] sm:text-[12.5px]"
                  style={{ letterSpacing: '.12em' }}>
                  {T('フォーム準備中', 'Form Coming Soon')}
                </span>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* footnote: checklist + deadline */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-6 sm:mt-8">
        <Reveal className="col-span-1 md:col-span-2 bg-white border border-line px-6 sm:px-9 py-6 sm:py-8">
          <div className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink mb-4 sm:mb-6 text-[14px] sm:text-[15px]`} style={{ letterSpacing: '.04em' }}>
            {T('フォームを開く前に、ご確認ください', 'Before you open the form')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4">
            {[
              ['アスペクト比 16:9・解像度 1920×1080', 'Aspect ratio 16:9, resolution 1920×1080'],
              ['映像の前後に黒画面（5秒）を入れた', '5 seconds of black added before & after'],
              ['MP4（H.264）形式で書き出した', 'Exported as MP4 (H.264)'],
              ['文字が端で切れていないか確認した', 'Checked that text isn\'t cut off at the edges'],
            ].map(([t, tEn]) =>
              <div key={t} className="flex items-start gap-2.5 sm:gap-3">
                <span className="shrink-0 mt-0.5 text-goldDeep"><IconCheck size={13} /></span>
                <span className="font-gothic text-ink/70 text-[11.5px] sm:text-[12px]" style={{ lineHeight: 1.7 }}>{T(t, tEn)}</span>
              </div>
            )}
          </div>
        </Reveal>
        <Reveal delay={100} className="px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-center" style={{ background: '#2C2823' }}>
          <div className="font-gothic text-goldSoft text-[9.5px] sm:text-[10px]" style={{ letterSpacing: '.22em' }}>DEADLINE</div>
          <div className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ivory mt-2.5 sm:mt-3 leading-snug text-base sm:text-[16px]`} style={{ letterSpacing: '.04em' }}>
            {T(<>ご披露宴<br />2週間前まで</>, <>2 weeks before<br />the reception</>)}
          </div>
          <div className="font-gothic text-ivory/50 sm:text-ivory/45 mt-2.5 sm:mt-3.5 leading-relaxed text-[10.5px] sm:text-[11px]">
            {T('再生確認の為お早めにご提出ください。', 'Please submit early to allow time for a playback check.')}
          </div>
        </Reveal>
      </div>

      <p className="text-center font-gothic text-muted mt-6 sm:mt-9 text-[10.5px] sm:text-[11px]">
        {T('フォームが開かない場合や、ご不明な点はお問い合わせください。', "If the form won't open, or you have any questions, please contact us.")}
      </p>
      </div>
    </section>);
}

// ---- SUPPORT (FAQ + venue spec + contact) --------------------
function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-line last:border-0">
      <button onClick={onToggle} className="w-full flex items-center gap-3.5 sm:gap-5 text-left py-4 sm:py-6">
        <span className="font-enserif text-gold shrink-0 text-xs sm:text-[14px]">Q</span>
        <span className={`flex-1 ${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-[13.5px] sm:text-[15px]`} style={{ letterSpacing: '.03em' }}>{T(item.q, item.qEn)}</span>
        <span className={`shrink-0 text-goldDeep/70 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}><IconPlus size={18} /></span>
      </button>
      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <p className="font-gothic text-ink/70 leading-[1.9] sm:leading-[2.1] pb-5 sm:pb-7 pl-6 sm:pl-9 pr-3 sm:pr-8 text-[12px] sm:text-[12.5px]">{T(item.a, item.aEn)}</p>
        </div>
      </div>
    </div>);
}

function SupportSection() {
  const [open, setOpen] = React.useState(0);
  return (
    <section id="support" className="scroll-mt-20 px-5 sm:px-14 py-12 sm:py-24">
      <div className="max-w-[1280px] mx-auto">
      <SectionHead en="Help & Support" title="お困りごとを、その場で解決。" titleEn="Answers, right here."
      sub="よくあるご質問をまとめました。解決しないときはお気軽にお問い合わせください。"
      subEn="A collection of frequently asked questions. Please contact us if you need further help." center />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">
        {/* FAQ */}
        <Reveal className="col-span-1 lg:col-span-2 bg-white border border-line px-5 sm:px-10 py-2 sm:py-4">
          {FAQS.map((item, i) =>
            <FaqItem key={i} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          )}
        </Reveal>

        {/* contact */}
        <Reveal as="div" delay={100} id="contact" className="col-span-1 scroll-mt-20">
          <div className="px-6 sm:px-8 py-7 sm:py-9 text-center" style={{ background: '#F4EEE3' }}>
            <div className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink text-[14.5px] sm:text-[15.5px]`} style={{ letterSpacing: '.04em' }}>
              {T('解決しないときは', 'Still need help?')}
            </div>
            <p className="font-gothic text-muted mt-2 sm:mt-3 leading-[1.8] sm:leading-[1.9] text-[11.5px] sm:text-[12px]">
              {T('下記の窓口までお気軽にお問い合わせください。', 'Please feel free to reach out to us below.')}
            </p>
            <div className="mt-4 sm:mt-6 font-mincho text-goldDeep text-[14.5px] sm:text-[16px] break-all" style={{ letterSpacing: '.02em' }}>{VENUE.contactEmail}</div>
            <div className="font-gothic text-muted mt-2 sm:mt-2.5 text-[10.5px] sm:text-[11px]">{T(VENUE.businessHours, VENUE.businessHoursEn)}</div>
          </div>
        </Reveal>
      </div>
      </div>
    </section>);
}

function Footer({ go }) {
  return (
    <footer style={{ background: '#2C2823' }} className="px-5 sm:px-14 pt-12 sm:pt-16 pb-8 sm:pb-11">
      <div className="max-w-[1280px] mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-white/10 pb-8 sm:pb-12">
        <div>
          <Logo light h={34} />
          <div className="font-gothic text-goldSoft mt-4 sm:mt-6 text-[9.5px] sm:text-[10px]" style={{ letterSpacing: '.22em' }}>{T(VENUE.name, VENUE.nameEn)}</div>
          <p className="font-gothic text-ivory/50 mt-3 sm:mt-4 leading-[1.85] sm:leading-[1.95] max-w-xs text-[11px] sm:text-[11.5px]">
            {T('結婚式の音響スタッフとして、お二人の想いが大切なゲストの心まで届くよう、音でお手伝いします。', 'As your wedding sound team, we help your feelings reach every guest you love — through sound.')}
          </p>
        </div>
        <nav className="flex flex-wrap md:flex-col gap-3 sm:gap-4 items-start md:items-end">
          {NAV.map((n) =>
            <button key={n.id} onClick={() => go(n.id)} className="font-gothic text-ivory/65 hover:text-gold transition-colors duration-300 text-[11.5px] sm:text-[11.5px]" style={{ letterSpacing: '.1em' }}>
              {T(n.label, n.en)}
            </button>
          )}
          <a href={`music-guide.html${window.location.search}`} className="font-gothic text-ivory/65 hover:text-gold transition-colors duration-300 text-[11.5px] sm:text-[11.5px] no-underline" style={{ letterSpacing: '.1em' }}>
            {T('選曲ガイド', 'Music Guide')}
          </a>
          <LangSwitch light />
        </nav>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-start sm:items-center justify-between pt-5 sm:pt-7">
        <span className="font-gothic text-ivory/35 text-[10px] sm:text-[10.5px]" style={{ letterSpacing: '.1em' }}>© 2026 Hmajor — Wedding Sound &amp; Visual</span>
        <span className="font-enserif text-gold/60 text-[12px] sm:text-[13px]" style={{ letterSpacing: '.06em' }}>Make your day sound beautiful.</span>
      </div>
      </div>
    </footer>);
}

Object.assign(window, { SubmitSection, SupportSection, Footer, FaqItem });

// ── Upper sections: Header / Hero / 必読 / QuickActions / Alert ──

const NAV = [
  { id: 'top',     label: 'ホーム' },
  { id: 'manual',  label: 'マニュアル' },
  { id: 'export',  label: '書き出しガイド' },
  { id: 'copyright', label: 'BGM・著作権' },
  { id: 'submit',  label: 'データ提出' },
  { id: 'support', label: 'よくあるご質問' },
];

function Header({ go, active }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    go(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-line">
      <div className="h-[64px] sm:h-[76px] px-4 sm:px-8 lg:px-14 max-w-[1280px] mx-auto flex items-center justify-between">
        <button onClick={() => handleNavClick('top')} className="flex items-center gap-2.5 sm:gap-4 active:opacity-70 transition-opacity shrink-0">
          <Logo h={28} className="sm:hidden" />
          <span className="hidden sm:inline-block"><Logo h={34} /></span>
          <span className="h-4 sm:h-6 w-px bg-line"></span>
          <span className="font-gothic text-ink/60 text-[9.5px] sm:text-[10.5px] tracking-[.15em] sm:tracking-[.2em] truncate max-w-[170px] sm:max-w-none">{VENUE.name}</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 flex-nowrap">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}
              className={`relative font-gothic py-1 whitespace-nowrap transition-colors duration-300 ${active === n.id ? 'text-goldDeep' : 'text-ink/65 hover:text-ink'}`}
              style={{ fontSize: 12, letterSpacing: '.1em' }}>
              {n.label}
              {active === n.id && <span className="absolute left-0 right-0 -bottom-1 h-px bg-gold/70"></span>}
            </button>
          ))}
          <a href={`music-guide.html${window.location.search}`}
            className="font-gothic text-ink/65 hover:text-ink transition-colors duration-300 whitespace-nowrap no-underline"
            style={{ fontSize: 12, letterSpacing: '.1em' }}>
            選曲ガイド
          </a>
          <Btn variant="goldout" size="sm" onClick={() => go('contact')} className="whitespace-nowrap">お問い合わせ</Btn>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink/80 hover:text-ink focus:outline-none"
            aria-label="メニュー切り替え"
          >
            {mobileMenuOpen ? <IconClose size={24} /> : <IconMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory border-b border-line shadow-lg px-6 py-6 anim-fade">
          <nav className="flex flex-col gap-4">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => handleNavClick(n.id)}
                className={`text-left py-2.5 px-2 font-gothic text-[14px] tracking-wider border-b border-line/60 last:border-0 ${
                  active === n.id ? 'text-goldDeep font-bold' : 'text-ink/80'
                }`}
              >
                {n.label}
              </button>
            ))}
            <a href={`music-guide.html${window.location.search}`}
              className="text-left py-2.5 px-2 font-gothic text-[14px] tracking-wider border-b border-line/60 text-ink/80 no-underline">
              選曲ガイド
            </a>
            <div className="pt-2">
              <Btn variant="goldout" size="md" onClick={() => handleNavClick('contact')} className="w-full">
                お問い合わせ
              </Btn>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ go }) {
  return (
    <section id="top" className="relative overflow-hidden">
      {VENUE.heroImage
        ? <img src={VENUE.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '68% 50%' }} />
        : <Placeholder label="HERO PHOTO" className="absolute inset-0 w-full h-full" />}
      {/* Responsive overlay: dark enough on mobile so text pops */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/95 via-ivory/90 to-ivory/95 sm:bg-gradient-to-r sm:from-ivory sm:via-ivory/95 sm:to-transparent"></div>

      <div className="relative px-5 sm:px-14 pt-14 sm:pt-28 pb-16 sm:pb-32 max-w-[1280px] mx-auto flex flex-col justify-center min-h-[440px] sm:min-h-[560px]">
        <Reveal style={{ maxWidth: 660 }}>
          <Eyebrow en="Music &amp; Visual Guide">{VENUE.name}</Eyebrow>
          <h1 className="font-mincho text-ink mt-6 sm:mt-9 text-3xl sm:text-4xl lg:text-[46px] leading-[1.35] sm:leading-[1.5]" style={{ letterSpacing: '.06em', fontWeight: 400 }}>
            お二人の結婚式を、<br />最高の<span className="text-goldDeep">音</span>と<span className="text-goldDeep">映像</span>で。
          </h1>
          <p className="font-gothic text-ink/75 sm:text-ink/65 mt-6 sm:mt-9 leading-[1.85] sm:leading-[2.1] text-[13px] sm:text-[13.5px]" style={{ maxWidth: 460 }}>
            打ち合わせの前に知っておきたい映像のつくり方やBGMのルールを、このページひとつで。
            ご提出も、ご質問も、ここで完結します。
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function QuickActions({ go }) {
  const icons = { video: IconFilm, bgm: IconMusic, submit: IconUpload };
  return (
    <section className="px-5 sm:px-14 py-12 sm:py-24">
      <div className="max-w-[1280px] mx-auto">
        <SectionHead en="Quick Access" title="まずは、こちらから。"
          sub="知りたいこと・やりたいことから選んでください。" center />
        <div className="grid grid-cols-1 md:grid-cols-3 border border-line md:border-r-0 md:border-b-0">
          {QUICK_ACTIONS.map((a, i) => {
            const I = icons[a.id];
            const targetId = a.target || a.scrollTo || a.tab || a.id;
            return (
              <Reveal key={a.id} as="a" href={`#${targetId}`} delay={i * 90}
                onClick={(e) => {
                  e.preventDefault();
                  go(targetId);
                }}
                className="group block text-left bg-white border-b md:border-r border-line px-6 sm:px-9 py-7 sm:py-11 transition-colors duration-300 hover:bg-cream/50 cursor-pointer no-underline last:border-b-0 md:last:border-b">
                <div className="text-goldDeep/70 transition-colors duration-300 group-hover:text-goldDeep">
                  <I size={26} />
                </div>
                <div className="font-mincho text-ink mt-5 sm:mt-8 text-base sm:text-[17px]" style={{ letterSpacing: '.04em' }}>{a.label}</div>
                <div className="font-gothic text-muted mt-2 text-[11.5px] sm:text-[12px]">{a.sub}</div>
                <div className="flex items-center gap-2 mt-6 sm:mt-9 text-goldDeep font-gothic transition-transform duration-300 group-hover:translate-x-1.5"
                  style={{ fontSize: 10.5, letterSpacing: '.18em' }}>
                  VIEW <IconChevR size={13} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AlertBand() {
  return (
    <Reveal className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-12 px-6 sm:px-12 py-7 sm:py-11 mb-9 sm:mb-14" style={{ background: '#2C2823' }}>
      <div className="shrink-0 border border-gold/40 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-gold"><IconClock size={24} /></div>
      <div className="flex-1">
        <div className="font-gothic text-goldSoft text-[11px] sm:text-[11.5px]" style={{ letterSpacing: '.22em' }}>ご提出期限のお願い</div>
        <div className="font-mincho text-ivory leading-[1.4] sm:leading-[1.55] mt-3 sm:mt-4 text-xl sm:text-[25px]" style={{ letterSpacing: '.04em', fontWeight: 400 }}>
          挙式の <span className="font-enserif text-gold text-3xl sm:text-[40px]">2</span> 週間前までに、映像データをご提出ください。
        </div>
        <p className="font-gothic text-ivory/60 sm:text-ivory/55 mt-3 sm:mt-4 leading-[1.75] sm:leading-[1.9] text-[12px] sm:text-[12.5px]" style={{ maxWidth: 660 }}>
          権利申請・音源準備・会場での再生確認のためのお時間です。お早めのご準備にご協力ください。
        </p>
      </div>
    </Reveal>
  );
}

Object.assign(window, { NAV, Header, Hero, QuickActions, AlertBand });

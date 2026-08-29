// ── Reusable UI primitives ─────────────────────────────────────

// Active page language — set via <script>window.LANG='en'</script> before these
// files load (see index.html vs index-en.html). Defaults to Japanese.
const LANG = window.LANG === 'en' ? 'en' : 'ja';
// Pick the string for the active language; falls back to the Japanese copy
// if no English translation was supplied for that piece of content yet.
function T(ja, en) {
  return LANG === 'en' ? (en != null && en !== '' ? en : ja) : ja;
}

// Brand logo — real Hmajor script wordmark (white bg keyed to transparent)
function Logo({ light = false, h = 40, className = '' }) {
  return (
    <img
      src={light ? 'logo/hmajor-mark-light.png' : 'logo/hmajor-mark.png'}
      alt="Hmajor"
      className={`select-none block ${className}`}
      style={{ height: h, width: 'auto' }}
      draggable="false"
    />
  );
}

// Striped placeholder for imagery we don't have yet
function Placeholder({ label, className = '', rounded = 'rounded-none', ratio }) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  return (
    <div className={`ph-stripes ${rounded} relative overflow-hidden ${className}`} style={style}>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10.5px] tracking-[.14em] px-3 py-1"
          style={{ color: '#9A8C6E', background: 'rgba(251,249,245,.78)' }}>{label}</span>
      </div>
    </div>
  );
}

// Small tag
function Chip({ children, tone = 'beige' }) {
  const tones = {
    beige: 'text-goldDeep border-beige',
    gold:  'bg-gold text-white border-gold',
    ghost: 'text-muted border-line',
  };
  return (
    <span className={`inline-flex items-center font-gothic text-[11.5px] tracking-[.06em] px-3 py-1 border ${tones[tone]}`}>
      {children}
    </span>
  );
}

// Eyebrow — wide-letterspaced latin label over a hairline
function Eyebrow({ en, children, center = false, light = false }) {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${center ? 'justify-center' : ''}`}>
      <span className={`h-px w-7 sm:w-10 ${light ? 'bg-gold/50' : 'bg-ink/20'}`}></span>
      <span className={`font-gothic uppercase ${light ? 'text-goldSoft' : 'text-goldDeep'}`}
        style={{ fontSize: 11, letterSpacing: '.24em' }}>{en}</span>
      {children && <span className="font-gothic text-[10.5px] sm:text-[11px] tracking-[.18em] text-muted truncate">{children}</span>}
    </div>
  );
}

// Section heading block
function SectionHead({ en, title, titleEn, sub, subEn, center = false }) {
  const shownTitle = T(title, titleEn);
  const shownSub = T(sub, subEn);
  return (
    <Reveal className={`${center ? 'text-center flex flex-col items-center' : ''} mb-9 sm:mb-14`}>
      <Eyebrow en={en} center={center} />
      <h2 className={`${LANG === 'en' ? 'font-enserif' : 'font-mincho'} text-ink mt-5 sm:mt-6 leading-[1.4] sm:leading-[1.45] text-2xl sm:text-[31px]`} style={{ letterSpacing: '.04em', fontWeight: 400 }}>{shownTitle}</h2>
      {shownSub && <p className="font-gothic text-muted mt-3.5 sm:mt-5 leading-[1.85] sm:leading-[2] text-[12.5px] sm:text-[13.5px]" style={{ maxWidth: 620 }}>{shownSub}</p>}
    </Reveal>
  );
}

// Link to the other-language version of the current page, keeping the
// current query string (?venue=...) and hash intact.
function otherLangHref() {
  const { pathname, search, hash } = window.location;
  const isEn = LANG === 'en';
  let newPath;
  if (/index-en\.html$/.test(pathname)) newPath = pathname.replace(/index-en\.html$/, 'index.html');
  else if (/index\.html$/.test(pathname)) newPath = pathname.replace(/index\.html$/, 'index-en.html');
  else if (pathname.endsWith('/')) newPath = pathname + (isEn ? 'index.html' : 'index-en.html');
  else newPath = pathname + (isEn ? '/index.html' : '/index-en.html');
  return newPath + search + hash;
}

function LangSwitch({ light = false, className = '' }) {
  return (
    <a href={otherLangHref()}
      className={`font-gothic shrink-0 whitespace-nowrap border transition-colors duration-300 no-underline px-3 py-1.5 ${
        light ? 'border-white/25 text-ivory/75 hover:border-white/60 hover:text-ivory' : 'border-ink/20 text-ink/65 hover:border-ink hover:text-ink'
      } ${className}`}
      style={{ fontSize: 11, letterSpacing: '.12em' }}>
      {LANG === 'en' ? '日本語' : 'EN'}
    </a>
  );
}

// Scroll-reveal wrapper — fades/slides children in once when scrolled into view.
// Renders as `as` (default div), forwarding className/style so it can drop into
// existing layout (grid/flex items) without adding extra box structure.
function Reveal({ children, as = 'div', delay = 0, className = '', style = {}, ...rest }) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ ...style, transitionDelay: visible ? `${delay}ms` : '0ms' }} {...rest}>
      {children}
    </Tag>
  );
}

// Button — squared, letterspaced, quiet
function Btn({ children, variant = 'solid', size = 'md', icon, onClick, className = '' }) {
  const sizes = { sm: 'text-[12px] px-5 py-2.5', md: 'text-[12.5px] px-7 py-3.5', lg: 'text-[13px] px-9 py-4' };
  const variants = {
    solid:   'bg-ink text-ivory border border-ink hover:bg-transparent hover:text-ink',
    gold:    'bg-goldDeep text-white border border-goldDeep hover:bg-transparent hover:text-goldDeep',
    outline: 'bg-transparent text-ink border border-ink/25 hover:border-ink',
    goldout: 'bg-transparent text-goldDeep border border-gold/60 hover:border-goldDeep',
    soft:    'bg-cream text-goldDeep border border-beige hover:bg-beige',
  };
  return (
    <button onClick={onClick}
      className={`group inline-flex items-center justify-center gap-2.5 font-gothic transition-colors duration-300 ${sizes[size]} ${variants[variant]} ${className}`}
      style={{ letterSpacing: '.12em' }}>
      {children}
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </button>
  );
}

Object.assign(window, { LANG, T, Logo, Placeholder, Chip, Eyebrow, SectionHead, Btn, Reveal, LangSwitch });

// ── App shell (embed build: no browser frame, natural page scroll) ──
const { useState, useEffect, useCallback } = React;

const SPY_IDS = ['top', 'manual', 'export', 'copyright', 'submit', 'support'];

function App() {
  const [active, setActive] = useState('top');

  const go = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 130;
      let cur = 'top';
      for (const id of SPY_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="mx-auto bg-ivory" style={{ maxWidth: 1280 }}>
      <Header go={go} active={active} />
      <Hero go={go} />
      <QuickActions go={go} />
      <ManualSection />
      <ExportGuideSection />
      <CopyrightSection />
      <PhilosophySection />
      <SubmitSection />
      <SupportSection />
      <Footer go={go} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

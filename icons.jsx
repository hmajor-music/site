// ── Inline line icons (stroke = currentColor) ──────────────────
const Ic = ({ d, size = 24, fill = false, sw = 1.6, children, vb = 24 }) => (
  <svg width={size} height={size} viewBox={`0 0 ${vb} ${vb}`} fill="none"
    stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const IconFilm   = (p) => <Ic {...p}><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/></Ic>;
const IconMusic  = (p) => <Ic {...p}><path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></Ic>;
const IconPerson = (p) => <Ic {...p}><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"/></Ic>;
const IconUpload = (p) => <Ic {...p}><path d="M12 16V4m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></Ic>;
const IconClock  = (p) => <Ic {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></Ic>;
const IconChevD  = (p) => <Ic {...p}><path d="M5 9l7 7 7-7"/></Ic>;
const IconChevR  = (p) => <Ic {...p}><path d="M9 5l7 7-7 7"/></Ic>;
const IconChevL  = (p) => <Ic {...p}><path d="M15 5l-7 7 7 7"/></Ic>;
const IconPlus   = (p) => <Ic {...p}><path d="M12 5v14M5 12h14"/></Ic>;
const IconMinus  = (p) => <Ic {...p}><path d="M5 12h14"/></Ic>;
const IconChat   = (p) => <Ic {...p}><path d="M21 12a8 8 0 01-11.5 7.2L4 20.5l1.4-5A8 8 0 1121 12z"/></Ic>;
const IconCheck  = (p) => <Ic {...p}><path d="M5 12.5l4.5 4.5L19 7"/></Ic>;
const IconClose  = (p) => <Ic {...p}><path d="M6 6l12 12M18 6L6 18"/></Ic>;
const IconSearch = (p) => <Ic {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></Ic>;
const IconDownload = (p) => <Ic {...p}><path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16"/></Ic>;
const IconMonitor  = (p) => <Ic {...p}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></Ic>;
const IconSpeaker  = (p) => <Ic {...p}><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="14" r="3"/><circle cx="12" cy="7" r="1"/></Ic>;
const IconSparkle  = (p) => <Ic {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></Ic>;
const IconArrowR = (p) => <Ic {...p}><path d="M4 12h16m0 0l-6-6m6 6l-6 6"/></Ic>;
const IconPin    = (p) => <Ic {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></Ic>;
const IconExternal = (p) => <Ic {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4"/></Ic>;
const IconAlert  = (p) => <Ic {...p}><path d="M12 4l9.5 16.5H2.5L12 4z"/><path d="M12 10v4.5M12 17.6v.4"/></Ic>;
const IconPhone  = (p) => <Ic {...p}><rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 18h2"/></Ic>;
const IconLaptop = (p) => <Ic {...p}><rect x="5" y="5" width="14" height="10" rx="1.5"/><path d="M3 19h18"/></Ic>;
const IconHeart  = (p) => <Ic {...p}><path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20z"/></Ic>;
const IconMenu   = (p) => <Ic {...p}><path d="M4 6h16M4 12h16M4 18h16"/></Ic>;
const IconPlay   = (p) => <Ic {...p} fill><path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/></Ic>;

Object.assign(window, {
  IconFilm, IconMusic, IconPerson, IconUpload, IconClock, IconChevD, IconChevR, IconChevL,
  IconPlus, IconMinus, IconChat, IconCheck, IconClose, IconSearch, IconDownload,
  IconMonitor, IconSpeaker, IconSparkle, IconArrowR, IconHeart, IconPin, IconExternal, IconAlert, IconPhone, IconLaptop, IconMenu, IconPlay,
});

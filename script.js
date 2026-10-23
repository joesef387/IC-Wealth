/* IC Wealth prototype: all data is placeholder, nothing is sent anywhere. */
const $ = (s) => document.querySelector(s);

/* ---------- data ---------- */
const STOCKS = [
  { s: "DPRP",   n: "Dangote Petroleum Refinery and Petrochemicals", p: 4.74,  c: 0,     sh: 0 },
  { s: "MTNGH",  n: "MTN Ghana Limited",           p: 6.55,  c: 0,     sh: 600 },
  { s: "CAL",    n: "CAL Bank Limited",            p: 0.73,  c: 0,     sh: 1341 },
  { s: "KASA",   n: "Kasapreko Plc",               p: 1.89,  c: 0,     sh: 5752 },
  { s: "CPC",    n: "Cocoa Processing Company",    p: 0.38,  c: 8.57,  sh: 0 },
  { s: "GGBL",   n: "Guinness Ghana Breweries Ltd", p: 10.70, c: 0,    sh: 0 },
  { s: "RBGH",   n: "Republic Bank Ghana",         p: 4.09,  c: 0,     sh: 0 },
  { s: "ADB",    n: "Agricultural Development Bank", p: 5.30, c: 0,    sh: 0 },
  { s: "CMLT",   n: "Camelot Ghana Ltd",           p: 0.14,  c: 0,     sh: 0 },
  { s: "TOTAL",  n: "Total Petroleum Ghana Ltd",   p: 41.00, c: 0,     sh: 0 },
  { s: "UNIL",   n: "Unilever Ghana Limited",      p: 39.50, c: 0,     sh: 0 },
  { s: "ACCESS", n: "Access Bank Ghana",           p: 20.75, c: 0,     sh: 0 },
  { s: "SOGEGH", n: "Societe Generale Ghana Limited", p: 5.09, c: 0,   sh: 0 },
  { s: "SIC",    n: "SIC Insurance Company Limited", p: 5.00, c: -5.30, sh: 0 },
  { s: "TLW",    n: "Tullow Oil PLC",              p: 13.11, c: 0,     sh: 0 },
  { s: "GOIL",   n: "Ghana Oil Company Limited",   p: 5.68,  c: 0,     sh: 0 },
];
const POSTS = [
  ["IC Stock Watch: Week of 5th October 2026", "October 6, 2026"],
  ["The gender pay gap: why it still exists in Ghana", "October 2, 2026"],
  ["IC Stock Watch: Week of 21st September 2026", "September 22, 2026"],
  ["Why money decisions feel emotional even when we know better", "September 17, 2026"],
];
const CASH = { "TradeLive Portfolio": 0.08, "IC Liquidity Fund": 0.67 };
const RANGES = { "1W": 7, "1M": 22, "3M": 30, "6M": 40, YTD: 45, "1Y": 60 };
const ORDER_HISTORY = {
  CAL: [
    { id: "cal-1", side: "Sell", shares: 1, date: "16th October 2026", status: "Cancelled" },
    { id: "cal-2", side: "Buy", shares: 16, date: "13th October 2026", status: "Complete" },
    { id: "cal-3", side: "Buy", shares: 35, date: "6th October 2026", status: "Complete" },
    { id: "cal-4", side: "Buy", shares: 139, date: "24th September 2026", status: "Complete" },
    { id: "cal-5", side: "Buy", shares: 142, date: "22nd September 2026", status: "Cancelled" },
    { id: "cal-6", side: "Buy", shares: 100, date: "9th September 2026", status: "Complete" },
    { id: "cal-7", side: "Buy", shares: 1473, date: "7th September 2026", status: "Cancelled" },
    { id: "cal-8", side: "Buy", shares: 1270, date: "29th July 2026", status: "Complete" },
    { id: "cal-9", side: "Buy", shares: 800, date: "27th July 2026", status: "Complete" },
    { id: "cal-10", side: "Buy", shares: 10, date: "31st May 2026", status: "Cancelled" },
    { id: "cal-11", side: "Sell", shares: 1019, date: "20th May 2026", status: "Complete" },
    { id: "cal-12", side: "Buy", shares: 1000, date: "12th May 2026", status: "Cancelled" },
  ],
  MTNGH: [
    { id: "mtn-1", side: "Buy", shares: 14, date: "8th October 2026", status: "Complete" },
    { id: "mtn-2", side: "Buy", shares: 15, date: "12th October 2026", status: "Cancelled" },
    { id: "mtn-3", side: "Buy", shares: 8, date: "22nd September 2026", status: "Cancelled" },
    { id: "mtn-4", side: "Buy", shares: 586, date: "14th August 2026", status: "Complete" },
  ],
  KASA: [
    { id: "kasa-1", side: "Buy", shares: 20, date: "6th October 2026", status: "Complete" },
    { id: "kasa-2", side: "Buy", shares: 12, date: "15th September 2026", status: "Complete" },
    { id: "kasa-3", side: "Buy", shares: 5720, date: "14th August 2026", status: "Complete" },
  ],
};

/* ---------- state ---------- */
const S = {
  view: "login",          // login | dash | lf | tl | ins | stock | withdraw | transfer | transactions
  from: "dash",           // where the back button returns to
  hide: false,
  mode: "Email",
  passwordVisible: false,
  eq: "Equities",
  q: "",
  open: { tl: true, lf: true },
  auto: false,
  sym: "KASA",
  tab: "Details",
  range: "1Y",
  drawerOpen: false,
  expandedTransaction: null,
  transactions: [
    { id: "sample-1", title: "Cash Deposit: GHS 5.00", amount: 5, date: "13th October 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-2", title: "Cash Deposit: GHS 1,000.00", amount: 1000, date: "13th October 2026", status: "Cancelled", detail: "Cash deposit to TradeLive Portfolio was cancelled." },
    { id: "sample-3", title: "Cash Deposit: GHS 1,000.00", amount: 1000, date: "13th October 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-4", title: "Buy 15 MTNGH", amount: 102.75, date: "12th October 2026", status: "Cancelled", detail: "Purchase of 15 MTNGH shares was cancelled." },
    { id: "sample-5", title: "Cash Deposit: GHS 100.00", amount: 100, date: "12th October 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-6", title: "Buy 14 MTNGH", amount: 95.9, date: "8th October 2026", status: "Complete", detail: "Purchase of 14 MTNGH shares." },
    { id: "sample-7", title: "Cash Deposit: GHS 250.00", amount: 250, date: "7th October 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-8", title: "Cash withdrawal: GHS 2000.00", amount: 2000, date: "6th October 2026", status: "Complete", detail: "Cash withdraw to MTN WALLET." },
    { id: "sample-8", title: "Buy 20 KASA", amount: 37, date: "6th October 2026", status: "Complete", detail: "Purchase of 20 KASA shares." },
    { id: "sample-9", title: "Cash Deposit: GHS 50.00", amount: 50, date: "5th October 2026", status: "Cancelled", detail: "Cash deposit to TradeLive Portfolio was cancelled." },
    { id: "sample-10", title: "Buy 10 CAL", amount: 6.9, date: "2nd October 2026", status: "Complete", detail: "Purchase of 10 CAL shares." },
    { id: "sample-11", title: "Cash Deposit: GHS 500.00", amount: 500, date: "30th September 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-12", title: "Buy 5 GGBL", amount: 53.5, date: "28th September 2026", status: "Complete", detail: "Purchase of 5 GGBL shares." },
    { id: "sample-13", title: "Cash Withdrawal: GHS 75.00", amount: 75, date: "25th September 2026", status: "Complete", detail: "Cash withdrawal from TradeLive Portfolio." },
    { id: "sample-14", title: "Buy 8 MTNGH", amount: 54.8, date: "22nd September 2026", status: "Cancelled", detail: "Purchase of 8 MTNGH shares was cancelled." },
    { id: "sample-15", title: "Cash Deposit: GHS 200.00", amount: 200, date: "18th September 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-16", title: "Buy 12 KASA", amount: 22.2, date: "15th September 2026", status: "Complete", detail: "Purchase of 12 KASA shares." },
    { id: "sample-17", title: "Transfer: GHS 40.00", amount: 40, date: "10th September 2026", status: "Complete", detail: "Transfer from IC Liquidity Fund to TradeLive Portfolio." },
    { id: "sample-18", title: "Cash Deposit: GHS 150.00", amount: 150, date: "4th September 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
    { id: "sample-19", title: "Buy 3 CAL", amount: 2.07, date: "1st September 2026", status: "Complete", detail: "Purchase of 3 CAL shares." },
    { id: "sample-20", title: "Cash Deposit: GHS 300.00", amount: 300, date: "28th August 2026", status: "Complete", detail: "Cash deposit to TradeLive Portfolio." },
  ],
};
const TABS = ["dash", "lf", "tl", "ins"];
const ACCOUNT_NAME = "ALBERTA SELASIE AGBO";
const ACCOUNT_NUMBER = "2611521148";

/* ---------- helpers ---------- */
const money = (v, d = 2) =>
  S.hide ? "********" : v.toLocaleString("en-GH", { minimumFractionDigits: d, maximumFractionDigits: d });
const stock = (sym) => STOCKS.find((x) => x.s === sym);
const held = () => STOCKS.filter((x) => x.sh > 0);
const totalShares = () => held().reduce((total, x) => total + x.sh, 0);
const portfolioValue = () => held().reduce((a, x) => a + x.sh * x.p, 0);
const stockOrders = (symbol) => ORDER_HISTORY[symbol] || [];
const chgClass = (c) => (c > 0 ? "u" : c < 0 ? "d" : "");
const initials = (s) => s.slice(0, 3);
const STOCK_LOGOS = {
  DPRP: ["dangote", "DANGOTE"],
  MTNGH: ["mtn", '<span>MTN</span>'],
  CAL: ["calbank", '<i></i><span>CalBank</span>'],
  KASA: ["kasapreko", ""],
  CPC: ["cpc", "CPC"],
  GGBL: ["guinness", "G"],
  RBGH: ["republic", "RBG"],
  ADB: ["adb", "ADB"],
  CMLT: ["camelot", "CMLT"],
  TOTAL: ["total", "TOTAL"],
  UNIL: ["unilever", "U"],
  ACCESS: ["access", "A"],
  SOGEGH: ["sogeg", "SG"],
  SIC: ["sic", "SIC"],
  TLW: ["tullow", "TLW"],
  GOIL: ["goil", "GOIL"],
};
const STOCK_LOGO_IMAGES = {
  DPRP: "dangote-logo.png",
  KASA: "kasapreko-logo.png",
  GGBL: "guinness-logo.png",
  ADB: "adb-logo.png",
  CMLT: "camelot-logo.png",
  TOTAL: "total-logo.png",
  ACCESS: "access-logo.png",
  SIC: "sic-logo.png",
  GOIL: "goil-logo.png",
};
const stockLogo = (symbol) => {
  const image = STOCK_LOGO_IMAGES[symbol];
  if (image) {
    const [style] = STOCK_LOGOS[symbol];
    return `<span class="logo logo-${style}" role="img" aria-label="${stock(symbol).n} logo"><img src="assets/${image}" alt=""></span>`;
  }
  const [style, mark] = STOCK_LOGOS[symbol] || ["default", initials(symbol)];
  return `<span class="logo logo-${style}" role="img" aria-label="${stock(symbol).n} logo">${mark}</span>`;
};

const ICON = {
  menu: '<svg class="ico" viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h16"/></svg>',
  bell: '<svg class="ico" viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4"/></svg>',
  dash: '<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
  lf: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3 3 7 3s7-1.3 7-3v-5"/>',
  tl: '<rect x="4" y="4" width="16" height="12" rx="1"/><path d="M7 13l3-4 3 2 4-5M9 20h6"/>',
  ins: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
};
const NAMES = { dash: "Dashboard", lf: "Liquidity Fund", tl: "TradeLive", ins: "Insights" };

const DRAWER_ICONS = {
  statement: '<path d="M6 3h9l4 4v14H6zM15 3v5h5M9 12h7M9 16h7"/>',
  profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7"/>',
  fees: '<path d="M3 15h5l3-2h5a2 2 0 0 1 0 4h-5M3 19h10l7-4a2 2 0 0 0-2-3l-5 2M15 8c1-3 6-2 6 1 0 2-3 2-3 4"/>',
  faq: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.6 1.7c-1.2 1.1-2.1 1.5-2.1 3M12 17h.01"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5.5 16c.8-2 4.2-2 5 0M13 10h5M13 14h5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.6.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.6-.9l-1.7.6-1.4-2.4 1.4-1.1A7 7 0 0 1 7.5 13l-1.8-.4v-2.8l1.8-.3a8 8 0 0 1 .8-1.7L7.7 6l2.4-1.4 1.1 1.4a8 8 0 0 1 1.8-.1l.4-1.8h2.8l.3 1.8a8 8 0 0 1 1.7.8L20 6l1.4 2.4-1.4 1.1a8 8 0 0 1 .1 1.8l1.8.4v2.8l-1.8.3a8 8 0 0 1-.7 1.7"/>',
  logout: '<path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/>',
};
const drawerItem = (icon, label, action = "drawer-item") =>
  `<button class="drawer-item" data-a="${action}" data-k="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${DRAWER_ICONS[icon]}</svg><span>${label}</span></button>`;
const drawer = () => `
  <div class="drawer-layer">
    <button class="drawer-scrim" data-a="drawer-close" aria-label="Close menu"></button>
    <aside class="drawer" aria-label="Account menu">
      <div class="drawer-profile">
        <div class="avatar">AS</div>
        <div><b>${ACCOUNT_NAME} <span class="verified" aria-label="Verified">✓</span></b><span>${ACCOUNT_NUMBER}</span></div>
      </div>
      <div class="drawer-main">
        ${drawerItem("statement", "Get Statement")}
        ${drawerItem("profile", "Profile")}
        ${drawerItem("fees", "Fees")}
        ${drawerItem("faq", "FAQs")}
      </div>
      <div class="drawer-footer">
        ${drawerItem("contact", "Contact Us")}
        ${drawerItem("settings", "Settings")}
        ${drawerItem("logout", "Logout", "logout")}
      </div>
    </aside>
  </div>`;
const topbar = `<div class="top"><button class="menu-trigger" data-a="drawer-open" aria-label="Open menu">${ICON.menu}</button>${ICON.bell}</div>`;
const eyeBtn = () => `<button class="eye" data-a="hide" aria-label="${S.hide ? "Show balances" : "Hide balances"}" title="${S.hide ? "Show balances" : "Hide balances"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3.2"/>${S.hide ? '<path d="M3 3l18 18"/>' : ""}</svg></button>`;
const subhdr = (title) =>
  `<div class="subhdr"><button class="back" data-a="back" aria-label="Go back">‹</button><span class="title">${title}</span></div>`;

/* deterministic pseudo-random price history so the chart is stable */
function series(sym, range) {
  const n = RANGES[range];
  let seed = [...sym].reduce((a, ch) => a + ch.charCodeAt(0), 0) + n;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const end = stock(sym).p;
  const pts = [end];
  for (let i = 1; i < n; i++) pts.unshift(Math.max(0.01, pts[0] * (1 + (rnd() - 0.5) * 0.08)));
  return pts;
}
function chartSVG(pts) {
  const W = 340, H = 150, min = Math.min(...pts), max = Math.max(...pts), span = max - min || 1;
  const xy = pts.map((v, i) => [(i / (pts.length - 1)) * W, H - 10 - ((v - min) / span) * (H - 20)]);
  const line = xy.map((p) => p.join(",")).join(" ");
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Price chart">
    <polygon points="0,${H} ${line} ${W},${H}" fill="#002a5c" fill-opacity=".14"/>
    <polyline points="${line}" fill="none" stroke="#0a3a73" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;
}

/* ---------- screens ---------- */
const V = {};

V.login = () => `
  <main class="login-screen">
    <section class="login-hero">
      <svg class="login-ribbon" viewBox="0 0 430 280" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="ribbon" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#27364c"/><stop offset=".55" stop-color="#685044"/><stop offset="1" stop-color="#81513a"/></linearGradient></defs>
        <path d="M-35 280 190 80c64-58 155-46 204 18l90 124" fill="none" stroke="url(#ribbon)" stroke-width="28"/>
      </svg>
      <div class="login-register"><button class="login-back" aria-label="Back">‹</button><b>Register</b></div>
      <div class="brand-lockup" aria-label="IC Wealth">
        <svg class="brand-dots" viewBox="0 0 58 58" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => {
          const x = 7 + (i % 6) * 9, y = 7 + Math.floor(i / 6) * 9;
          return `<circle cx="${x}" cy="${y}" r="${(i + Math.floor(i / 6)) % 4 === 0 ? 2.1 : 1.4}" fill="${(i + Math.floor(i / 6)) % 4 === 0 ? "#e87500" : "#fff"}"/>`;
        }).join("")}</svg>
        <span><b>IC</b> Wealth</span>
      </div>
    </section>
    <section class="login-panel">
      <p class="login-prompt">Please log in to continue</p>
      <div class="seg login-seg">${["Email", "Phone"].map((m) => `<button class="${S.mode === m ? "on" : ""}" data-a="mode" data-k="${m}">${m}</button>`).join("")}</div>
      <label for="u">${S.mode === "Email" ? "Email Address" : "Phone Number"}</label>
      <div class="login-input-wrap">
        <svg viewBox="0 0 24 24" aria-hidden="true">${S.mode === "Email" ? '<path d="M3 6h18v12H3zM3 7l9 7 9-7"/>' : '<path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h3"/>'}</svg>
        <input id="u" type="${S.mode === "Email" ? "email" : "tel"}" value="${S.mode === "Email" ? "agboalberta64@gmail.com" : ""}" placeholder="${S.mode === "Email" ? "you@example.com" : "024 000 0000"}">
      </div>
      <label for="pw">Password</label>
      <div class="login-input-wrap">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>
        <input id="pw" type="${S.passwordVisible ? "text" : "password"}" minlength="18" required autocomplete="current-password" aria-describedby="pw-help">
        <button class="password-toggle" data-a="password" aria-label="${S.passwordVisible ? "Hide password" : "Show password"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <small id="pw-help" class="mute">Password must be at least 18 characters.</small>
      <p class="reset-row"><button class="link" data-a="reset-password">Reset Password</button></p>
      <div class="login-actions"><button class="btn login-submit" data-a="login">LOGIN</button><button class="btn scan-button" data-a="scan" aria-label="Scan to log in"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3M8 9v2M12 8v3M16 9v2M8 15h2M13 14h3v3h-3z"/></svg></button></div>
    </section>
  </main>`;

V.dash = () => {
  const tl = portfolioValue() + CASH["TradeLive Portfolio"];
  const lf = CASH["IC Liquidity Fund"];
  return `
  <div class="hdr">${topbar}
    <p class="mute" style="font-size:20px">Welcome back,</p>
    <h2 class="account-name">${ACCOUNT_NAME}</h2>
    <p class="mute" style="text-align:center;margin-top:18px;font-size:22px">Total Holdings</p>
    <p class="big" style="text-align:center">GHS ${money(tl + lf)} ${eyeBtn()}</p>
  </div>
  <div class="card">
    <button class="acc" data-a="open" data-k="tl"><span class="portfolio-title"><svg class="portfolio-mark" viewBox="0 0 24 24" aria-hidden="true">${ICON.tl}</svg><span><small>77000123526</small><b>TradeLive Portfolio</b></span></span><span style="text-align:right"><small>Total Value</small><b>GHS ${money(tl)}</b></span></button>
    <div class="row"><span>Total shares</span><b>${totalShares().toLocaleString()}</b></div>
    ${S.open.tl ? held().map((x) => `<button class="row stock-row" data-a="stock" data-k="${x.s}"><span class="tick">${stockLogo(x.s)}${x.s}</span><span class="mute" style="font-size:20px">${money(x.sh * x.p)}</span></button>`).join("") +
      `<div class="row"><span>Available cash balance</span><span>${money(CASH["TradeLive Portfolio"])}</span></div>` : ""}
  </div>
  <div class="card">
    <button class="acc" data-a="open" data-k="lf"><span class="portfolio-title"><svg class="portfolio-mark" viewBox="0 0 24 24" aria-hidden="true">${ICON.lf}</svg><b>IC Liquidity Fund</b></span><span style="text-align:right"><small>Total Value</small><b>GHS ${money(lf)}</b></span></button>
    ${S.open.lf ? `<div class="pad"><div class="row" style="padding:0 0 14px"><span class="fund-details"><svg class="fund-mark" viewBox="0 0 24 24" aria-hidden="true">${ICON.lf}</svg><span><small class="mute">22000381841</small><br><b style="font-size:20px">IC Liquidity Fund</b></span></span><span class="mute" style="font-size:20px">${money(lf)}</span></div>
    <button class="btn ghost full" data-a="info" data-t="Set a goal" data-m="Goal setting is not built yet.">Add New Goal +</button></div>` : ""}
  </div>`;
};

V.lf = () => `
  <div class="hdr" style="text-align:center;padding-bottom:70px">${topbar}
    <p style="font-size:20px">IC Liquidity Fund</p>
    <p class="big">GHS ${money(CASH["IC Liquidity Fund"])} ${eyeBtn()}</p>
    <button class="btn" style="margin-top:16px" data-a="info" data-t="Invest" data-m="Investing is not connected to a backend yet.">Invest</button>
  </div>
  <div class="card stats"><div><b>7.41 %</b><span>YTD Return</span></div><div><b>9.49 %</b><span>Annualised Return</span></div><div><b>2.24777</b><span>Unit Price</span></div></div>
  <div class="acts">
    <button data-a="go" data-k="transfer"><i>⇅</i>Transfer Funds</button>
    <button data-a="go" data-k="withdraw"><i>↑</i>Withdraw</button>
    <button data-a="info" data-t="Switch goal" data-m="Not built yet."><i>⇄</i>Switch Goal</button>
    <button data-a="go" data-k="transactions"><i>≣</i>Transactions</button>
  </div>
  <div class="card pad">
    <div style="display:flex;justify-content:space-between;align-items:center"><h3 style="font-weight:500;font-size:22px">Your target</h3><button class="pill small" data-a="info" data-t="Set a target" data-m="Not built yet.">Set Target</button></div>
    <p class="mute" style="text-align:right;margin-top:8px">GHS 1,000.00 by June 20, 2026</p>
    <div class="bar"><span style="width:.07%"></span></div><p style="text-align:center;font-size:13px">0.07%</p>
  </div>
  <div class="card pad" style="text-align:center">
    <h3 style="font-weight:500;font-size:22px;text-align:left">Automated Investment</h3>
    <p class="mute" style="font-size:22px;margin:10px 0">${S.auto ? "Automated Investment active" : "Automated Investment not added"}</p>
    <button class="link" data-a="auto">${S.auto ? "Remove Automated Investment" : "Add Automated Investment"}</button>
  </div>`;

V.tl = () => {
  const list = STOCKS.filter((x) => (x.s + x.n).toLowerCase().includes(S.q.toLowerCase()));
  return `
  <div class="hdr" style="padding-bottom:16px">${topbar}
    <p style="text-align:center;font-size:20px;margin-bottom:14px">TradeLive Portfolio</p>
    <p style="text-align:center;font-size:16px;margin-bottom:14px">${totalShares().toLocaleString()} total shares</p>
    <div class="pills">${["Equities", "Fixed Income"].map((x) => `<button class="pill ${S.eq === x ? "on" : ""}" data-a="eq" data-k="${x}">${x}</button>`).join("")}</div>
  </div>
  <div class="card" style="margin-top:-8px">
    <div class="pad" style="padding-bottom:10px"><span class="nm" style="text-transform:none;font-size:15px">Available cash balance</span>
      <p class="big" style="font-size:30px">GHS ${money(CASH["TradeLive Portfolio"])} ${eyeBtn()}</p>
      <p style="color:var(--orange);font-size:15px">Excludes cash held for pending buy orders and transfers.</p></div>
    <div class="acts light" style="border-top:1px solid var(--line);padding-bottom:14px">
      <button data-a="info" data-t="Invest" data-m="Investing is not connected to a backend yet."><i>⇩</i>Invest</button>
      <button data-a="go" data-k="transfer"><i>⇅</i>Transfer</button>
      <button data-a="go" data-k="withdraw"><i>⇧</i>Withdraw</button>
      <button data-a="go" data-k="transactions"><i>≣</i>Transactions</button>
    </div>
  </div>
  <div class="card"><input id="q" placeholder="Search Stock" value="${S.q}" aria-label="Search stock" style="border:0"></div>
  <div class="card">${S.eq === "Equities"
    ? list.map((x) => `<button class="row stock-row" data-a="stock" data-k="${x.s}">
        <span style="display:flex;gap:14px;align-items:center">${stockLogo(x.s)}<span><div class="sy">${x.s}</div><div class="nm">${x.n}</div></span></span>
        <span class="price">${x.p.toFixed(2)}${x.sh ? `<br><span class="shares">${x.sh.toLocaleString()} Shares</span>` : ""}<br><span class="chg ${chgClass(x.c)}">${x.c.toFixed(2)}%</span></span></button>`).join("") || '<p class="pad mute">No stock matches your search.</p>'
    : '<p class="pad mute">No fixed income holdings yet.</p>'}</div>`;
};

V.transactions = () => `
  ${subhdr("Transactions")}
  <p class="transaction-demo-note">Sample demo history · not live account activity</p>
  <div class="card">
    ${S.transactions.map((tx) => `
      <button class="transaction" data-a="tx-detail" data-k="${tx.id}" aria-expanded="${S.expandedTransaction === tx.id}">
        <span class="transaction-info"><b>${tx.title}</b><small class="mute">${tx.date}</small></span>
        <span class="transaction-status ${tx.status.toLowerCase()}">${tx.status}</span>
        <span class="transaction-chevron" aria-hidden="true">${S.expandedTransaction === tx.id ? "⌃" : "⌄"}</span>
        ${S.expandedTransaction === tx.id ? `<span class="transaction-detail">${tx.detail} <small>Sample demo history</small></span>` : ""}
      </button>`).join("")}
  </div>`;

V.ins = () => `
  <div class="hdr" style="padding-bottom:30px">${topbar}
    <div class="seg" style="background:#fff"><button class="on" style="background:var(--navy);color:#fff">Insights</button><button style="color:var(--navy)">Fact Sheets</button></div>
    <div style="text-align:right;margin-top:18px"><button class="btn" style="padding:8px 22px;font-size:18px">Personal Investing ▾</button></div>
  </div>
  <div style="background:var(--card)">${POSTS.map((p) => `<div class="post"><span>Personal Investing</span><h3>${p[0]}</h3><small>${p[1]}</small></div>`).join("")}</div>`;

V.stock = () => {
  const x = stock(S.sym), pts = series(S.sym, S.range), value = x.sh * x.p;
  const hi = Math.max(...pts).toFixed(2), lo = Math.min(...pts).toFixed(2);
  const orderHistory = stockOrders(x.s);
  return `
  ${subhdr(x.s)}
  <div class="detail-head">
    <div><div class="nm" style="text-transform:none;font-size:16px;color:var(--ink)">${x.n}</div>
      <div class="detail-price">${x.p.toFixed(2)} <span class="chg ${chgClass(x.c)}" style="font-size:16px">${(x.p * x.c / 100).toFixed(2)} (${x.c.toFixed(2)}%)</span></div>
      <div class="mute" style="font-size:13px">As of 14 Oct 2026, 7:44 PM GMT</div></div>
    <span class="closed">Market Closed</span>
  </div>
  <div class="tabs">${["Details", "Order History", "Dividend History"].map((t) => `<button class="${S.tab === t ? "on" : ""}" data-a="tab" data-k="${t}">${t}</button>`).join("")}</div>
  ${S.tab === "Details" ? `
    <div class="quote"><div><span>Buy</span><b>${x.p.toFixed(2)}</b></div><div><span>Buy Vol</span><b>17,333</b></div><div><span>Sell</span><b>${(x.p + 0.09).toFixed(2)}</b></div><div><span>Sell Vol</span><b>35,757</b></div></div>
    <div class="chart">${chartSVG(pts)}</div>
    <div class="ranges">${Object.keys(RANGES).map((r) => `<button class="${S.range === r ? "on" : ""}" data-a="range" data-k="${r}">${r}</button>`).join("")}</div>
    <div class="card pad"><h3 style="font-weight:500;font-size:20px;margin-bottom:8px">My Holdings ${eyeBtn()}</h3>
      <div class="row" style="padding:8px 0"><span class="mute">Shares</span><span>${S.hide ? "********" : x.sh.toLocaleString()}</span></div>
      <div class="row" style="padding:8px 0"><span class="mute">Current market value</span><span>${money(value)}</span></div></div>
    <div class="card pad"><h3 style="font-weight:500;font-size:20px;margin-bottom:8px">Today's Statistics</h3>
      <div class="row" style="padding:8px 0"><span class="mute">Open</span><span>${x.p.toFixed(2)}</span><span class="mute">High</span><span>${hi}</span><span class="mute">Low</span><span>${lo}</span></div></div>`
  : S.tab === "Order History"
    ? orderHistory.length
      ? `<p class="transaction-demo-note">Sample demo order history · completed orders reconcile to current holdings</p>
        <div class="order-history">${orderHistory.map((order) => {
          const title = `${order.side} ${order.shares.toLocaleString()} ${x.s}`;
          const detail = `${order.side === "Buy" ? "Purchase" : "Sale"} of ${order.shares.toLocaleString()} ${x.s} shares${order.status === "Cancelled" ? " was cancelled" : ""}.`;
          return `<button class="transaction" data-a="tx-detail" data-k="${order.id}" aria-expanded="${S.expandedTransaction === order.id}">
            <span class="transaction-info"><b>${title}</b><small class="mute">${order.date}</small></span>
            <span class="transaction-status ${order.status.toLowerCase()}">${order.status}</span>
            <span class="transaction-chevron" aria-hidden="true">${S.expandedTransaction === order.id ? "⌃" : "⌄"}</span>
            ${S.expandedTransaction === order.id ? `<span class="transaction-detail">${detail} <small>Sample demo history</small></span>` : ""}
          </button>`;
        }).join("")}</div>`
      : '<p class="pad mute">No orders yet for this stock.</p>'
    : '<p class="pad mute">No dividends paid for this stock yet.</p>'}
  <div class="trade-bar"><button class="btn" data-a="trade" data-k="sell">Sell</button><button class="btn navy" data-a="trade" data-k="buy">Buy</button></div>`;
};

V.withdraw = () => `
  ${subhdr("Withdraw")}
  <div class="pad" style="text-align:center"><p class="mute">Current cash balance</p><p class="big" id="bal" style="font-size:30px">GHS ${money(CASH["TradeLive Portfolio"])}</p></div>
  <div class="pad" style="padding-top:0">
    <label for="port">Select portfolio</label>
    <select id="port">${Object.keys(CASH).map((k) => `<option>${k}</option>`).join("")}</select>
    <label for="amt">Amount</label><input id="amt" inputmode="decimal" placeholder="0.00">
    <label for="rem">Remaining Amount</label><input id="rem" disabled value="${CASH["TradeLive Portfolio"].toFixed(2)}">
    <p class="err" id="err"></p>
    <div style="display:flex;gap:14px;margin-top:20px"><button class="btn navy" style="flex:1" data-a="back">Cancel</button><button class="btn" style="flex:1" data-a="withdraw">Submit</button></div>
  </div>`;

V.transfer = () => `
  ${subhdr("Transfer Funds")}
  <div class="pad">
    <label for="tf">Transfer From</label>
    <select id="tf">${Object.keys(CASH).map((k) => `<option>${k}</option>`).join("")}</select>
    <label for="tt">Transfer To</label>
    <select id="tt"><option value="">Select portfolio</option>${Object.keys(CASH).map((k) => `<option>${k}</option>`).join("")}</select>
    <p style="text-align:right;margin-top:10px"><button class="link" data-a="all">Transfer All</button></p>
    <label for="amt" style="margin-top:4px">Amount</label><input id="amt" inputmode="decimal" placeholder="0.00">
    <p class="err" id="err"></p>
    <div class="card" style="margin:8px 0 0"><div class="row"><span><b>TradeLive Portfolio</b><br><span class="mute">Amount Remaining</span></span><b id="r1">${CASH["TradeLive Portfolio"].toFixed(2)}</b></div></div>
    <div style="display:flex;gap:14px;margin-top:24px"><button class="btn navy" style="flex:1" data-a="back">Cancel</button><button class="btn" style="flex:1" data-a="transfer">Submit</button></div>
  </div>`;

/* ---------- render ---------- */
function render() {
  const refocus = document.activeElement && document.activeElement.id === "q";
  const showNav = TABS.includes(S.view);
  $("#app").innerHTML =
    V[S.view]() +
    (showNav
      ? `<nav>${TABS.map((k) => `<button class="${S.view === k ? "on" : ""}" data-a="nav" data-k="${k}"><svg viewBox="0 0 24 24">${ICON[k]}</svg>${NAMES[k]}</button>`).join("")}
         <button class="fab" data-a="info" data-t="Invest" data-m="Investing is not connected to a backend yet.">Invest</button></nav>`
      : "") +
    (S.drawerOpen ? drawer() : "");
  if (refocus) { const q = $("#q"); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
}
function say(title, text) {
  $("#dlg-title").textContent = title;
  $("#dlg-text").textContent = text;
  $("#dlg").showModal();
}
function navigate(view, from) {
  S.view = view;
  if (from) S.from = from;
  window.scrollTo(0, 0);
  render();
}

/* ---------- events ---------- */
document.addEventListener("click", (e) => {
  if (e.target.id === "dlg-close") return $("#dlg").close();
  const b = e.target.closest("[data-a]");
  if (!b) return;
  const a = b.dataset.a, k = b.dataset.k;
  switch (a) {
    case "drawer-open": S.drawerOpen = true; break;
    case "drawer-close": S.drawerOpen = false; break;
    case "drawer-item": {
      const messages = {
        "Get Statement": "Statements are not available in this demo yet.",
        Profile: "Profile details are not available in this demo yet.",
        Fees: "Fee information is not available in this demo yet.",
        FAQs: "Frequently asked questions are not available in this demo yet.",
        "Contact Us": "Contact information is not available in this demo yet.",
        Settings: "Settings are not available in this demo yet.",
      };
      S.drawerOpen = false;
      render();
      return say(k, messages[k]);
    }
    case "logout": S.drawerOpen = false; return navigate("login");
    case "login": {
      const password = $("#pw");
      if (!password.reportValidity()) return;
      return navigate("dash");
    }
    case "password": S.passwordVisible = !S.passwordVisible; break;
    case "reset-password": return say("Reset Password", "Password reset is not connected in this demo yet.");
    case "scan": return say("Scan to log in", "QR code login is not connected in this demo yet.");
    case "nav": return navigate(k);
    case "go": return navigate(k, S.view);
    case "back": return navigate(S.from);
    case "stock": S.sym = k; S.tab = "Details"; S.range = "1Y"; return navigate("stock", S.view);
    case "hide": S.hide = !S.hide; break;
    case "open": S.open[k] = !S.open[k]; break;
    case "eq": S.eq = k; break;
    case "mode": S.mode = k; break;
    case "tab": S.tab = k; break;
    case "tx-detail": S.expandedTransaction = S.expandedTransaction === k ? null : k; break;
    case "range": S.range = k; break;
    case "auto": S.auto = !S.auto; break;
    case "info": return say(b.dataset.t, b.dataset.m);
    case "trade": {
      const x = stock(S.sym);
      return say(`${k === "buy" ? "Buy" : "Sell"} ${x.s}`, `The market is closed and orders are not connected yet. Last price: GHS ${x.p.toFixed(2)}.`);
    }
    case "all": { $("#amt").value = CASH[$("#tf").value].toFixed(2); updateRemaining(); return; }
    case "withdraw": case "transfer": return submitMoney(a);
  }
  render();
});

/* Search and amount inputs update without a full re-render so typing keeps focus */
function updateRemaining() {
  const from = ($("#port") || $("#tf")).value, amt = parseFloat($("#amt").value) || 0;
  const left = (CASH[from] - amt).toFixed(2);
  if ($("#rem")) $("#rem").value = left;
  if ($("#r1")) $("#r1").textContent = left;
  if ($("#bal")) $("#bal").textContent = "GHS " + money(CASH[from]);
}
document.addEventListener("input", (e) => {
  if (e.target.id === "q") { S.q = e.target.value; render(); }
  if (e.target.id === "amt") updateRemaining();
});
document.addEventListener("change", (e) => {
  if (e.target.id === "port" || e.target.id === "tf") updateRemaining();
});

function submitMoney(kind) {
  const from = ($("#port") || $("#tf")).value, amt = parseFloat($("#amt").value);
  const err = (m) => ($("#err").textContent = m);
  if (!amt || amt <= 0) return err("Enter an amount greater than 0.");
  if (amt > CASH[from]) return err(`Amount is more than the GHS ${CASH[from].toFixed(2)} available.`);
  let type, to;
  if (kind === "transfer") {
    to = $("#tt").value;
    if (!to) return err("Choose a portfolio to transfer to.");
    if (to === from) return err("Choose a different portfolio to transfer to.");
    CASH[from] -= amt; CASH[to] += amt;
    type = "Transfer";
    say("Transfer submitted", `GHS ${amt.toFixed(2)} moved from ${from} to ${to}.`);
  } else {
    CASH[from] -= amt;
    type = "Withdrawal";
    say("Withdrawal submitted", `GHS ${amt.toFixed(2)} withdrawn from ${from}.`);
  }
  S.transactions.unshift({
    id: `activity-${Date.now()}`,
    title: `${type}: GHS ${amt.toFixed(2)}`,
    amount: amt,
    date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    status: "Complete",
    detail: kind === "transfer"
      ? `Transfer from ${from} to ${to}.`
      : `Withdrawal from ${from}.`,
  });
  navigate(S.from);
}

render();
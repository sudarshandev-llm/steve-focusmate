/* ── Steve App – Shared JS ── */

// ── Simple in-memory store (persists via localStorage) ──────────────
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem('steve_' + key); return v ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, val) { try { localStorage.setItem('steve_' + key, JSON.stringify(val)); } catch {} },
  del(key) { localStorage.removeItem('steve_' + key); }
};

// ── Auth guard ──────────────────────────────────────────────────────
function requireAuth() {
  const user = Store.get('user');
  if (!user) { window.location.href = '/pages/auth.html'; return null; }
  return user;
}
function getCurrentUser() { return Store.get('user'); }

// ── Generate student ID ─────────────────────────────────────────────
function generateUID(name) {
  const prefix = name.slice(0, 2).toUpperCase();
  const num = Math.floor(10000 + Math.random() * 90000);
  const year = new Date().getFullYear();
  return `${prefix}${year}-${num}`;
}

// ── Bubble background ───────────────────────────────────────────────
function initBubbles(container) {
  const colors = ['#6c63ff', '#a78bfa', '#38bdf8', '#34d399', '#f472b6', '#fbbf24'];
  const count = 14;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 40 + Math.random() * 120;
    const color = colors[Math.floor(Math.random() * colors.length)];
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${color};
      animation-duration:${10 + Math.random() * 18}s;
      animation-delay:${Math.random() * 12}s;
    `;
    container.appendChild(b);
  }
}

// ── Minecraft-style notification ────────────────────────────────────
let notifyTimer = null;
let notifyEl = null;
function notify(title, msg, duration = 3500) {
  if (notifyEl) { notifyEl.remove(); clearTimeout(notifyTimer); }
  const n = document.createElement('div');
  n.className = 'mc-notify';
  n.innerHTML = `
    <div class="mc-notify-bar" style="animation-duration:${duration}ms"></div>
    <div class="mc-notify-title">▶ ${title}</div>
    <div class="mc-notify-msg">${msg}</div>
  `;
  document.body.appendChild(n);
  notifyEl = n;
  notifyTimer = setTimeout(() => {
    n.classList.add('hide');
    setTimeout(() => n.remove(), 300);
  }, duration);
  n.onclick = () => { n.classList.add('hide'); setTimeout(() => n.remove(), 300); };
}

// ── Active nav highlight ────────────────────────────────────────────
function highlightNav() {
  const page = window.location.pathname.split('/').pop().replace('.html','') || 'index';
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });
}

// ── Render shared nav ───────────────────────────────────────────────
function renderNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  nav.innerHTML = `
    <a class="nav-btn" data-page="dashboard" href="${base}dashboard.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/>
        <rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>
      </svg>
      Home
    </a>
    <a class="nav-btn" data-page="timer" href="${base}timer.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      Timer
    </a>
    <a class="nav-btn" data-page="notes" href="${base}notes.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>
      </svg>
      Notes
    </a>
    <a class="nav-btn" data-page="calendar" href="${base}calendar.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      Calendar
    </a>
    <a class="nav-btn" data-page="more" href="${base}more.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
      </svg>
      More
    </a>
  `;
  highlightNav();
}

// ── Format date ─────────────────────────────────────────────────────
function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtTime(d) {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
function relTime(d) {
  if (!d) return '';
  const diff = new Date(d) - Date.now();
  const abs = Math.abs(diff);
  if (abs < 60000) return 'just now';
  if (abs < 3600000) return Math.round(abs / 60000) + 'm ' + (diff > 0 ? 'left' : 'ago');
  if (abs < 86400000) return Math.round(abs / 3600000) + 'h ' + (diff > 0 ? 'left' : 'ago');
  return Math.round(abs / 86400000) + 'd ' + (diff > 0 ? 'left' : 'ago');
}

// ── Logout ──────────────────────────────────────────────────────────
function logout() {
  Store.del('user');
  window.location.href = '/index.html';
}

// ── Reminder notifications check ─────────────────────────────────────
function checkReminders() {
  const reminders = Store.get('reminders', []);
  const now = Date.now();
  const updated = reminders.map(r => {
    if (!r.notified && r.datetime && new Date(r.datetime) - now <= 60000 && new Date(r.datetime) >= now) {
      notify('⏰ Reminder', r.title);
      return { ...r, notified: true };
    }
    return r;
  });
  Store.set('reminders', updated);
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  const bubblesEl = document.querySelector('.bubbles');
  if (bubblesEl) initBubbles(bubblesEl);
  renderNav();
  setInterval(checkReminders, 30000);
});

import { useState, useEffect, useRef } from "react";

// ============================================================
// LOGO URL — GANTI LINK INI DENGAN LOGO AWAK
// ============================================================
const LOGO_URL = "https://i.postimg.cc/pLjMd8cS/1779714232659.png";
// ============================================================

const OWNER_EMAIL = "nainnkarimmm@gmail.com";
const WA_CONTACT = "60108786461";
const WA_GROUP_V1 = "https://chat.whatsapp.com/Jsl69LyI1t3GFPJLQzfjVz";
const WA_GROUP_V2 = "https://chat.whatsapp.com/DS1vrsa611X2iF8WlSgvlW";

const ROLES = ["Member", "Staff", "Developer", "Admin", "Admin Management", "Wakil Owner", "Owner"];
const ROLE_COLORS = {
  Member: "#6b7280",
  Staff: "#3b82f6",
  Developer: "#8b5cf6",
  Admin: "#f59e0b",
  "Admin Management": "#ef4444",
  "Wakil Owner": "#ec4899",
  Owner: "#10b981",
};

// ─── INITIAL DATA ────────────────────────────────────────────
const INIT_USERS = [
  {
    id: 1,
    username: "Umar Hencem",
    fullName: "Umar Hencem",
    email: "nainnkarimmm@gmail.com",
    password: "nain2012",
    role: "Owner",
    joinDate: "2026-05-25",
    approved: true,
  },
];

const INIT_ANNOUNCEMENTS = [
  {
    id: 1,
    title: "Selamat Datang di Website Resmi PRI!",
    content:
      "Persatuan Railfans Indonesia hadir secara digital. Nikmati fitur-fitur eksklusif untuk para railfan Indonesia.",
    mediaType: "none",
    mediaUrl: "",
    date: "2026-05-26",
    author: "Umar Hencem",
    pinned: true,
  },
];

const INIT_SCHEDULES = [
  {
    id: 1,
    trainName: "KA Argo Bromo Anggrek",
    route: "Jakarta Gambir → Surabaya Pasar Turi",
    departure: "08:00",
    arrival: "17:30",
    date: "2026-05-27",
    status: "Tepat Waktu",
    platform: "4",
  },
  {
    id: 2,
    trainName: "KA Bima",
    route: "Jakarta Gambir → Surabaya Gubeng",
    departure: "17:00",
    arrival: "05:30",
    date: "2026-05-27",
    status: "Terlambat 15 menit",
    platform: "2",
  },
];

const INIT_INFO = [
  {
    id: 1,
    type: "Insiden",
    title: "Gangguan Sinyal di Stasiun Jatinegara",
    content:
      "Dilaporkan terjadi gangguan sinyal di Stasiun Jatinegara pada pukul 09.30 WIB. Tim teknis sedang menangani. Perjalanan KRL terganggu sementara.",
    date: "2026-05-26",
    severity: "warning",
    author: "Admin PRI",
  },
  {
    id: 2,
    type: "Informasi",
    title: "KAI Luncurkan Aplikasi Terbaru",
    content:
      "PT KAI telah meluncurkan pembaruan aplikasi KAI Access dengan fitur booking lebih mudah dan tampilan baru yang modern.",
    date: "2026-05-25",
    severity: "info",
    author: "Admin PRI",
  },
];

const INIT_ADS = [
  {
    id: 1,
    imageUrl: "https://placehold.co/728x90/1a1a2e/e8c848?text=PRI+Official+Banner",
    link: "#",
    caption: "Banner iklan resmi PRI",
    position: "top",
  },
];

const INIT_GROUPS = [
  {
    id: 1,
    name: "Grup WhatsApp PRI V1",
    link: WA_GROUP_V1,
    description: "Grup resmi pertama Persatuan Railfans Indonesia",
    type: "WhatsApp",
    membersCount: "250+",
  },
  {
    id: 2,
    name: "Grup WhatsApp PRI V2",
    link: WA_GROUP_V2,
    description: "Grup resmi kedua Persatuan Railfans Indonesia",
    type: "WhatsApp",
    membersCount: "180+",
  },
];

// ─── ICONS (inline SVG) ──────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    train: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="4" y="3" width="16" height="13" rx="2" />
        <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M8 19h8" />
        <circle cx="8.5" cy="16.5" r="1.5" fill={color} stroke="none" />
        <circle cx="15.5" cy="16.5" r="1.5" fill={color} stroke="none" />
      </svg>
    ),
    bell: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    logout: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    ),
    plus: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" />
      </svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    whatsapp: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    menu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    x: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    megaphone: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ─── STYLES ──────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a0e27;
    --navy2: #0f1535;
    --navy3: #161b42;
    --gold: #e8c848;
    --gold2: #f5d96a;
    --red: #dc2626;
    --green: #16a34a;
    --blue: #2563eb;
    --text: #e8eaf0;
    --text2: #9aa0b8;
    --border: rgba(232,200,72,0.15);
    --card: rgba(22,27,66,0.9);
    --glass: rgba(255,255,255,0.03);
    --shadow: 0 8px 32px rgba(0,0,0,0.4);
    --radius: 10px;
    --font-head: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
    --px: 14px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--navy);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.6;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--navy2); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* Navbar */
  .navbar {
    position: sticky; top: 0; z-index: 100;
    background: rgba(10,14,39,0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    padding: 0 var(--px);
    display: flex; align-items: center; justify-content: space-between;
    height: 56px;
  }
  .navbar-brand { display: flex; align-items: center; gap: 8px; text-decoration: none; background: none; border: none; cursor: pointer; }
  .navbar-logo { width: 36px; height: 36px; border-radius: 6px; object-fit: contain; background: var(--navy3); border: 1px solid var(--border); padding: 3px; }
  .navbar-title { font-family: var(--font-head); font-size: 16px; color: var(--gold); font-weight: 800; line-height: 1.1; }
  .navbar-title span { display: block; font-size: 10px; font-family: var(--font-body); color: var(--text2); font-weight: 400; letter-spacing: 1px; text-transform: uppercase; }
  .nav-links { display: flex; align-items: center; gap: 2px; }
  .nav-link {
    padding: 6px 10px; border-radius: 7px; cursor: pointer;
    color: var(--text2); font-size: 13px; font-weight: 500;
    transition: all 0.2s; border: none; background: none;
    display: flex; align-items: center; gap: 5px;
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); background: rgba(232,200,72,0.1); }
  .nav-btn {
    padding: 6px 14px; border-radius: 7px; cursor: pointer; font-size: 13px;
    font-weight: 600; transition: all 0.2s; border: none;
    background: var(--gold); color: var(--navy); margin-left: 6px;
  }
  .nav-btn:hover { background: var(--gold2); }
  .nav-btn.ghost { background: transparent; border: 1px solid var(--border); color: var(--text2); margin-left: 0; }
  .nav-btn.ghost:hover { border-color: var(--gold); color: var(--gold); background: rgba(232,200,72,0.05); }
  .hamburger { display: none; background: none; border: none; cursor: pointer; color: var(--text); padding: 6px; }

  /* Mobile nav */
  .mobile-nav {
    display: none; flex-direction: column; gap: 2px; padding: 8px var(--px);
    background: var(--navy2); border-bottom: 1px solid var(--border);
  }
  .mobile-nav.open { display: flex; }
  .mobile-nav .nav-link { width: 100%; font-size: 14px; padding: 10px 12px; }

  /* Hero */
  .hero {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy3) 50%, #1a0a2e 100%);
    padding: 40px var(--px) 32px;
    text-align: center;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,200,72,0.1) 0%, transparent 70%);
  }
  .hero-rail {
    position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(232,200,72,0.12); border: 1px solid rgba(232,200,72,0.3);
    border-radius: 100px; padding: 4px 12px; font-size: 11px;
    color: var(--gold); font-weight: 600; margin-bottom: 14px;
    letter-spacing: 1px; text-transform: uppercase;
  }
  .hero h1 {
    font-family: var(--font-head); font-size: clamp(24px, 7vw, 42px);
    font-weight: 900; line-height: 1.15; color: white;
    margin-bottom: 10px;
  }
  .hero h1 span { color: var(--gold); }
  .hero p { color: var(--text2); font-size: 14px; max-width: 480px; margin: 0 auto 22px; line-height: 1.6; }
  .hero-actions { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    padding: 10px 20px; background: var(--gold); color: var(--navy);
    border: none; border-radius: 8px; font-weight: 700; font-size: 13.5px;
    cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px;
  }
  .btn-primary:hover { background: var(--gold2); box-shadow: 0 6px 18px rgba(232,200,72,0.25); }
  .btn-secondary {
    padding: 10px 20px; background: transparent; color: var(--text);
    border: 1px solid var(--border); border-radius: 8px; font-weight: 600; font-size: 13.5px;
    cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 7px;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); background: rgba(232,200,72,0.05); }

  /* Stats bar */
  .stats-bar {
    background: var(--navy2); border-bottom: 1px solid var(--border);
    padding: 12px var(--px); display: flex; justify-content: space-around; flex-wrap: wrap; gap: 8px;
  }
  .stat-item { text-align: center; }
  .stat-num { font-family: var(--font-head); font-size: 22px; font-weight: 800; color: var(--gold); }
  .stat-label { font-size: 11px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.8px; }

  /* Section */
  .section { padding: 20px var(--px); width: 100%; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px; }
  .section-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: white; display: flex; align-items: center; gap: 8px; }
  .section-title .badge {
    background: var(--gold); color: var(--navy); border-radius: 100px;
    padding: 1px 8px; font-size: 11px; font-family: var(--font-body); font-weight: 700;
  }
  .section-divider { height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin-bottom: 14px; border-radius: 2px; }

  /* Cards */
  .card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 14px; transition: all 0.2s;
  }
  .card:hover { border-color: rgba(232,200,72,0.3); box-shadow: var(--shadow); }
  .card-grid { display: grid; gap: 10px; }
  .card-grid-2 { grid-template-columns: 1fr; }
  .card-grid-3 { grid-template-columns: 1fr; }

  /* Announcement card */
  .ann-card { border-left: 3px solid var(--gold); }
  .ann-card.pinned { border-left-color: var(--red); }
  .ann-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
  .ann-tag {
    background: rgba(232,200,72,0.15); color: var(--gold);
    border-radius: 100px; padding: 2px 8px; font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .ann-tag.pinned-tag { background: rgba(220,38,38,0.15); color: #f87171; }
  .ann-date { font-size: 11px; color: var(--text2); }
  .ann-title { font-weight: 700; font-size: 14px; margin-bottom: 6px; color: white; }
  .ann-content { color: var(--text2); font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }
  .ann-media { margin-top: 10px; border-radius: 7px; overflow: hidden; }
  .ann-media img { width: 100%; max-height: 180px; object-fit: cover; }
  .ann-media video { width: 100%; max-height: 180px; }
  .ann-author { margin-top: 8px; font-size: 11px; color: var(--text2); }
  .ann-author strong { color: var(--gold); }

  /* Schedule */
  .schedule-table { width: 100%; border-collapse: collapse; }
  .schedule-table th {
    background: var(--navy3); color: var(--gold); font-size: 11px;
    text-transform: uppercase; letter-spacing: 0.8px; padding: 8px 10px; text-align: left;
  }
  .schedule-table td { padding: 9px 10px; border-bottom: 1px solid var(--border); font-size: 13px; }
  .schedule-table tr:hover td { background: var(--glass); }
  .status-badge {
    display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 11px; font-weight: 600;
  }
  .status-ok { background: rgba(22,163,74,0.15); color: #4ade80; }
  .status-late { background: rgba(234,179,8,0.15); color: #facc15; }
  .status-cancel { background: rgba(220,38,38,0.15); color: #f87171; }

  /* Info cards */
  .info-card { display: flex; gap: 10px; }
  .info-icon {
    width: 38px; height: 38px; border-radius: 8px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 18px;
  }
  .info-icon.warning { background: rgba(234,179,8,0.15); }
  .info-icon.info { background: rgba(37,99,235,0.15); }
  .info-icon.danger { background: rgba(220,38,38,0.15); }
  .info-type { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 3px; }
  .info-type.warning { color: #facc15; }
  .info-type.info { color: #60a5fa; }
  .info-type.danger { color: #f87171; }

  /* Groups */
  .group-card { display: flex; align-items: center; gap: 12px; }
  .group-icon { width: 44px; height: 44px; border-radius: 10px; background: rgba(37,211,102,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .group-link-btn {
    margin-top: 10px; padding: 8px 14px; background: rgba(37,211,102,0.15);
    border: 1px solid rgba(37,211,102,0.3); color: #4ade80; border-radius: 8px;
    cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.2s; width: 100%;
    text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;
    text-decoration: none;
  }
  .group-link-btn:hover { background: rgba(37,211,102,0.25); }

  /* Ad banner */
  .ad-banner {
    border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border);
    position: relative; cursor: pointer; display: block; text-decoration: none;
    margin: 0 var(--px) 10px;
  }
  .ad-banner img { width: 100%; height: auto; display: block; max-height: 80px; object-fit: cover; }
  .ad-label {
    position: absolute; top: 6px; right: 6px;
    background: rgba(0,0,0,0.7); color: var(--text2); font-size: 9px;
    padding: 2px 5px; border-radius: 3px; letter-spacing: 0.5px;
  }
  .ad-caption { padding: 6px 12px; background: var(--navy3); font-size: 11px; color: var(--text2); }

  /* Forms */
  .form-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: var(--px); background: linear-gradient(135deg, var(--navy) 0%, #100820 100%); }
  .form-box { background: var(--navy2); border: 1px solid var(--border); border-radius: 14px; padding: 24px var(--px); width: 100%; max-width: 420px; }
  .form-logo { text-align: center; margin-bottom: 18px; }
  .form-logo img { width: 52px; height: 52px; border-radius: 10px; object-fit: contain; background: var(--navy3); border: 1px solid var(--border); padding: 5px; }
  .form-title { font-family: var(--font-head); font-size: 22px; font-weight: 800; color: white; text-align: center; margin-bottom: 3px; }
  .form-sub { font-size: 12px; color: var(--text2); text-align: center; margin-bottom: 18px; }
  .form-group { margin-bottom: 13px; }
  .form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 5px; }
  .form-input {
    width: 100%; padding: 9px 12px; background: var(--navy3);
    border: 1px solid var(--border); border-radius: 8px; color: var(--text);
    font-size: 13px; font-family: var(--font-body); transition: border-color 0.2s; outline: none;
  }
  .form-input:focus { border-color: var(--gold); }
  .form-input::placeholder { color: var(--text2); }
  textarea.form-input { resize: vertical; min-height: 80px; }
  .form-btn {
    width: 100%; padding: 11px; background: var(--gold); color: var(--navy);
    border: none; border-radius: 9px; font-weight: 700; font-size: 14px;
    cursor: pointer; transition: all 0.2s; margin-top: 6px;
  }
  .form-btn:hover { background: var(--gold2); }
  .form-link { text-align: center; margin-top: 14px; font-size: 12px; color: var(--text2); }
  .form-link button { background: none; border: none; color: var(--gold); cursor: pointer; font-weight: 600; }
  .form-error { background: rgba(220,38,38,0.1); border: 1px solid rgba(220,38,38,0.3); color: #f87171; padding: 9px 12px; border-radius: 7px; font-size: 12px; margin-bottom: 12px; }
  .form-success { background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.3); color: #4ade80; padding: 9px 12px; border-radius: 7px; font-size: 12px; margin-bottom: 12px; }

  /* Admin panel */
  .admin-layout { display: flex; min-height: calc(100vh - 56px); }
  .admin-sidebar {
    width: 200px; background: var(--navy2); border-right: 1px solid var(--border);
    padding: 14px 8px; flex-shrink: 0; position: sticky; top: 56px; height: calc(100vh - 56px); overflow-y: auto;
  }
  .admin-sidebar-title { font-size: 10px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 10px 4px; }
  .admin-nav-item {
    display: flex; align-items: center; gap: 8px; padding: 9px 10px;
    border-radius: 7px; cursor: pointer; color: var(--text2); font-size: 13px;
    transition: all 0.2s; margin-bottom: 2px; border: none; background: none; width: 100%; text-align: left;
  }
  .admin-nav-item:hover { background: var(--glass); color: var(--text); }
  .admin-nav-item.active { background: rgba(232,200,72,0.12); color: var(--gold); }
  .admin-content { flex: 1; padding: 16px; overflow-x: auto; min-width: 0; }
  .admin-header { margin-bottom: 16px; }
  .admin-title { font-family: var(--font-head); font-size: 20px; font-weight: 800; color: white; }
  .admin-sub { color: var(--text2); font-size: 13px; margin-top: 3px; }

  /* Admin stats */
  .admin-stats { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-bottom: 20px; }
  .admin-stat {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 12px; text-align: center;
  }
  .admin-stat-num { font-family: var(--font-head); font-size: 24px; font-weight: 800; color: var(--gold); }
  .admin-stat-label { font-size: 11px; color: var(--text2); margin-top: 2px; }

  /* Table */
  .table-wrap { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); -webkit-overflow-scrolling: touch; }
  .admin-table { width: 100%; border-collapse: collapse; min-width: 500px; }
  .admin-table th { background: var(--navy3); color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.8px; padding: 10px 12px; text-align: left; white-space: nowrap; }
  .admin-table td { padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13px; vertical-align: middle; }
  .admin-table tr:last-child td { border-bottom: none; }
  .admin-table tr:hover td { background: var(--glass); }

  /* Role badge */
  .role-badge {
    display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 10px;
    font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
  }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75);
    z-index: 9999; display: flex; align-items: flex-start; justify-content: center;
    padding: 12px; backdrop-filter: blur(4px); overflow-y: auto;
  }
  .modal-box {
    background: var(--navy2); border: 1px solid var(--border); border-radius: 14px;
    padding: 18px; width: 100%; max-width: 500px;
    position: relative; margin: auto;
  }
  .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .modal-title { font-family: var(--font-head); font-size: 18px; font-weight: 800; color: white; }
  .modal-close { background: none; border: none; color: var(--text2); cursor: pointer; padding: 4px; border-radius: 6px; transition: all 0.2s; flex-shrink: 0; }
  .modal-close:hover { color: var(--text); background: var(--glass); }

  /* Select */
  select.form-input { appearance: none; cursor: pointer; }

  /* Action buttons */
  .action-btn {
    padding: 5px 9px; border-radius: 6px; cursor: pointer; font-size: 11px;
    font-weight: 600; transition: all 0.2s; border: none; display: inline-flex; align-items: center; gap: 4px;
  }
  .action-btn.edit { background: rgba(37,99,235,0.15); color: #60a5fa; }
  .action-btn.edit:hover { background: rgba(37,99,235,0.3); }
  .action-btn.delete { background: rgba(220,38,38,0.15); color: #f87171; }
  .action-btn.delete:hover { background: rgba(220,38,38,0.3); }
  .action-btn.approve { background: rgba(22,163,74,0.15); color: #4ade80; }
  .action-btn.approve:hover { background: rgba(22,163,74,0.3); }

  /* Footer */
  .footer {
    background: var(--navy2); border-top: 1px solid var(--border);
    padding: 24px var(--px) 16px;
  }
  .footer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .footer-brand { font-family: var(--font-head); font-size: 18px; color: var(--gold); font-weight: 800; margin-bottom: 6px; }
  .footer-text { font-size: 12px; color: var(--text2); line-height: 1.6; }
  .footer-h { font-size: 12px; font-weight: 700; color: var(--text); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .footer-link { display: block; font-size: 12px; color: var(--text2); margin-bottom: 7px; cursor: pointer; transition: color 0.2s; border: none; background: none; text-align: left; text-decoration: none; }
  .footer-link:hover { color: var(--gold); }
  .footer-bottom { padding-top: 16px; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 10px; }
  .footer-copy { font-size: 11px; color: var(--text2); }
  .wa-dev-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(37,211,102,0.12); border: 1px solid rgba(37,211,102,0.25);
    color: #4ade80; padding: 8px 14px; border-radius: 9px; cursor: pointer;
    font-size: 12px; font-weight: 600; transition: all 0.2s; text-decoration: none;
    align-self: flex-start;
  }
  .wa-dev-btn:hover { background: rgba(37,211,102,0.22); }

  /* Profile page */
  .profile-card { display: flex; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 16px; }
  .profile-avatar { width: 54px; height: 54px; border-radius: 50%; background: var(--navy3); border: 2px solid var(--gold); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-size: 24px; color: var(--gold); flex-shrink: 0; }
  .profile-name { font-family: var(--font-head); font-size: 18px; color: white; font-weight: 800; }
  .profile-email { font-size: 12px; color: var(--text2); }

  /* Tabs */
  .tabs { display: flex; gap: 3px; background: var(--navy3); border-radius: 9px; padding: 3px; margin-bottom: 16px; overflow-x: auto; }
  .tab-btn {
    padding: 7px 13px; border-radius: 7px; cursor: pointer; font-size: 12.5px;
    font-weight: 600; transition: all 0.2s; border: none; background: none;
    color: var(--text2); white-space: nowrap;
  }
  .tab-btn.active { background: var(--navy2); color: var(--gold); }

  /* Toast */
  .toast {
    position: fixed; bottom: 16px; right: 14px; z-index: 10000;
    background: var(--navy2); border: 1px solid var(--border); border-radius: 9px;
    padding: 10px 16px; font-size: 13px; color: var(--text);
    box-shadow: var(--shadow); animation: slideIn 0.3s ease;
    display: flex; align-items: center; gap: 7px; max-width: 300px;
  }
  .toast.success { border-left: 3px solid #4ade80; }
  .toast.error { border-left: 3px solid #f87171; }
  @keyframes slideIn { from { transform: translateX(110%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* Tablet — 2 columns */
  @media (min-width: 600px) {
    :root { --px: 20px; }
    .card-grid-2 { grid-template-columns: 1fr 1fr; }
    .card-grid-3 { grid-template-columns: 1fr 1fr; }
    .footer-grid { grid-template-columns: repeat(4, 1fr); }
    .admin-stats { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
  }

  /* Desktop — full layout */
  @media (min-width: 960px) {
    :root { --px: 28px; }
    .card-grid-3 { grid-template-columns: repeat(3, 1fr); }
    .hero { padding: 60px var(--px) 48px; }
    .section { padding: 28px var(--px); max-width: 1100px; margin: 0 auto; }
    .admin-sidebar { width: 220px; }
  }

  /* Mobile — hamburger */
  @media (max-width: 599px) {
    .nav-links { display: none; }
    .hamburger { display: block; }
    .admin-layout { flex-direction: column; }
    .admin-sidebar {
      width: 100%; position: static; height: auto;
      display: flex; flex-wrap: wrap; gap: 3px; padding: 8px var(--px);
      border-right: none; border-bottom: 1px solid var(--border);
    }
    .admin-nav-item { flex: 1; min-width: 80px; justify-content: center; font-size: 11px; padding: 7px 6px; }
    .admin-sidebar-title { display: none; }
    .admin-content { padding: 12px var(--px); }
    .modal-box { padding: 14px; }
    .form-box { padding: 18px 14px; }
  }
`;

// ─── localStorage helper ─────────────────────────────────────
function useLocalStorage(key, init) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : init;
    } catch { return init; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue];
}

// ─── APP ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Data state — semua tersimpan dalam localStorage
  const [users, setUsers] = useLocalStorage("pri_users", INIT_USERS);
  const [announcements, setAnnouncements] = useLocalStorage("pri_announcements", INIT_ANNOUNCEMENTS);
  const [schedules, setSchedules] = useLocalStorage("pri_schedules", INIT_SCHEDULES);
  const [infoList, setInfoList] = useLocalStorage("pri_info", INIT_INFO);
  const [ads, setAds] = useLocalStorage("pri_ads", INIT_ADS);
  const [groups, setGroups] = useLocalStorage("pri_groups", INIT_GROUPS);

  // Auth — simpan sesi login
  const [currentUser, setCurrentUser] = useLocalStorage("pri_session", null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const isAdmin = currentUser && ["Admin", "Admin Management", "Wakil Owner", "Owner", "Developer", "Staff"].includes(currentUser.role);
  const isOwner = currentUser?.email === OWNER_EMAIL || currentUser?.role === "Owner" || currentUser?.role === "Wakil Owner";

  // Sync currentUser bila role/data user berubah
  useEffect(() => {
    if (currentUser) {
      const updated = users.find(u => u.id === currentUser.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(currentUser)) {
        setCurrentUser(updated);
      }
    }
  }, [users]);

  // Auto-delete jadual yang dah lepas tarikh
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSchedules((s) => s.filter((x) => x.date >= today));
  }, []);

  const navigate = (p) => { setPage(p); setMobileOpen(false); window.scrollTo(0, 0); };

  const navItems = [
    { key: "home", label: "Beranda", icon: "home" },
    { key: "announcements", label: "Pengumuman", icon: "bell" },
    { key: "schedule", label: "Jadwal KAI", icon: "calendar" },
    { key: "info", label: "Info KAI", icon: "info" },
    { key: "groups", label: "Komunitas", icon: "users" },
  ];

  return (
    <>
      <style>{css}</style>

      {/* Navbar */}
      <nav className="navbar">
        <button className="navbar-brand" onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <img src={LOGO_URL} alt="PRI Logo" className="navbar-logo" onError={(e) => { e.target.style.display = "none"; }} />
          <div className="navbar-title">
            PRI
            <span>Persatuan Railfans Indonesia</span>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="nav-links">
          {navItems.map((n) => (
            <button key={n.key} className={`nav-link ${page === n.key ? "active" : ""}`} onClick={() => navigate(n.key)}>
              <Icon name={n.icon} size={15} />{n.label}
            </button>
          ))}
          {isAdmin && (
            <button className={`nav-link ${page === "admin" ? "active" : ""}`} onClick={() => navigate("admin")}>
              <Icon name="shield" size={15} />Admin
            </button>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {currentUser ? (
            <>
              <button className="nav-btn ghost" onClick={() => navigate("profile")}>
                {currentUser.username}
              </button>
              <button className="nav-btn" onClick={() => { setCurrentUser(null); navigate("home"); showToast("Berhasil logout"); }}>
                <Icon name="logout" size={14} />
              </button>
            </>
          ) : (
            <>
              <button className="nav-btn ghost" onClick={() => navigate("login")}>Masuk</button>
              <button className="nav-btn" onClick={() => navigate("register")}>Daftar</button>
            </>
          )}
          <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {navItems.map((n) => (
          <button key={n.key} className={`nav-link ${page === n.key ? "active" : ""}`} onClick={() => navigate(n.key)}>
            <Icon name={n.icon} size={15} />{n.label}
          </button>
        ))}
        {isAdmin && (
          <button className={`nav-link ${page === "admin" ? "active" : ""}`} onClick={() => navigate("admin")}>
            <Icon name="shield" size={15} />Admin Panel
          </button>
        )}
      </div>

      {/* Ad Banner Top */}
      {ads.filter(a => a.position === "top").map(ad => (
        <a key={ad.id} className="ad-banner" href={ad.link} target="_blank" rel="noopener noreferrer" style={{ margin: "8px 0 0" }}>
          <img src={ad.imageUrl} alt={ad.caption} style={{ width: "100%", maxHeight: 90, objectFit: "cover" }} />
          <div className="ad-label">Iklan</div>
          {ad.caption && <div className="ad-caption">{ad.caption}</div>}
        </a>
      ))}

      {/* Pages */}
      {page === "home" && <HomePage announcements={announcements} schedules={schedules} infoList={infoList} ads={ads} navigate={navigate} users={users} groups={groups} />}
      {page === "announcements" && <AnnouncementsPage announcements={announcements} ads={ads} />}
      {page === "schedule" && <SchedulePage schedules={schedules} ads={ads} />}
      {page === "info" && <InfoPage infoList={infoList} ads={ads} />}
      {page === "groups" && <GroupsPage groups={groups} />}
      {page === "login" && <LoginPage users={users} setCurrentUser={setCurrentUser} navigate={navigate} showToast={showToast} />}
      {page === "register" && <RegisterPage users={users} setUsers={setUsers} navigate={navigate} showToast={showToast} />}
      {page === "profile" && currentUser && <ProfilePage currentUser={currentUser} groups={groups} navigate={navigate} />}
      {page === "admin" && isAdmin && (
        <AdminPanel
          currentUser={currentUser}
          isOwner={isOwner}
          users={users} setUsers={setUsers}
          announcements={announcements} setAnnouncements={setAnnouncements}
          schedules={schedules} setSchedules={setSchedules}
          infoList={infoList} setInfoList={setInfoList}
          ads={ads} setAds={setAds}
          groups={groups} setGroups={setGroups}
          showToast={showToast}
        />
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">PRI</div>
            <p className="footer-text">Persatuan Railfans Indonesia — komunitas resmi para penggemar kereta api di seluruh Indonesia.</p>
            <a href={`https://wa.me/${WA_CONTACT}?text=Halo%20bang%20gw%20ada%20pertanyaan%20untuk%20website%20PRI%F0%9F%98%AD%20bantu%20tolong%20yea%F0%9F%99%8F`} target="_blank" rel="noopener noreferrer" className="wa-dev-btn" style={{ marginTop: 14, display: "inline-flex" }}>
              <Icon name="whatsapp" size={16} color="#4ade80" />Hubungi Developer
            </a>
          </div>
          <div>
            <div className="footer-h">Navigasi</div>
            {navItems.map(n => <button key={n.key} className="footer-link" onClick={() => navigate(n.key)}>{n.label}</button>)}
          </div>
          <div>
            <div className="footer-h">Komunitas</div>
            <a href={WA_GROUP_V1} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ textDecoration: "none" }}>Grup WhatsApp PRI V1</a>
            <a href={WA_GROUP_V2} target="_blank" rel="noopener noreferrer" className="footer-link" style={{ textDecoration: "none" }}>Grup WhatsApp PRI V2</a>
          </div>
          <div>
            <div className="footer-h">Akun</div>
            <button className="footer-link" onClick={() => navigate("register")}>Daftar Anggota</button>
            <button className="footer-link" onClick={() => navigate("login")}>Masuk</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Persatuan Railfans Indonesia. Dibuat Oleh Umar/Salman.</span>
          <span className="footer-copy">Developed by <strong style={{ color: "#4ade80" }}>Umar PRI</strong> (+{WA_CONTACT})</span>
        </div>
      </footer>

      {/* Toast */}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────
function HomePage({ announcements, schedules, infoList, ads, navigate, users, groups }) {
  const pinned = announcements.filter(a => a.pinned);
  const latest = announcements.slice(0, 3);
  const todaySchedules = schedules.slice(0, 4);
  const sideAds = ads.filter(a => a.position === "side");

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-tag"><Icon name="train" size={14} />Komunitas Resmi Railfan Indonesia</div>
          <h1>Persatuan Railfans<br /><span>Indonesia</span></h1>
          <p>Komunitas para pecinta kereta api Indonesia. Temukan jadwal terkini, informasi insiden, dan bergabunglah dengan ribuan railfan se-Indonesia.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("register")}><Icon name="users" size={16} />Bergabung Sekarang</button>
            <button className="btn-secondary" onClick={() => navigate("schedule")}><Icon name="calendar" size={16} />Lihat Jadwal KAI</button>
          </div>
        </div>
        <div className="hero-rail" />
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">{users.length}+</div><div className="stat-label">Anggota Aktif</div></div>
        <div className="stat-item"><div className="stat-num">{announcements.length}</div><div className="stat-label">Pengumuman</div></div>
        <div className="stat-item"><div className="stat-num">{schedules.length}</div><div className="stat-label">Jadwal KAI</div></div>
        <div className="stat-item"><div className="stat-num">{groups.length}</div><div className="stat-label">Grup Komunitas</div></div>
      </div>

      <div>
        <div style={{ display: "grid", gridTemplateColumns: sideAds.length ? "1fr 220px" : "1fr", gap: 0, alignItems: "start" }}>
          <div>
            {/* Pinned announcements */}
            {pinned.length > 0 && (
              <div className="section">
                <div className="section-header">
                  <h2 className="section-title"><Icon name="star" size={18} color="#e8c848" />Pengumuman Penting</h2>
                </div>
                <div className="section-divider" />
                <div className="card-grid card-grid-2">
                  {pinned.map(a => <AnnouncementCard key={a.id} ann={a} />)}
                </div>
              </div>
            )}

            {/* Latest announcements */}
            <div className="section">
              <div className="section-header">
                <h2 className="section-title"><Icon name="megaphone" size={18} color="#e8c848" />Pengumuman Terbaru<span className="badge">{announcements.length}</span></h2>
                <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => navigate("announcements")}>Lihat Semua</button>
              </div>
              <div className="section-divider" />
              <div className="card-grid card-grid-2">
                {latest.map(a => <AnnouncementCard key={a.id} ann={a} />)}
              </div>
            </div>

            {/* Jadwal */}
            <div className="section">
              <div className="section-header">
                <h2 className="section-title"><Icon name="train" size={18} color="#e8c848" />Jadwal KAI Hari Ini</h2>
                <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => navigate("schedule")}>Lihat Semua</button>
              </div>
              <div className="section-divider" />
              <div className="table-wrap">
                <ScheduleTable schedules={todaySchedules} />
              </div>
            </div>

            {/* Info */}
            <div className="section">
              <div className="section-header">
                <h2 className="section-title"><Icon name="info" size={18} color="#e8c848" />Info KAI Terkini</h2>
                <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => navigate("info")}>Lihat Semua</button>
              </div>
              <div className="section-divider" />
              <div className="card-grid card-grid-2">
                {infoList.slice(0, 4).map(i => <InfoCard key={i.id} item={i} />)}
              </div>
            </div>
          </div>

          {/* Side ads */}
          {sideAds.length > 0 && (
            <div style={{ padding: "20px 10px 0 0" }}>
              {sideAds.map(ad => (
                <a key={ad.id} className="ad-banner" href={ad.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginBottom: 10, marginLeft: 0, marginRight: 0 }}>
                  <img src={ad.imageUrl} alt={ad.caption} style={{ width: "100%" }} />
                  <div className="ad-label">Iklan</div>
                  {ad.caption && <div className="ad-caption">{ad.caption}</div>}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Groups section */}
      <div style={{ background: "var(--navy2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "20px var(--px, 14px)", marginTop: 8 }}>
        <div>
          <div className="section-header" style={{ marginBottom: 14 }}>
            <h2 className="section-title"><Icon name="whatsapp" size={18} color="#25d366" />Bergabung di Komunitas</h2>
          </div>
          <div className="card-grid card-grid-3">
            {INIT_GROUPS.map(g => (
              <div key={g.id} className="card">
                <div className="group-card">
                  <div className="group-icon"><Icon name="whatsapp" size={22} color="#25d366" /></div>
                  <div>
                    <div style={{ fontWeight: 700, color: "white", fontSize: 14 }}>{g.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{g.membersCount} anggota</div>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--text2)", margin: "10px 0" }}>{g.description}</p>
                <a href={g.link} target="_blank" rel="noopener noreferrer" className="group-link-btn">
                  <Icon name="whatsapp" size={14} color="#4ade80" />Gabung Grup
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── ANNOUNCEMENT CARD ───────────────────────────────────────
function AnnouncementCard({ ann }) {
  return (
    <div className={`card ann-card ${ann.pinned ? "pinned" : ""}`}>
      <div className="ann-meta">
        {ann.pinned && <span className="ann-tag pinned-tag">📌 Penting</span>}
        <span className="ann-tag">Pengumuman</span>
        <span className="ann-date">{ann.date}</span>
      </div>
      <div className="ann-title">{ann.title}</div>
      <div className="ann-content">{ann.content}</div>
      {ann.mediaUrl && (
        <div className="ann-media">
          {ann.mediaType === "image" && <img src={ann.mediaUrl} alt="media" />}
          {ann.mediaType === "video" && <video src={ann.mediaUrl} controls />}
          {ann.mediaType === "link" && <a href={ann.mediaUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: 13 }}>🔗 {ann.mediaUrl}</a>}
        </div>
      )}
      <div className="ann-author">Oleh: <strong>{ann.author}</strong></div>
    </div>
  );
}

// ─── SCHEDULE TABLE ──────────────────────────────────────────
function ScheduleTable({ schedules }) {
  if (!schedules.length) return <div style={{ padding: 24, textAlign: "center", color: "var(--text2)" }}>Tidak ada jadwal tersedia.</div>;
  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>KA</th><th>Rute</th><th>Berangkat</th><th>Tiba</th><th>Status</th><th>Peron</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map(s => (
          <tr key={s.id}>
            <td style={{ fontWeight: 600, color: "white" }}>{s.trainName}</td>
            <td style={{ color: "var(--text2)", fontSize: 13 }}>{s.route}</td>
            <td>{s.departure}</td>
            <td>{s.arrival}</td>
            <td>
              <span className={`status-badge ${s.status === "Tepat Waktu" ? "status-ok" : s.status.includes("cancel") ? "status-cancel" : "status-late"}`}>
                {s.status}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>{s.platform}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── INFO CARD ───────────────────────────────────────────────
function InfoCard({ item }) {
  const emoji = item.severity === "warning" ? "⚠️" : item.severity === "danger" ? "🚨" : "ℹ️";
  return (
    <div className="card">
      <div className="info-card">
        <div className={`info-icon ${item.severity}`}><span style={{ fontSize: 20 }}>{emoji}</span></div>
        <div style={{ flex: 1 }}>
          <div className={`info-type ${item.severity}`}>{item.type}</div>
          <div style={{ fontWeight: 700, color: "white", fontSize: 14, marginBottom: 6 }}>{item.title}</div>
          <div style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{item.content}</div>
          <div style={{ fontSize: 11, color: "var(--text2)", marginTop: 8 }}>{item.date} • {item.author}</div>
        </div>
      </div>
    </div>
  );
}

// ─── FULL ANNOUNCEMENTS PAGE ─────────────────────────────────
function AnnouncementsPage({ announcements, ads }) {
  const sideAds = ads.filter(a => a.position === "side");
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: sideAds.length ? "1fr 280px" : "1fr", gap: 24, alignItems: "start" }}>
        <div className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="section-header">
            <h2 className="section-title"><Icon name="megaphone" size={22} color="#e8c848" />Semua Pengumuman<span className="badge">{announcements.length}</span></h2>
          </div>
          <div className="section-divider" />
          <div className="card-grid card-grid-2">
            {announcements.map(a => <AnnouncementCard key={a.id} ann={a} />)}
          </div>
          {!announcements.length && <div style={{ textAlign: "center", color: "var(--text2)", padding: 40 }}>Belum ada pengumuman.</div>}
        </div>
        {sideAds.length > 0 && (
          <div style={{ paddingTop: 48 }}>
            {sideAds.map(ad => (
              <a key={ad.id} className="ad-banner" href={ad.link} target="_blank" rel="noopener noreferrer" style={{ display: "block", marginBottom: 16 }}>
                <img src={ad.imageUrl} alt={ad.caption} style={{ width: "100%" }} />
                <div className="ad-label">Iklan</div>
                {ad.caption && <div className="ad-caption">{ad.caption}</div>}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCHEDULE PAGE ───────────────────────────────────────────
function SchedulePage({ schedules }) {
  const [filter, setFilter] = useState("");
  const filtered = schedules.filter(s => s.trainName.toLowerCase().includes(filter.toLowerCase()) || s.route.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title"><Icon name="train" size={22} color="#e8c848" />Jadwal KAI<span className="badge">{schedules.length}</span></h2>
        <input className="form-input" style={{ maxWidth: 260 }} placeholder="Cari nama KA atau rute..." value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      <div className="section-divider" />
      <div style={{ background: "var(--navy3)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "var(--text2)" }}>
        ⚡ Jadwal yang sudah lewat akan otomatis terhapus dari sistem.
      </div>
      <div className="table-wrap">
        <ScheduleTable schedules={filtered} />
      </div>
    </div>
  );
}

// ─── INFO PAGE ───────────────────────────────────────────────
function InfoPage({ infoList }) {
  const [filter, setFilter] = useState("Semua");
  const types = ["Semua", "Insiden", "Informasi", "Peringatan"];
  const filtered = filter === "Semua" ? infoList : infoList.filter(i => i.type === filter);
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title"><Icon name="info" size={22} color="#e8c848" />Informasi KAI<span className="badge">{infoList.length}</span></h2>
        <div style={{ display: "flex", gap: 6 }}>
          {types.map(t => <button key={t} className={`action-btn ${filter === t ? "approve" : "edit"}`} onClick={() => setFilter(t)}>{t}</button>)}
        </div>
      </div>
      <div className="section-divider" />
      <div className="card-grid card-grid-2">
        {filtered.map(i => <InfoCard key={i.id} item={i} />)}
      </div>
      {!filtered.length && <div style={{ textAlign: "center", color: "var(--text2)", padding: 40 }}>Tidak ada informasi tersedia.</div>}
    </div>
  );
}

// ─── GROUPS PAGE ─────────────────────────────────────────────
function GroupsPage({ groups }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title"><Icon name="users" size={22} color="#e8c848" />Grup & Saluran Komunitas</h2>
      </div>
      <div className="section-divider" />
      <div className="card-grid card-grid-3">
        {groups.map(g => (
          <div key={g.id} className="card">
            <div className="group-card">
              <div className="group-icon"><Icon name="whatsapp" size={28} color="#25d366" /></div>
              <div>
                <div style={{ fontWeight: 700, color: "white", fontSize: 16 }}>{g.name}</div>
                <div style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{g.membersCount} anggota · {g.type}</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--text2)", margin: "14px 0" }}>{g.description}</p>
            <a href={g.link} target="_blank" rel="noopener noreferrer" className="group-link-btn">
              <Icon name="whatsapp" size={16} color="#4ade80" />Bergabung ke Grup
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────
function LoginPage({ users, setCurrentUser, navigate, showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { setError("Email atau password salah."); return; }
    if (!user.approved) { setError("Akun Anda belum disetujui admin."); return; }
    setCurrentUser(user);
    showToast(`Selamat datang, ${user.username}!`);
    navigate("home");
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <div className="form-logo">
          <img src={LOGO_URL} alt="PRI" onError={(e) => { e.target.style.display = "none"; }} />
        </div>
        <div className="form-title">Masuk ke PRI</div>
        <div className="form-sub">Persatuan Railfans Indonesia</div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="email@contoh.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} />
        </div>
        <button className="form-btn" onClick={handleLogin}>Masuk</button>
        <div className="form-link">Belum punya akun? <button onClick={() => navigate("register")}>Daftar sekarang</button></div>
      </div>
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────
function RegisterPage({ users, setUsers, navigate, showToast }) {
  const [form, setForm] = useState({ username: "", fullName: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = () => {
    setError("");
    if (!form.username || !form.fullName || !form.email || !form.password) { setError("Semua kolom wajib diisi."); return; }
    if (form.password !== form.confirm) { setError("Password dan konfirmasi tidak cocok."); return; }
    if (form.password.length < 6) { setError("Password minimal 6 karakter."); return; }
    if (users.find(u => u.email === form.email)) { setError("Email sudah terdaftar."); return; }
    if (users.find(u => u.username === form.username)) { setError("Username sudah digunakan."); return; }
    const newUser = { id: Date.now(), username: form.username, fullName: form.fullName, email: form.email, password: form.password, role: "Member", joinDate: new Date().toISOString().split("T")[0], approved: form.email === OWNER_EMAIL };
    setUsers(u => [...u, newUser]);
    setSuccess(true);
    showToast("Pendaftaran berhasil! Tunggu persetujuan admin.");
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <div className="form-logo">
          <img src={LOGO_URL} alt="PRI" onError={(e) => { e.target.style.display = "none"; }} />
        </div>
        <div className="form-title">Daftar Anggota</div>
        <div className="form-sub">Bergabung dengan komunitas railfan Indonesia</div>
        {error && <div className="form-error">{error}</div>}
        {success && (
          <div className="form-success">
            ✅ Pendaftaran berhasil! Akun Anda sedang menunggu persetujuan admin.
            <br /><button style={{ background: "none", border: "none", color: "#4ade80", cursor: "pointer", fontWeight: 600, marginTop: 8 }} onClick={() => navigate("login")}>Kembali ke halaman login →</button>
          </div>
        )}
        {!success && (
          <>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" placeholder="username_anda" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Nama Lengkap</label>
              <input className="form-input" placeholder="Nama Lengkap Anda" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="email@contoh.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Min. 6 karakter" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Konfirmasi Password</label>
              <input className="form-input" type="password" placeholder="Ulangi password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />
            </div>
            <button className="form-btn" onClick={handleRegister}>Daftar Sekarang</button>
            <div className="form-link">Sudah punya akun? <button onClick={() => navigate("login")}>Masuk</button></div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ────────────────────────────────────────────
function ProfilePage({ currentUser, groups, navigate }) {
  return (
    <div className="section">
      <h2 className="section-title" style={{ marginBottom: 20 }}>Profil Saya</h2>
      <div className="profile-card">
        <div className="profile-avatar">{currentUser.username.charAt(0).toUpperCase()}</div>
        <div>
          <div className="profile-name">{currentUser.fullName}</div>
          <div className="profile-email">{currentUser.email}</div>
          <div style={{ marginTop: 8 }}>
            <span className="role-badge" style={{ background: `${ROLE_COLORS[currentUser.role]}22`, color: ROLE_COLORS[currentUser.role] }}>
              {currentUser.role}
            </span>
          </div>
        </div>
      </div>
      <div className="card-grid card-grid-3">
        <div className="card"><div style={{ color: "var(--text2)", fontSize: 13 }}>Username</div><div style={{ fontWeight: 700, marginTop: 4 }}>{currentUser.username}</div></div>
        <div className="card"><div style={{ color: "var(--text2)", fontSize: 13 }}>Tanggal Bergabung</div><div style={{ fontWeight: 700, marginTop: 4 }}>{currentUser.joinDate}</div></div>
        <div className="card"><div style={{ color: "var(--text2)", fontSize: 13 }}>Status Akun</div><div style={{ fontWeight: 700, marginTop: 4, color: "#4ade80" }}>{currentUser.approved ? "Aktif" : "Pending"}</div></div>
      </div>
      <div style={{ marginTop: 24 }}>
        <h3 style={{ color: "white", marginBottom: 16, fontFamily: "var(--font-head)", fontSize: 20 }}>Grup & Saluran</h3>
        <div className="card-grid card-grid-3">
          {groups.map(g => (
            <div key={g.id} className="card">
              <div style={{ fontWeight: 700, color: "white", marginBottom: 4 }}>{g.name}</div>
              <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>{g.description}</div>
              <a href={g.link} target="_blank" rel="noopener noreferrer" className="group-link-btn"><Icon name="whatsapp" size={14} color="#4ade80" />Buka Grup</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ─────────────────────────────────────────────
function AdminPanel({ currentUser, isOwner, users, setUsers, announcements, setAnnouncements, schedules, setSchedules, infoList, setInfoList, ads, setAds, groups, setGroups, showToast }) {
  const [tab, setTab] = useState("overview");

  const adminTabs = [
    { key: "overview", label: "Overview", icon: "home" },
    { key: "announcements", label: "Pengumuman", icon: "megaphone" },
    { key: "schedules", label: "Jadwal KAI", icon: "train" },
    { key: "info", label: "Info KAI", icon: "info" },
    { key: "ads", label: "Iklan", icon: "star" },
    { key: "groups", label: "Grup", icon: "users" },
    ...(isOwner ? [{ key: "users", label: "Manajemen User", icon: "shield" }] : []),
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-title">Admin Panel</div>
        <div style={{ marginBottom: 12, padding: "8px 12px", background: "var(--navy3)", borderRadius: 8, fontSize: 13 }}>
          <div style={{ color: "var(--text2)", fontSize: 11 }}>Login sebagai</div>
          <div style={{ fontWeight: 700, color: "var(--gold)" }}>{currentUser.username}</div>
          <span className="role-badge" style={{ background: `${ROLE_COLORS[currentUser.role]}22`, color: ROLE_COLORS[currentUser.role], fontSize: 11, marginTop: 4, display: "inline-block" }}>{currentUser.role}</span>
        </div>
        {adminTabs.map(t => (
          <button key={t.key} className={`admin-nav-item ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
            <Icon name={t.icon} size={16} />{t.label}
          </button>
        ))}
        {isOwner && (
          <button className="admin-nav-item" style={{ marginTop: 12, color: "#f87171" }} onClick={() => {
            if (window.confirm("Reset semua data ke asal? Ini akan padam semua data yang disimpan!")) {
              ["pri_users","pri_announcements","pri_schedules","pri_info","pri_ads","pri_groups","pri_session"].forEach(k => localStorage.removeItem(k));
              window.location.reload();
            }
          }}>
            <Icon name="trash" size={16} />Reset Semua Data
          </button>
        )}
      </aside>

      <main className="admin-content">
        {tab === "overview" && <AdminOverview users={users} setUsers={setUsers} announcements={announcements} schedules={schedules} infoList={infoList} showToast={showToast} />}
        {tab === "announcements" && <AdminAnnouncements announcements={announcements} setAnnouncements={setAnnouncements} currentUser={currentUser} showToast={showToast} />}
        {tab === "schedules" && <AdminSchedules schedules={schedules} setSchedules={setSchedules} showToast={showToast} />}
        {tab === "info" && <AdminInfo infoList={infoList} setInfoList={setInfoList} currentUser={currentUser} showToast={showToast} />}
        {tab === "ads" && <AdminAds ads={ads} setAds={setAds} showToast={showToast} />}
        {tab === "groups" && <AdminGroups groups={groups} setGroups={setGroups} showToast={showToast} />}
        {tab === "users" && isOwner && <AdminUsers users={users} setUsers={setUsers} showToast={showToast} />}
      </main>
    </div>
  );
}

function AdminOverview({ users, setUsers, announcements, schedules, infoList, showToast }) {
  const pending = users.filter(u => !u.approved);

  const handleApprove = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, approved: true } : x));
    showToast("Akun disetujui!");
  };
  const handleReject = (id) => {
    if (window.confirm("Tolak dan hapus pendaftaran ini?")) {
      setUsers(u => u.filter(x => x.id !== id));
      showToast("Pendaftaran ditolak!", "error");
    }
  };

  return (
    <>
      <div className="admin-header">
        <div className="admin-title">Dashboard Overview</div>
        <div className="admin-sub">Selamat datang di Admin Panel PRI</div>
      </div>
      <div className="admin-stats">
        <div className="admin-stat"><div className="admin-stat-num">{users.length}</div><div className="admin-stat-label">Total User</div></div>
        <div className="admin-stat"><div className="admin-stat-num">{pending.length}</div><div className="admin-stat-label">Pending Approval</div></div>
        <div className="admin-stat"><div className="admin-stat-num">{announcements.length}</div><div className="admin-stat-label">Pengumuman</div></div>
        <div className="admin-stat"><div className="admin-stat-num">{schedules.length}</div><div className="admin-stat-label">Jadwal KAI</div></div>
        <div className="admin-stat"><div className="admin-stat-num">{infoList.length}</div><div className="admin-stat-label">Info KAI</div></div>
      </div>

      {/* Pendaftaran Menunggu */}
      <div style={{ marginTop: 24 }}>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "white", marginBottom: 14 }}>
          📋 Pendaftaran Menunggu Persetujuan
          {pending.length > 0 && <span style={{ marginLeft: 10, background: "#ef4444", color: "white", borderRadius: 100, padding: "2px 10px", fontSize: 13 }}>{pending.length}</span>}
        </div>
        {pending.length === 0 ? (
          <div style={{ background: "rgba(22,163,74,0.1)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: 10, padding: "14px 18px", color: "#4ade80", fontSize: 14 }}>
            ✅ Tidak ada pendaftaran yang menunggu persetujuan.
          </div>
        ) : (
          <div className="table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Username</th><th>Nama Lengkap</th><th>Email</th><th>Tanggal Daftar</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {pending.map(u => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700 }}>{u.username}</td>
                    <td>{u.fullName}</td>
                    <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.email}</td>
                    <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.joinDate}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="action-btn approve" onClick={() => handleApprove(u.id)}>✓ Setujui</button>
                        <button className="action-btn delete" onClick={() => handleReject(u.id)}>✗ Tolak</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Semua User */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontFamily: "var(--font-head)", fontSize: 20, fontWeight: 800, color: "white", marginBottom: 14 }}>
          👥 Semua Anggota Terdaftar
        </div>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Username</th><th>Nama Lengkap</th><th>Email</th><th>Role</th><th>Status</th><th>Bergabung</th></tr>
            </thead>
            <tbody>
              {users.filter(u => u.approved).map(u => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 700 }}>{u.username}</td>
                  <td>{u.fullName}</td>
                  <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.email}</td>
                  <td><span className="role-badge" style={{ background: `${ROLE_COLORS[u.role]}22`, color: ROLE_COLORS[u.role] }}>{u.role}</span></td>
                  <td><span className="status-badge status-ok">Aktif</span></td>
                  <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// Admin: Announcements
function AdminAnnouncements({ announcements, setAnnouncements, currentUser, showToast }) {
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title: "", content: "", mediaType: "none", mediaUrl: "", pinned: false });

  const openAdd = () => { setEdit(null); setForm({ title: "", content: "", mediaType: "none", mediaUrl: "", pinned: false }); setModal(true); };
  const openEdit = (a) => { setEdit(a); setForm({ title: a.title, content: a.content, mediaType: a.mediaType, mediaUrl: a.mediaUrl, pinned: a.pinned }); setModal(true); };

  const handleSave = () => {
    if (!form.title || !form.content) { alert("Judul dan isi wajib diisi."); return; }
    if (edit) {
      setAnnouncements(a => a.map(x => x.id === edit.id ? { ...x, ...form } : x));
      showToast("Pengumuman diperbarui!");
    } else {
      setAnnouncements(a => [{ id: Date.now(), ...form, date: new Date().toISOString().split("T")[0], author: currentUser.username }, ...a]);
      showToast("Pengumuman ditambahkan!");
    }
    setModal(false);
  };

  return (
    <>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="admin-title">Manajemen Pengumuman</div>
          <div className="admin-sub">Kelola pengumuman yang tampil di website</div>
        </div>
        <button className="btn-primary" onClick={openAdd}><Icon name="plus" size={16} />Tambah</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Judul</th><th>Tanggal</th><th>Media</th><th>Penting</th><th>Oleh</th><th>Aksi</th></tr></thead>
          <tbody>
            {announcements.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight: 600, maxWidth: 220 }}>{a.title}</td>
                <td style={{ color: "var(--text2)" }}>{a.date}</td>
                <td>{a.mediaType !== "none" ? <span className="ann-tag">{a.mediaType}</span> : "-"}</td>
                <td>{a.pinned ? <span style={{ color: "#f87171" }}>📌 Ya</span> : "-"}</td>
                <td style={{ color: "var(--text2)" }}>{a.author}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="action-btn edit" onClick={() => openEdit(a)}><Icon name="edit" size={13} />Edit</button>
                    <button className="action-btn delete" onClick={() => { setAnnouncements(x => x.filter(i => i.id !== a.id)); showToast("Dihapus!", "error"); }}><Icon name="trash" size={13} />Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">{edit ? "Edit Pengumuman" : "Tambah Pengumuman"}</div>
              <button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button>
            </div>
            <div className="form-group"><label className="form-label">Judul</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Isi Pengumuman</label><textarea className="form-input" rows={4} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
            <div className="form-group">
              <label className="form-label">Tipe Media</label>
              <select className="form-input" value={form.mediaType} onChange={e => setForm({ ...form, mediaType: e.target.value })}>
                <option value="none">Tidak ada</option>
                <option value="image">Gambar (URL)</option>
                <option value="video">Video (URL)</option>
                <option value="link">Link</option>
              </select>
            </div>
            {form.mediaType !== "none" && (
              <div className="form-group"><label className="form-label">URL Media / Link</label><input className="form-input" value={form.mediaUrl} onChange={e => setForm({ ...form, mediaUrl: e.target.value })} placeholder="https://..." /></div>
            )}
            <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input type="checkbox" id="pinned" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} style={{ width: 16, height: 16 }} />
              <label htmlFor="pinned" className="form-label" style={{ margin: 0 }}>Jadikan Pengumuman Penting (Pin)</label>
            </div>
            <button className="form-btn" onClick={handleSave}>{edit ? "Simpan Perubahan" : "Tambah Pengumuman"}</button>
          </div>
        </div>
      )}
    </>
  );
}

// Admin: Schedules
function AdminSchedules({ schedules, setSchedules, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ trainName: "", route: "", departure: "", arrival: "", date: "", status: "Tepat Waktu", platform: "" });

  const handleSave = () => {
    if (!form.trainName || !form.route || !form.departure || !form.date) { alert("Isi semua kolom wajib."); return; }
    setSchedules(s => [...s, { id: Date.now(), ...form }]);
    showToast("Jadwal ditambahkan!");
    setModal(false);
    setForm({ trainName: "", route: "", departure: "", arrival: "", date: "", status: "Tepat Waktu", platform: "" });
  };

  return (
    <>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="admin-title">Manajemen Jadwal KAI</div>
          <div className="admin-sub">Jadwal akan otomatis terhapus setelah tanggal keberangkatan</div>
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}><Icon name="plus" size={16} />Tambah Jadwal</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Nama KA</th><th>Rute</th><th>Berangkat</th><th>Tiba</th><th>Tanggal</th><th>Status</th><th>Peron</th><th>Hapus</th></tr></thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.trainName}</td>
                <td style={{ color: "var(--text2)", fontSize: 13 }}>{s.route}</td>
                <td>{s.departure}</td><td>{s.arrival}</td><td>{s.date}</td>
                <td><span className={`status-badge ${s.status === "Tepat Waktu" ? "status-ok" : "status-late"}`}>{s.status}</span></td>
                <td style={{ textAlign: "center" }}>{s.platform}</td>
                <td><button className="action-btn delete" onClick={() => { setSchedules(x => x.filter(i => i.id !== s.id)); showToast("Jadwal dihapus!", "error"); }}><Icon name="trash" size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">Tambah Jadwal KAI</div>
              <button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button>
            </div>
            <div className="form-group"><label className="form-label">Nama KA</label><input className="form-input" value={form.trainName} onChange={e => setForm({ ...form, trainName: e.target.value })} placeholder="KA Argo Bromo Anggrek" /></div>
            <div className="form-group"><label className="form-label">Rute</label><input className="form-input" value={form.route} onChange={e => setForm({ ...form, route: e.target.value })} placeholder="Stasiun A → Stasiun B" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group"><label className="form-label">Jam Berangkat</label><input className="form-input" type="time" value={form.departure} onChange={e => setForm({ ...form, departure: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Jam Tiba</label><input className="form-input" type="time" value={form.arrival} onChange={e => setForm({ ...form, arrival: e.target.value })} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group"><label className="form-label">Tanggal</label><input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
              <div className="form-group"><label className="form-label">Peron</label><input className="form-input" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} placeholder="1" /></div>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option>Tepat Waktu</option>
                <option>Terlambat 5 menit</option>
                <option>Terlambat 10 menit</option>
                <option>Terlambat 15 menit</option>
                <option>Terlambat 30 menit</option>
                <option>Dibatalkan</option>
              </select>
            </div>
            <button className="form-btn" onClick={handleSave}>Tambah Jadwal</button>
          </div>
        </div>
      )}
    </>
  );
}

// Admin: Info
function AdminInfo({ infoList, setInfoList, currentUser, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "Informasi", severity: "info" });

  const handleSave = () => {
    if (!form.title || !form.content) { alert("Isi semua kolom."); return; }
    setInfoList(l => [{ id: Date.now(), ...form, date: new Date().toISOString().split("T")[0], author: currentUser.username }, ...l]);
    showToast("Info KAI ditambahkan!"); setModal(false);
    setForm({ title: "", content: "", type: "Informasi", severity: "info" });
  };

  return (
    <>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div className="admin-title">Manajemen Info KAI</div><div className="admin-sub">Insiden dan informasi terkini dari KAI</div></div>
        <button className="btn-primary" onClick={() => setModal(true)}><Icon name="plus" size={16} />Tambah Info</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Judul</th><th>Tipe</th><th>Severity</th><th>Tanggal</th><th>Oleh</th><th>Hapus</th></tr></thead>
          <tbody>
            {infoList.map(i => (
              <tr key={i.id}>
                <td style={{ fontWeight: 600, maxWidth: 240 }}>{i.title}</td>
                <td><span className="ann-tag">{i.type}</span></td>
                <td><span className={`info-type ${i.severity}`}>{i.severity}</span></td>
                <td style={{ color: "var(--text2)" }}>{i.date}</td>
                <td style={{ color: "var(--text2)" }}>{i.author}</td>
                <td><button className="action-btn delete" onClick={() => { setInfoList(x => x.filter(v => v.id !== i.id)); showToast("Dihapus!", "error"); }}><Icon name="trash" size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header"><div className="modal-title">Tambah Info KAI</div><button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button></div>
            <div className="form-group"><label className="form-label">Judul</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Isi</label><textarea className="form-input" rows={4} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Tipe</label>
                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>Informasi</option><option>Insiden</option><option>Peringatan</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Severity</label>
                <select className="form-input" value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })}>
                  <option value="info">Info (Biru)</option><option value="warning">Warning (Kuning)</option><option value="danger">Danger (Merah)</option>
                </select>
              </div>
            </div>
            <button className="form-btn" onClick={handleSave}>Tambah Info</button>
          </div>
        </div>
      )}
    </>
  );
}

// Admin: Ads
function AdminAds({ ads, setAds, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ imageUrl: "", link: "#", caption: "", position: "top" });

  const handleSave = () => {
    if (!form.imageUrl) { alert("URL gambar wajib diisi."); return; }
    setAds(a => [...a, { id: Date.now(), ...form }]);
    showToast("Iklan ditambahkan!"); setModal(false);
    setForm({ imageUrl: "", link: "#", caption: "", position: "top" });
  };

  return (
    <>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div className="admin-title">Manajemen Iklan</div><div className="admin-sub">Kelola banner iklan yang tampil di website</div></div>
        <button className="btn-primary" onClick={() => setModal(true)}><Icon name="plus" size={16} />Tambah Iklan</button>
      </div>
      <div className="card-grid card-grid-2" style={{ marginTop: 8 }}>
        {ads.map(ad => (
          <div key={ad.id} className="card">
            <img src={ad.imageUrl} alt={ad.caption} style={{ width: "100%", maxHeight: 80, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 4 }}>{ad.caption || "(tanpa keterangan)"}</div>
            <div style={{ fontSize: 12, color: "var(--text2)" }}>Posisi: <strong style={{ color: "var(--gold)" }}>{ad.position}</strong></div>
            <button className="action-btn delete" style={{ marginTop: 10 }} onClick={() => { setAds(a => a.filter(x => x.id !== ad.id)); showToast("Iklan dihapus!", "error"); }}>
              <Icon name="trash" size={13} />Hapus
            </button>
          </div>
        ))}
      </div>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header"><div className="modal-title">Tambah Iklan</div><button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button></div>
            <div className="form-group"><label className="form-label">URL Gambar Iklan</label><input className="form-input" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." /></div>
            <div className="form-group"><label className="form-label">Link (klik iklan ke mana)</label><input className="form-input" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></div>
            <div className="form-group"><label className="form-label">Keterangan Iklan</label><input className="form-input" value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })} placeholder="Teks di bawah iklan..." /></div>
            <div className="form-group">
              <label className="form-label">Posisi Iklan</label>
              <select className="form-input" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })}>
                <option value="top">Atas (banner lebar)</option>
                <option value="side">Samping (sidebar)</option>
                <option value="bottom">Bawah</option>
              </select>
            </div>
            <button className="form-btn" onClick={handleSave}>Tambah Iklan</button>
          </div>
        </div>
      )}
    </>
  );
}

// Admin: Groups
function AdminGroups({ groups, setGroups, showToast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", link: "", description: "", type: "WhatsApp", membersCount: "0" });

  const handleSave = () => {
    if (!form.name || !form.link) { alert("Nama dan link wajib diisi."); return; }
    setGroups(g => [...g, { id: Date.now(), ...form }]);
    showToast("Grup ditambahkan!"); setModal(false);
    setForm({ name: "", link: "", description: "", type: "WhatsApp", membersCount: "0" });
  };

  return (
    <>
      <div className="admin-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div><div className="admin-title">Manajemen Grup & Saluran</div><div className="admin-sub">Daftar grup dan saluran resmi PRI</div></div>
        <button className="btn-primary" onClick={() => setModal(true)}><Icon name="plus" size={16} />Tambah Grup</button>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Nama Grup</th><th>Tipe</th><th>Anggota</th><th>Link</th><th>Hapus</th></tr></thead>
          <tbody>
            {groups.map(g => (
              <tr key={g.id}>
                <td style={{ fontWeight: 600 }}>{g.name}</td>
                <td><span className="ann-tag">{g.type}</span></td>
                <td style={{ color: "var(--text2)" }}>{g.membersCount}</td>
                <td><a href={g.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--gold)", fontSize: 13 }}>Buka Link</a></td>
                <td><button className="action-btn delete" onClick={() => { setGroups(x => x.filter(v => v.id !== g.id)); showToast("Grup dihapus!", "error"); }}><Icon name="trash" size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header"><div className="modal-title">Tambah Grup</div><button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button></div>
            <div className="form-group"><label className="form-label">Nama Grup</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div className="form-group"><label className="form-label">Link Grup/Saluran</label><input className="form-input" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://chat.whatsapp.com/..." /></div>
            <div className="form-group"><label className="form-label">Deskripsi</label><input className="form-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Tipe</label>
                <select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option>WhatsApp</option><option>Telegram</option><option>Discord</option><option>Line</option>
                </select>
              </div>
              <div className="form-group"><label className="form-label">Jumlah Anggota</label><input className="form-input" value={form.membersCount} onChange={e => setForm({ ...form, membersCount: e.target.value })} placeholder="250+" /></div>
            </div>
            <button className="form-btn" onClick={handleSave}>Tambah Grup</button>
          </div>
        </div>
      )}
    </>
  );
}

// Admin: Users (Owner only)
function AdminUsers({ users, setUsers, showToast }) {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleApprove = (id) => {
    setUsers(u => u.map(x => x.id === id ? { ...x, approved: true } : x));
    showToast("Akun disetujui!");
  };
  const handleDelete = (id) => {
    if (window.confirm("Hapus user ini?")) { setUsers(u => u.filter(x => x.id !== id)); showToast("User dihapus!", "error"); }
  };
  const openRole = (u) => { setSelected(u); setNewRole(u.role); setModal(true); };
  const handleRoleChange = () => {
    setUsers(u => u.map(x => x.id === selected.id ? { ...x, role: newRole } : x));
    showToast(`Role ${selected.username} diubah ke ${newRole}!`);
    setModal(false);
  };

  return (
    <>
      <div className="admin-header">
        <div className="admin-title">Manajemen User</div>
        <div className="admin-sub">Kelola semua akun anggota PRI (Akses Owner)</div>
      </div>
      <div style={{ background: "rgba(232,200,72,0.08)", border: "1px solid rgba(232,200,72,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "var(--gold)" }}>
        👑 Hanya Owner yang dapat mengakses halaman ini dan mengubah role pengguna.
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Username</th><th>Nama Lengkap</th><th>Email</th><th>Role</th><th>Status</th><th>Bergabung</th><th>Aksi</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ fontWeight: 700 }}>{u.username}</td>
                <td>{u.fullName}</td>
                <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.email}</td>
                <td><span className="role-badge" style={{ background: `${ROLE_COLORS[u.role]}22`, color: ROLE_COLORS[u.role] }}>{u.role}</span></td>
                <td><span className={`status-badge ${u.approved ? "status-ok" : "status-late"}`}>{u.approved ? "Aktif" : "Pending"}</span></td>
                <td style={{ color: "var(--text2)", fontSize: 13 }}>{u.joinDate}</td>
                <td>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {!u.approved && <button className="action-btn approve" onClick={() => handleApprove(u.id)}>✓ Setujui</button>}
                    <button className="action-btn edit" onClick={() => openRole(u)}><Icon name="shield" size={12} />Role</button>
                    {u.email !== OWNER_EMAIL && <button className="action-btn delete" onClick={() => handleDelete(u.id)}><Icon name="trash" size={12} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && selected && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ maxWidth: 380 }}>
            <div className="modal-header"><div className="modal-title">Ubah Role: {selected.username}</div><button className="modal-close" onClick={() => setModal(false)}><Icon name="x" size={20} /></button></div>
            <div className="form-group">
              <label className="form-label">Role Baru</label>
              <select className="form-input" value={newRole} onChange={e => setNewRole(e.target.value)}>
                {ROLES.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button className="form-btn" onClick={handleRoleChange}>Simpan Role</button>
          </div>
        </div>
      )}
    </>
  );
}
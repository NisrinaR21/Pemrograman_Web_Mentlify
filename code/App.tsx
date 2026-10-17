import { useState, type ReactNode } from "react";

type Role = "Mentee" | "Mentor";
type DashboardState = "empty" | "active";
type SessionStatus = "Menunggu Respons" | "Dikonfirmasi" | "Dibatalkan";
type IconName =
  | "arrow"
  | "back"
  | "bell"
  | "book"
  | "calendar"
  | "check"
  | "clock"
  | "coins"
  | "edit"
  | "eye"
  | "eyeOff"
  | "forward"
  | "flame"
  | "graduation"
  | "lock"
  | "menu"
  | "sparkles"
  | "target"
  | "user"
  | "wallet"
  | "x";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 19 19 5M8 5h11v11" /></>,
  back: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22Z" /><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4m8-4v4M3 10h18m-13 4h3m2 0h3m-8 3h3" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  coins: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v5c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 11v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></>,
  edit: <><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" /><path d="m14 8 3 3" /></>,
  eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
  eyeOff: <><path d="m3 3 18 18M10.6 6.2A10.8 10.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3 3.7M6.6 6.6C3.6 8.4 2 12 2 12s3.5 6 10 6c1.5 0 2.9-.3 4-.8M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>,
  forward: <><path d="m9 18 6-6-6-6" /><path d="M15 12H5" /></>,
  flame: <path d="M13 2c.6 4-3 5.5-3 9 0 1.4.8 2.5 2 3.2-.1-2.2 1.3-3.4 2.8-4.7C16.1 11 18 13 18 16a6 6 0 0 1-12 0c0-4.6 3.4-8.4 7-14Z" />,
  graduation: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.5V16c3 3 9 3 12 0v-4.5M22 9v6" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  sparkles: <><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 15l.7 2.3L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 15Zm13-1 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m15 9 6-6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.5-4 3.2-6 8-6s7.5 2 8 6" /></>,
  wallet: <><path d="M4 6h14a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h11v3" /><path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

const avatarColors = [
  ["#FFB36B", "#5A3DF0"], ["#A7E8BD", "#005DBD"], ["#FF8FA3", "#6941C6"],
  ["#FFD166", "#0D47A1"], ["#82D4BB", "#9333EA"], ["#C4B5FD", "#D946EF"],
  ["#FCA5A5", "#0F766E"], ["#93C5FD", "#C2410C"], ["#FDE68A", "#0369A1"],
  ["#86EFAC", "#7C3AED"], ["#FDA4AF", "#1D4ED8"], ["#A5B4FC", "#BE123C"],
];
const uploadedAvatarPaths = Array.from({ length: 12 }, (_, index) => `/avatars/umrah-${String(index + 1).padStart(2, "0")}.png`);

function Avatar({ index = 0, size = "small" }: { index?: number; size?: "small" | "large" | "grid" }) {
  const uploadedAvatar = uploadedAvatarPaths[index - avatarColors.length];
  const sizeClass = size === "grid" ? "avatar-thumbnail" : `avatar-${size}`;
  if (uploadedAvatar) {
    return <div className={`avatar ${sizeClass}`}><img src={uploadedAvatar} alt={`Avatar karakter ${index + 1}`} /></div>;
  }
  const [skin, hair] = avatarColors[index];
  return (
    <div className={`avatar ${sizeClass}`} style={{ "--avatar-bg": skin } as React.CSSProperties}>
      <svg viewBox="0 0 80 80" aria-label={`Avatar karakter ${index + 1}`} role="img">
        <circle cx="40" cy="40" r="40" fill={skin} />
        <path d={index % 3 === 0 ? "M15 80c2-18 12-26 25-26s23 8 25 26" : "M12 80c5-18 15-25 28-25s23 7 28 25"} fill={hair} />
        <ellipse cx="40" cy="38" rx="18" ry="22" fill={index % 2 ? "#8D5524" : "#DFA67B"} />
        <path d={index % 4 === 0 ? "M20 37c0-20 10-27 22-27 11 0 20 7 20 24-7-3-11-10-13-16-5 9-15 14-29 19Z" : index % 4 === 1 ? "M20 35c-1-18 8-27 21-27 16 0 22 12 19 30-4-15-13-19-19-19-7 0-14 4-21 16Z" : index % 4 === 2 ? "M20 37c-3-18 7-29 21-29 14 0 23 12 19 30l-6-13-8 5-7-8-7 8-12 7Z" : "M19 39c-2-22 9-31 23-31 13 0 22 11 18 31-4-4-6-12-6-18-8 7-18 10-35 18Z"} fill={hair} />
        <circle cx="33" cy="39" r="1.6" fill="#091540" />
        <circle cx="47" cy="39" r="1.6" fill="#091540" />
        <path d="M35 48c3 2.5 7 2.5 10 0" fill="none" stroke="#091540" strokeWidth="1.6" strokeLinecap="round" />
        {index % 3 === 1 && <><circle cx="32" cy="39" r="6" fill="none" stroke="#091540" strokeWidth="1.5" /><circle cx="48" cy="39" r="6" fill="none" stroke="#091540" strokeWidth="1.5" /><path d="M38 39h4" stroke="#091540" /></>}
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="brand" aria-label="Mentlify">
      <svg viewBox="0 0 42 38" role="img" aria-hidden="true">
        <path d="M4 30V11l8-5 9 8 9-8 8 5v19h-8V17l-9 8-9-8v13H4Z" fill="currentColor" />
        <circle cx="10" cy="5" r="3" fill="#ABD2FA" />
        <circle cx="32" cy="5" r="3" fill="#ABD2FA" />
      </svg>
      <span>Mentlify</span>
    </div>
  );
}

function Button({ children, variant = "primary", icon, onClick, disabled, type = "button" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "light" | "outline" | "danger" | "ghost" | "disabled";
  icon?: IconName; onClick?: () => void; disabled?: boolean; type?: "button" | "submit";
}) {
  return (
    <button type={type} className={`button button-${variant}`} onClick={onClick} disabled={disabled}>
      <span>{children}</span>{icon && <Icon name={icon} size={17} />}
    </button>
  );
}

function Header({ page, setPage, role }: {
  page: string; setPage: (page: string) => void; role: Role;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationItems = role === "Mentor" ? ["Dasbor", "Jadwal Sesi", "Profil"] : ["Dasbor", "Cari Mentor", "Jadwal Sesi", "Profil"];
  return (
    <header className="topbar">
      <Logo />
      <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Navigasi utama">
        {navigationItems.map((item) => (
          <button key={item} className={page === item ? "nav-link active" : "nav-link"} onClick={() => { setPage(item); setMenuOpen(false); }}>
            {item}
          </button>
        ))}
      </nav>
      <div className="header-actions">
        <Button variant="secondary" icon="arrow">Top Up +</Button>
        <button className="icon-button notification" aria-label="Notifikasi"><Icon name="bell" /><span /></button>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu"><Icon name={menuOpen ? "x" : "menu"} /></button>
      </div>
    </header>
  );
}

function WalletCard({ role }: { role: Role }) {
  return (
    <section className="wallet-card">
      <div className="wallet-title"><Icon name="wallet" /><span>Total Saldo Dompet</span></div>
      <div className="coin-balance">0 <span>Koin</span></div>
      <div className="promo-row"><span>0 Koin Promo</span><small>Belum ada bonus aktif</small></div>
      {role === "Mentor" && <p className="income">Koin Pendapatan (Redeemable): <strong>0 Koin</strong></p>}
      <Button variant="light" icon="arrow">Top Up Saldo Koin</Button>
    </section>
  );
}

function EmptyAgenda({ role }: { role: Role }) {
  return (
    <section className="agenda-empty">
      <div className="empty-illustration">
        <div className="book-shape"><Icon name="book" size={42} /></div>
        <div className="calendar-shape"><Icon name="calendar" size={51} /><span>0</span></div>
      </div>
      {role === "Mentor" && <span className="status-badge warning">Jadwal Belum Dipesan</span>}
      <h3>{role === "Mentee" ? "Belum Ada Jadwal Bimbingan Terdaftar" : "Menunggu Permintaan Bimbingan Masuk"}</h3>
      <p>{role === "Mentee"
        ? "Kamu belum memiliki sesi bimbingan terjadwal. Gunakan fitur matchmaking untuk mencari mentor mahasiswa atau alumni berdasarkan topik dan jadwal luangmu."
        : "Jadwal ketersediaan mingguanmu sudah aktif di sistem. Saat mentee memesan slot waktumu, notifikasi dan detail permintaan akan tampil di sini untuk dikonfirmasi."}</p>
      <Button variant={role === "Mentee" ? "primary" : "outline"} icon="arrow">
        {role === "Mentee" ? "Cari & Pesan Mentor Sekarang" : "Kelola Jam Ketersediaan Mingguan"}
      </Button>
    </section>
  );
}

function ActiveAgenda({ openRoom, setOpenRoom }: { openRoom: boolean; setOpenRoom: (value: boolean) => void }) {
  return (
    <section className="active-session">
      <div className="session-top">
        <span className="date-tile"><strong>24</strong><small>MEI</small></span>
        <span className={`status-badge ${openRoom ? "success" : "warning"}`}>{openRoom ? "Berlangsung" : "Dikonfirmasi"}</span>
      </div>
      <div className="mentor-row">
        <Avatar index={7} size="large" />
        <div><small>Bimbingan dengan</small><h3>Farhan Akbar</h3><p>Mahasiswa • Universitas Indonesia</p></div>
      </div>
      <div className="session-details">
        <div><Icon name="book" /><span><small>Topik</small><strong>Kalkulus Dasar — Limit & Turunan</strong></span></div>
        <div><Icon name="clock" /><span><small>Waktu sesi</small><strong>19:00 - 20:00 WIB</strong></span></div>
      </div>
      <div className="meet-notice"><Icon name="lock" /><span>Tautan Google Meet / Zoom aktif pada H-15 menit sebelum sesi dimulai.</span></div>
      <div className="session-actions">
        <Button variant={openRoom ? "primary" : "disabled"} disabled={!openRoom}> {openRoom ? "Buka Ruang Sesi" : "Ruang Sesi Belum Dibuka"}</Button>
        {openRoom && <Button variant="outline" icon="check">Saya Sudah Hadir</Button>}
        {!openRoom && <button className="demo-link" onClick={() => setOpenRoom(true)}>Simulasikan H-15 menit</button>}
      </div>
    </section>
  );
}

function ProgressPanel() {
  const missions = [
    ["Lengkapi Profil & Pilih Topik", "+20 XP"],
    ["Atur Jadwal Luang Mingguan", "+20 XP"],
    ["Top-Up atau Pesan Sesi Perdana", "+50 XP"],
  ];
  return (
    <section className="progress-card">
      <div className="streak">
        <span className="flame"><Icon name="flame" size={29} /></span>
        <strong className="streak-count">0</strong>
        <div className="streak-copy"><span>Hari beruntun</span><small>Mulai sesi pertamamu</small></div>
      </div>
      <div className="level-row"><span>LEVEL 1</span><span>0 / 100 XP</span></div>
      <div className="progress-track"><span /></div>
      <div className="mission-title"><span>Misi Pertamamu</span><Icon name="sparkles" /></div>
      <div className="missions">
        {missions.map(([label, xp]) => <div key={label} className="mission"><span className="check-box" /><span>{label}</span><b>{xp}</b></div>)}
      </div>
      <Button variant="disabled" disabled>Klaim Peti Poin 🎁</Button>
    </section>
  );
}

function BannerIllustration({ type }: { type: "techMarine" | "people" | "network" | "city" }) {
  if (type === "techMarine") {
    return (
      <svg viewBox="0 0 600 260" role="img" aria-label="Teknologi pemrograman dan kemaritiman">
        <rect width="600" height="260" fill="#FF6F64" />
        <image href="/avatars/umrah-01.png" x="-28" y="-1" width="390" height="274" />
        <rect x="341" y="34" width="205" height="126" rx="18" fill="#091540" />
        <rect x="355" y="48" width="177" height="92" rx="10" fill="#0D47A1" />
        <path d="m411 69-28 25 28 24 11-13-15-11 15-12Zm65 0 28 25-28 24-11-13 15-11-15-12Z" fill="#ABD2FA" />
        <circle cx="548" cy="43" r="22" fill="#FFD166" /><circle cx="548" cy="43" r="9" fill="#F59E0B" />
        <path d="M318 202c54-30 93 28 146 0s87 25 136 4v54H318Z" fill="#ABD2FA" />
        <path d="M303 228c61-28 97 25 157 0s88 23 140 0v32H303Z" fill="#005DBD" />
        <path d="M416 190h124l-20 29h-83Z" fill="#FFD166" />
        <path d="m481 150 8 17 19 2-14 13 4 19-17-9-17 9 4-19-14-13 19-2Z" fill="#F59E0B" />
      </svg>
    );
  }

  if (type === "people") {
    const people = [
      ["#FFCB45", "#F2A06B", "#091540", "plain"],
      ["#6FA8FF", "#8D5524", "#17255A", "hijab"],
      ["#65D6AD", "#DFA67B", "#5A3DF0", "glasses"],
      ["#B99AF8", "#6E3F2B", "#091540", "plain"],
      ["#4D8DFF", "#F2A06B", "#E44E72", "hijab"],
      ["#FFD166", "#8D5524", "#091540", "plain"],
      ["#5BD38B", "#C9855B", "#14213D", "glasses"],
      ["#FF7A66", "#DFA67B", "#552C85", "hijab"],
    ];
    return (
      <svg viewBox="0 0 600 240" role="img" aria-label="Grid mahasiswa lintas kampus">
        {people.map(([background, skin, hair, style], index) => {
          const x = (index % 4) * 150;
          const y = Math.floor(index / 4) * 120;
          return (
            <g key={index} transform={`translate(${x} ${y})`}>
              <rect width="150" height="120" fill={background} />
              <path d="M39 120c4-29 27-43 36-43s32 14 36 43Z" fill={index % 2 ? "#005DBD" : "#E3F2FD"} />
              {style === "hijab" && <path d="M38 67C38 24 55 10 76 10s39 17 39 58l-12 35H48Z" fill={hair} />}
              <ellipse cx="75" cy="56" rx="28" ry="34" fill={skin} />
              {style !== "hijab" && <path d={index % 3 === 0 ? "M45 53C43 20 58 9 77 9c23 0 33 18 28 48-8-7-14-17-17-28-9 13-22 21-43 24Z" : "M46 51C44 21 59 10 76 10c22 0 34 18 29 49-10-15-24-22-41-20-6 1-12 5-18 12Z"} fill={hair} />}
              <circle cx="65" cy="57" r="3" fill="#091540" /><circle cx="86" cy="57" r="3" fill="#091540" />
              {style === "glasses" && <><rect x="55" y="49" width="19" height="15" rx="5" fill="#ABD2FA" /><rect x="78" y="49" width="19" height="15" rx="5" fill="#ABD2FA" /><rect x="72" y="54" width="8" height="4" fill="#091540" /></>}
              <path d="M65 72c7 6 14 6 21 0-1 11-19 11-21 0Z" fill="#fff" />
            </g>
          );
        })}
      </svg>
    );
  }

  if (type === "network") {
    return (
      <svg viewBox="0 0 600 240" role="img" aria-label="Komunitas mahasiswa dalam satu kampus">
        <defs>
          <clipPath id="campus-avatar-1"><circle cx="86" cy="183" r="31" /></clipPath>
          <clipPath id="campus-avatar-2"><circle cx="505" cy="183" r="31" /></clipPath>
          <clipPath id="campus-avatar-3"><circle cx="445" cy="192" r="25" /></clipPath>
        </defs>
        <rect width="600" height="240" fill="#ABD2FA" />
        <circle cx="515" cy="42" r="28" fill="#FFD166" />
        <rect x="0" y="211" width="600" height="29" fill="#65D6AD" />
        <rect x="49" y="132" width="119" height="79" fill="#2468D8" />
        <rect x="432" y="132" width="119" height="79" fill="#2468D8" />
        <rect x="136" y="92" width="328" height="119" fill="#005DBD" />
        <path d="M112 94 300 20l188 74Z" fill="#091540" />
        <rect x="113" y="84" width="375" height="17" rx="5" fill="#0D47A1" />
        <rect x="276" y="48" width="48" height="37" fill="#FFD166" />
        <path d="m300 54 7 13h-14Z" fill="#091540" />
        {[174, 231, 288, 345, 402].map((x) => <rect key={x} x={x} y="111" width="25" height="82" rx="7" fill="#E3F2FD" />)}
        <rect x="268" y="151" width="64" height="60" rx="7" fill="#091540" />
        <rect x="254" y="198" width="92" height="13" rx="4" fill="#0D47A1" />
        {[72, 112, 457, 497].map((x) => <rect key={x} x={x} y="151" width="18" height="24" rx="3" fill="#ABD2FA" />)}
        <circle cx="86" cy="183" r="36" fill="#FFD166" />
        <image href="/avatars/umrah-02.png" x="51" y="148" width="70" height="70" preserveAspectRatio="xMidYMid slice" clipPath="url(#campus-avatar-1)" />
        <circle cx="505" cy="183" r="36" fill="#FF7A66" />
        <image href="/avatars/umrah-08.png" x="470" y="148" width="70" height="70" preserveAspectRatio="xMidYMid slice" clipPath="url(#campus-avatar-2)" />
        <circle cx="445" cy="192" r="29" fill="#65D6AD" />
        <image href="/avatars/umrah-12.png" x="416" y="163" width="58" height="58" preserveAspectRatio="xMidYMid slice" clipPath="url(#campus-avatar-3)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 600 240" role="img" aria-label="Kota kampus dan gamifikasi belajar">
      <rect width="600" height="240" fill="#ABD2FA" />
      <circle cx="488" cy="48" r="34" fill="#F59E0B" />
      <path d="M430 54l10-5 9 5-9-2Zm31 19 9-5 9 5-9-2Z" fill="#005DBD" />
      <rect x="0" y="156" width="115" height="84" fill="#0D47A1" />
      <rect x="82" y="121" width="126" height="119" fill="#005DBD" />
      <rect x="180" y="74" width="142" height="166" fill="#0D47A1" />
      <rect x="299" y="136" width="101" height="104" fill="#005DBD" />
      <rect x="379" y="104" width="128" height="136" fill="#2468D8" />
      <rect x="486" y="151" width="114" height="89" fill="#0D47A1" />
      <rect x="230" y="54" width="42" height="20" fill="#005DBD" />
      {[22, 50, 105, 132, 207, 242, 277, 325, 355, 410, 444, 474, 525, 558].map((x, index) => <rect key={x} x={x} y={172 - (index % 3) * 21} width="11" height="22" rx="2" fill="#ABD2FA" />)}
      <path d="M0 214h600v26H0Z" fill="#091540" opacity=".16" />
    </svg>
  );
}

function HeroBannerCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { type: "techMarine" as const, className: "banner-tech", heading: "Kuasai Teknologi & Kemaritiman →", tagline: "#MentlifyUMRAH" },
    { type: "people" as const, className: "banner-light", heading: "Temukan Mentor Lintas Jurusan Kamu →", tagline: "#PeerToPeerMentoring" },
    { type: "network" as const, className: "banner-dark", heading: "Satu Platform untuk Satu Universitas →", tagline: "#MentlifyNetwork" },
  ];
  const slide = slides[activeSlide];
  const moveSlide = (direction: number) => setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  return (
    <section className="hero-carousel" aria-label="Sorotan Mentlify">
      <article className={`mentlify-banner ${slide.className}`}>
        <div className="banner-copy">
          <h1>{slide.heading}</h1>
          <p>{slide.tagline}</p>
          <strong>Mentlify</strong>
        </div>
        <div className="banner-art"><BannerIllustration type={slide.type} /></div>
      </article>
      <button className="carousel-arrow previous" onClick={() => moveSlide(-1)} aria-label="Slide sebelumnya"><Icon name="back" /></button>
      <button className="carousel-arrow next" onClick={() => moveSlide(1)} aria-label="Slide berikutnya"><Icon name="forward" /></button>
      <div className="carousel-dots" aria-label={`Slide ${activeSlide + 1} dari ${slides.length}`}>
        {slides.map((item, index) => <button key={item.heading} className={index === activeSlide ? "active" : ""} onClick={() => setActiveSlide(index)} aria-label={`Buka slide ${index + 1}`} />)}
      </div>
    </section>
  );
}

function Dashboard({ role }: { role: Role }) {
  const [dashboardState, setDashboardState] = useState<DashboardState>("empty");
  const [openRoom, setOpenRoom] = useState(false);
  return (
    <>
      <HeroBannerCarousel />

      <div className="content-heading">
        <div><p className="eyebrow dark">JADWAL HARI INI</p><h2>Agenda Sesi Terdekat</h2></div>
        <div className="state-toggle" aria-label="Simulasi status dasbor">
          <button className={dashboardState === "empty" ? "active" : ""} onClick={() => setDashboardState("empty")}>Pengguna Baru</button>
          <button className={dashboardState === "active" ? "active" : ""} onClick={() => setDashboardState("active")}>Sesi Aktif</button>
        </div>
      </div>

      <main className="dashboard-grid">
        <div className="agenda-column">
          {dashboardState === "empty" ? <EmptyAgenda role={role} /> : <ActiveAgenda openRoom={openRoom} setOpenRoom={setOpenRoom} />}
        </div>
        <aside>
          <ProgressPanel />
        </aside>
      </main>

      <section className="stats-grid">
        {[
          ["clock", "Jam Bimbingan", "0", "Jam"],
          ["target", "Topik Dipelajari", "0", "Topik"],
          ["check", "Sesi Selesai", "0", "Sesi"],
        ].map(([icon, label, value, unit]) => (
          <article className="stat-card" key={label}>
            <span className="stat-icon"><Icon name={icon as IconName} /></span>
            <div><small>{label}</small><strong>{value} <em>{unit}</em></strong></div>
            <span className="stat-arrow">↗</span>
          </article>
        ))}
      </section>
    </>
  );
}

function Field({ label, children, verified }: { label: string; children: ReactNode; verified?: boolean }) {
  return <label className="field"><span>{label}{verified && <b><Icon name="check" size={12} />Terverifikasi</b>}</span>{children}</label>;
}

type SessionItem = {
  id: number;
  avatar: number;
  name: string;
  role: Role;
  campus: string;
  topic: string;
  date: string;
  duration: string;
  status: SessionStatus;
};

const mentorSessions: SessionItem[] = [
  { id: 1, avatar: 1, name: "Raka Pradipta", role: "Mentee", campus: "Universitas Gadjah Mada", topic: "Pemrograman Web Lanjut", date: "Senin, 18 Mei 2026 • 19:00 WIB", duration: "60 Menit", status: "Menunggu Respons" },
  { id: 2, avatar: 7, name: "Farhan Akbar", role: "Mentor", campus: "Universitas Indonesia", topic: "Kalkulus Dasar — Integral", date: "Hari ini • 15:00 WIB", duration: "60 Menit", status: "Dikonfirmasi" },
  { id: 3, avatar: 10, name: "Salsabila Putri", role: "Mentor", campus: "Institut Teknologi Bandung", topic: "Pengantar Analisis Data", date: "Sabtu, 9 Mei 2026 • 10:00 WIB", duration: "60 Menit", status: "Dibatalkan" },
];

const menteeSessions: SessionItem[] = [
  { id: 101, avatar: 12, name: "Dr. Farhan Akbar", role: "Mentor", campus: "Universitas Indonesia", topic: "Kalkulus Dasar", date: "Senin, 18 Mei 2026 • 19:00 WIB", duration: "60 Menit", status: "Menunggu Respons" },
  { id: 102, avatar: 15, name: "Raka Pradipta", role: "Mentor", campus: "Universitas Gadjah Mada", topic: "Pemrograman Web Lanjut", date: "Hari ini • 15:00 WIB", duration: "60 Menit", status: "Dikonfirmasi" },
  { id: 103, avatar: 19, name: "Salsabila Putri", role: "Mentor", campus: "Institut Teknologi Bandung", topic: "Analisis Data Dasar", date: "Sabtu, 9 Mei 2026 • 10:00 WIB", duration: "60 Menit", status: "Dibatalkan" },
];

function SchedulePage({ role }: { role: Role }) {
  const [activeFilter, setActiveFilter] = useState("Dikonfirmasi");
  const [mentorSchedule, setMentorSchedule] = useState(mentorSessions);
  const [menteeSchedule, setMenteeSchedule] = useState(menteeSessions);
  const [hasSessions, setHasSessions] = useState(true);
  const [notice, setNotice] = useState("");
  const [otp, setOtp] = useState("");
  const sessions = role === "Mentee" ? menteeSchedule : mentorSchedule;
  const filters = ["Semua Sesi", "Menunggu Respons", "Dikonfirmasi", "Riwayat (Selesai/Batal)"];
  const visibleSessions = activeFilter === "Semua Sesi" || activeFilter === "Dikonfirmasi"
    ? sessions
    : activeFilter === "Riwayat (Selesai/Batal)"
      ? sessions.filter((session) => session.status === "Dibatalkan")
      : sessions.filter((session) => session.status === activeFilter);

  const updateSession = (id: number, status: SessionStatus, message: string) => {
    const setter = role === "Mentee" ? setMenteeSchedule : setMentorSchedule;
    setter((current) => current.map((session) => session.id === id ? { ...session, status } : session));
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <main className="schedule-page">
      <header className="schedule-header">
        <div>
          <p className="eyebrow dark">BOOKING MANAGEMENT</p>
          <h1>Manajemen Jadwal Sesi</h1>
          <p>Pantau dan kelola seluruh pengajuan bimbingan belajarmu di sini.</p>
        </div>
        <div className="schedule-summary">
          <span><Icon name="calendar" /></span>
          <div><small>Sesi bulan ini</small><strong>{hasSessions ? "03" : "00"}</strong></div>
        </div>
      </header>

      <div className="schedule-controls">
        <div className="booking-tabs" role="tablist" aria-label="Filter jadwal sesi">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
              role="tab"
              aria-selected={activeFilter === filter}
              disabled={!hasSessions}
            >
              {filter}
              {filter === "Menunggu Respons" && <b>{hasSessions ? sessions.filter((session) => session.status === "Menunggu Respons").length : 0}</b>}
            </button>
          ))}
        </div>
        <div className="schedule-simulator" aria-label="Simulasi isi jadwal">
          <span>Simulasi</span>
          <div>
            <button className={hasSessions ? "active" : ""} onClick={() => setHasSessions(true)}>Ada Sesi</button>
            <button className={!hasSessions ? "active" : ""} onClick={() => setHasSessions(false)}>Belum Ada</button>
          </div>
        </div>
      </div>

      {hasSessions ? (
        <>
          <div className="list-meta">
            <div><strong>{visibleSessions.length} sesi</strong><span>Urut berdasarkan jadwal terdekat</span></div>
            <span className={notice ? "action-notice visible" : "action-notice"}><Icon name="check" />{notice}</span>
          </div>

          <section className="booking-list" aria-live="polite">
            {visibleSessions.map((session) => (
              <article key={session.id} className={`booking-card ${role === "Mentee" ? "mentee-card" : "mentor-card"} status-${session.status.toLowerCase().replace(" ", "-")}`}>
                <div className="booking-person">
                  <Avatar index={session.avatar} size="large" />
                  <span className="presence-dot" />
                </div>

                <div className="booking-info">
                  <div className="booking-name">
                    <div><h2>{session.name}</h2><span>{session.role} • {session.campus}</span></div>
                    <span className={`booking-status ${session.status === "Menunggu Respons" ? "pending" : session.status === "Dikonfirmasi" ? "confirmed" : "cancelled"}`}>
                      {role === "Mentee" && session.status === "Menunggu Respons" ? "Menunggu Respons Mentor" : role === "Mentee" && session.status === "Dibatalkan" ? "Ditolak Mentor" : session.status}
                    </span>
                  </div>
                  <div className={session.status === "Dibatalkan" ? "booking-topic struck-topic" : "booking-topic"}><Icon name="book" /><span><small>Topik bimbingan</small><strong>{session.topic}</strong></span></div>
                  <div className={session.status === "Dibatalkan" ? "booking-time struck" : "booking-time"}>
                    <span><Icon name="calendar" />{session.date}</span><i /><span><Icon name="clock" />Durasi {session.duration}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  {session.status === "Menunggu Respons" && role === "Mentee" && (
                    <>
                      <p className="escrow-info"><Icon name="coins" />Koin tertahan (Escrow): <strong>20 Koin</strong></p>
                      <button className="cancel-request-button" onClick={() => updateSession(session.id, "Dibatalkan", "Pengajuan dibatalkan. Refund 100% telah diproses.")}>
                        <span>Batalkan Pengajuan</span><small>Refund 100%</small>
                      </button>
                    </>
                  )}
                  {session.status === "Menunggu Respons" && role === "Mentor" && (
                    <>
                      <p><span className="pulse-dot" />Batas konfirmasi sisa 4 jam</p>
                      <div><Button variant="danger" onClick={() => updateSession(session.id, "Dibatalkan", "Permintaan bimbingan ditolak.")}>Tolak</Button><Button variant="primary" icon="arrow" onClick={() => updateSession(session.id, "Dikonfirmasi", "Sesi diterima. Silakan lengkapi link rapat.")}>Terima & Isi Link</Button></div>
                    </>
                  )}
                  {session.status === "Dikonfirmasi" && role === "Mentee" && (
                    <>
                      <p><Icon name="clock" />Sesi dimulai dalam 15 menit</p>
                      <a className="meeting-link" href="https://meet.google.com/abc-defg-hij" target="_blank" rel="noreferrer"><Icon name="arrow" /><span>https://meet.google.com/abc-defg-hij</span></a>
                      <div><Button variant="primary" icon="check" onClick={() => { setNotice("Check-in kehadiran berhasil dicatat."); window.setTimeout(() => setNotice(""), 2800); }}>Saya Sudah Hadir (Check-in)</Button></div>
                      <div className="otp-area">
                        <label htmlFor={`otp-${session.id}`}>OTP Kehadiran</label>
                        <div><input id={`otp-${session.id}`} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" placeholder="6 digit" maxLength={6} /><button onClick={() => { setNotice(otp.length === 6 ? "OTP berhasil dikirim." : "Masukkan 6 digit OTP."); window.setTimeout(() => setNotice(""), 2800); }}>Kirim OTP</button></div>
                      </div>
                      <button className="report-link" onClick={() => { setNotice("Laporan ketidakhadiran mentor dicatat."); window.setTimeout(() => setNotice(""), 2800); }}>Lapor Mentor Tidak Hadir</button>
                    </>
                  )}
                  {session.status === "Dikonfirmasi" && role === "Mentor" && (
                    <>
                      <p><Icon name="clock" />Tombol Check-in aktif H-15 menit sebelum sesi.</p>
                      <div className="meeting-link"><Icon name="lock" /><span>https://meet.google.com/abc-defg-hij</span></div>
                      <div><Button variant="primary" icon="check" onClick={() => { setNotice("Check-in berhasil dicatat."); window.setTimeout(() => setNotice(""), 2800); }}>Saya Sudah Hadir (Check-in)</Button></div>
                      <button className="cancel-link" onClick={() => updateSession(session.id, "Dibatalkan", "Sesi dibatalkan dan refund sedang diproses.")}>Batalkan Sesi</button>
                    </>
                  )}
                  {session.status === "Dibatalkan" && role === "Mentee" ? (
                    <p className="mentee-refund-note">Pengajuan ditolak oleh mentor. <strong>20 Koin (100%)</strong> telah dikembalikan ke dompet Anda.</p>
                  ) : session.status === "Dibatalkan" && (
                    <div className="cancelled-note"><span><Icon name="x" /></span><p>Dibatalkan oleh Mentee<br /><small>Refund 100% telah diproses</small></p></div>
                  )}
                </div>
              </article>
            ))}
            {visibleSessions.length === 0 && (
              <div className="schedule-empty"><span><Icon name="calendar" size={30} /></span><h2>Belum ada sesi pada kategori ini</h2><p>Sesi baru akan otomatis muncul setelah booking dibuat.</p></div>
            )}
          </section>
        </>
      ) : (
        <section className="schedule-zero-state">
          <div className="zero-visual" aria-hidden="true">
            <div className="zero-calendar"><Icon name="calendar" size={48} /><strong>0</strong></div>
            <div className="zero-person"><Icon name={role === "Mentor" ? "graduation" : "user"} size={26} /></div>
            <span className="zero-orbit one" />
            <span className="zero-orbit two" />
          </div>
          <span className="zero-role">{role} • Akun Baru</span>
          <h2>{role === "Mentor" ? "Belum Ada Permintaan Sesi Masuk" : "Kamu Belum Memesan Sesi Bimbingan"}</h2>
          <p>{role === "Mentor"
            ? "Aktifkan dan lengkapi jam ketersediaan mingguanmu. Saat mentee memesan salah satu slot, detail pengajuan akan langsung tampil di halaman ini."
            : "Mulai perjalanan belajarmu dengan mencari mentor berdasarkan topik, pengalaman, dan jadwal yang paling sesuai dengan kebutuhanmu."}</p>
          <div className="zero-benefits">
            <span><Icon name="check" />Booking tercatat otomatis</span>
            <span><Icon name="check" />Pengingat sebelum sesi</span>
            <span><Icon name="check" />Pembayaran terlindungi</span>
          </div>
          <Button variant="primary" icon="arrow">{role === "Mentor" ? "Atur Ketersediaan Mingguan" : "Cari & Pesan Mentor"}</Button>
          <small>Ubah role melalui switcher di navbar untuk melihat simulasi lainnya.</small>
        </section>
      )}
    </main>
  );
}

const umrahTopicGroups = [
  {
    code: "FT",
    title: "Teknologi & Rekayasa",
    description: "Komputasi, sistem teknik, dan rekayasa kemaritiman.",
    topics: ["Pemrograman Web", "Desain UI/UX", "Struktur Data & Algoritma", "Jaringan Komputer", "Sistem Kelistrikan Kapal", "Desain Perkapalan (AutoCAD)"],
  },
  {
    code: "FIKP",
    title: "Ilmu Maritim & Perikanan",
    description: "Ekosistem laut, industri perikanan, dan wilayah pesisir.",
    topics: ["Oseanografi Dasar", "Budidaya Perairan (Akuakultur)", "Manajemen Pesisir", "Teknologi Hasil Laut", "Ekonomi Perikanan", "Navigasi & Pelayaran"],
  },
  {
    code: "FISIP",
    title: "Sosial, Politik & Hukum",
    description: "Masyarakat, pemerintahan, hubungan global, dan kebijakan.",
    topics: ["Hukum Tata Negara", "Ilmu Pemerintahan", "Hubungan Internasional", "Teori Sosiologi", "Analisis Kebijakan Publik", "Administrasi Negara"],
  },
  {
    code: "FE",
    title: "Ekonomi & Bisnis",
    description: "Keuangan, manajemen, bisnis, dan ekonomi terapan.",
    topics: ["Akuntansi Keuangan", "Manajemen Pemasaran", "Statistika Ekonomi", "Kewirausahaan Digital", "Hukum Bisnis"],
  },
  {
    code: "FKIP",
    title: "Pendidikan & Sains",
    description: "Sains dasar, kompetensi bahasa, dan praktik mengajar.",
    topics: ["Matematika Dasar (Kalkulus)", "Kimia Terapan", "Biologi Laut", "English Proficiency / TOEFL", "Microteaching"],
  },
  {
    code: "LINTAS",
    title: "Keterampilan Akademik Lintas Jurusan",
    description: "Kompetensi akademik yang relevan untuk seluruh program studi.",
    topics: ["Metodologi Penelitian", "Bimbingan Skripsi", "Analisis Data (SPSS/Python)", "Public Speaking", "Penulisan Jurnal Ilmiah"],
  },
];

function TopicSelection({ role }: { role: Role }) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Pemrograman Web", "Desain UI/UX", "Metodologi Penelitian"]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
    setError("");
    setSaved(false);
  };

  const saveTopics = () => {
    if (selectedTopics.length === 0) {
      setError("Wajib memilih minimal satu topik keahlian.");
      setSaved(false);
      return;
    }
    setError("");
    setSaved(true);
    setEditing(false);
    window.setTimeout(() => setSaved(false), 2500);
  };

  if (!editing) {
    return (
      <section className="topic-summary-card">
        <div className="topic-summary-heading">
          <span><Icon name="target" /></span>
          <div>
            <p className="eyebrow dark">MINAT & KEAHLIAN</p>
            <h2>Topik Bimbingan Anda</h2>
            <p>Topik ini digunakan untuk menyesuaikan rekomendasi mentor, sesi, dan partner belajar.</p>
          </div>
          <span className={saved ? "topic-saved-notice visible" : "topic-saved-notice"}><Icon name="check" />Perubahan tersimpan</span>
        </div>
        <div className="summary-topic-chips" aria-label="Topik bimbingan tersimpan">
          {selectedTopics.map((topic) => <span className="summary-topic-chip" key={topic}>{topic}</span>)}
        </div>
        <div className="topic-summary-action">
          <Button variant="outline" icon="arrow" onClick={() => setEditing(true)}>Edit Topik</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="topics-panel">
      <div className="topics-intro">
        <div>
          <span className="umrah-mark"><Icon name="graduation" /></span>
          <div>
            <p className="eyebrow dark">PETA KEILMUAN UMRAH</p>
            <h2>Pilih Topik Keahlian & Minat</h2>
            <p>Pilih minimal 1 topik bimbingan yang ingin Anda {role === "Mentee" ? "pelajari" : "kuasai"} ({role}).</p>
          </div>
        </div>
        <div className="topics-intro-actions">
          <div className="selection-counter">
            <strong>{String(selectedTopics.length).padStart(2, "0")}</strong>
            <span>Topik Dipilih</span>
          </div>
        </div>
      </div>

      <div className="topic-groups">
        {umrahTopicGroups.map((group, index) => (
          <article className="topic-group" key={group.code}>
            <div className="topic-group-heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{group.title}</h3><p>{group.description}</p></div>
              <b>{group.code}</b>
            </div>
            <div className="topic-chips">
              {group.topics.map((topic) => {
                const selected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    className={selected ? "topic-chip selected" : "topic-chip"}
                    onClick={() => toggleTopic(topic)}
                    aria-pressed={selected}
                  >
                    <span>{topic}</span>
                    {selected && <Icon name="x" size={13} />}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="topics-footer">
        <div>
          <span className={error ? "topic-error visible" : "topic-error"}><Icon name="x" size={14} />{error}</span>
        </div>
        <div className="topic-edit-actions">
          <Button variant="ghost" onClick={() => { setEditing(false); setError(""); }}>Batal</Button>
          <Button variant="primary" onClick={saveTopics}>Simpan Perubahan</Button>
        </div>
      </div>
    </section>
  );
}

function SecurityPage() {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const [passwords, setPasswords] = useState({ current: "", next: "", confirmation: "" });
  const [message, setMessage] = useState("");
  const [deleteRequested, setDeleteRequested] = useState(false);

  const passwordFields = [
    ["current", "Kata Sandi Saat Ini", "Masukkan kata sandi saat ini"],
    ["next", "Kata Sandi Baru", "Minimal 8 karakter"],
    ["confirmation", "Konfirmasi Kata Sandi Baru", "Ulangi kata sandi baru"],
  ] as const;

  const updatePassword = () => {
    if (passwords.next.length < 8 || !/[A-Za-z]/.test(passwords.next) || !/[0-9]/.test(passwords.next)) {
      setMessage("Kata sandi baru harus minimal 8 karakter dan mengandung huruf serta angka.");
      return;
    }
    if (passwords.next !== passwords.confirmation) {
      setMessage("Konfirmasi kata sandi baru belum sesuai.");
      return;
    }
    if (!passwords.current) {
      setMessage("Masukkan kata sandi saat ini untuk melanjutkan.");
      return;
    }
    setPasswords({ current: "", next: "", confirmation: "" });
    setMessage("Kata sandi berhasil diperbarui.");
  };

  return (
    <section className="security-card">
      <div className="security-section">
        <div className="security-heading">
          <span><Icon name="lock" /></span>
          <div><p className="eyebrow dark">SRS-F-AUTH-06</p><h2>Ganti Kata Sandi</h2><p>Pastikan akun Anda menggunakan kata sandi yang kuat (minimal 8 karakter, mengandung huruf & angka).</p></div>
        </div>
        <div className="password-grid">
          {passwordFields.map(([key, label, placeholder]) => (
            <label className="password-field" key={key}>
              <span>{label}</span>
              <div>
                <input
                  type={visible[key] ? "text" : "password"}
                  value={passwords[key]}
                  placeholder={placeholder}
                  onChange={(event) => { setPasswords((current) => ({ ...current, [key]: event.target.value })); setMessage(""); }}
                />
                <button type="button" onClick={() => setVisible((current) => ({ ...current, [key]: !current[key] }))} aria-label={visible[key] ? `Sembunyikan ${label}` : `Tampilkan ${label}`}>
                  <Icon name={visible[key] ? "eyeOff" : "eye"} size={17} />
                </button>
              </div>
            </label>
          ))}
        </div>
        <div className="security-action">
          <span className={message ? (message.includes("berhasil") ? "security-message success" : "security-message error") : "security-message"}>{message}</span>
          <Button variant="primary" onClick={updatePassword}>Perbarui Kata Sandi</Button>
        </div>
      </div>

      <div className="security-divider" />

      <div className="danger-section">
        <div className="danger-icon"><Icon name="x" /></div>
        <div className="danger-copy">
          <p className="eyebrow">SRS-F-ADM-06 • ZONA BAHAYA</p>
          <h2>Hapus Akun Permanen</h2>
          <p>Sesuai regulasi UU PDP, menghapus akun akan menganonimisasi data pribadi Anda. Pastikan Anda tidak memiliki sesi bimbingan aktif atau sengketa (Dispute) yang sedang berjalan.</p>
        </div>
        <button className="delete-account-button" type="button" onClick={() => setDeleteRequested(true)}>Ajukan Penghapusan Akun</button>
        {deleteRequested && (
          <div className="delete-confirmation">
            <div><strong>Permintaan belum dikirim</strong><span>Tim Mentlify perlu memeriksa sesi aktif dan sengketa terlebih dahulu.</span></div>
            <button type="button" onClick={() => setDeleteRequested(false)}><Icon name="x" size={16} /></button>
          </div>
        )}
      </div>
    </section>
  );
}

function Profile({ role, setRole }: { role: Role; setRole: (role: Role) => void }) {
  const [view, setView] = useState<"profile" | "security">("profile");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarColors.length);
  const [bio, setBio] = useState("Mahasiswi semester 3 yang sedang mendalami matematika dasar dan analisis data. Senang belajar bersama dan memecahkan soal algoritma yang rumit! ✌️");
  const [topics, setTopics] = useState(["Pemrograman Web", "Desain UI/UX", "Metodologi Penelitian"]);
  const [editing, setEditing] = useState(false);
  const [topicModal, setTopicModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const selectedAvatarNumber = selectedAvatar >= avatarColors.length ? selectedAvatar - avatarColors.length + 1 : selectedAvatar + 1;

  const toggleProfileTopic = (topic: string) => {
    setTopics((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  };

  const saveProfile = () => {
    setEditing(false);
    setTopicModal(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  if (view === "security") {
    return (
      <main className="profile-page">
        <div className="security-page-header">
          <button type="button" onClick={() => setView("profile")}><Icon name="back" />Kembali ke Profil</button>
          <div><p className="eyebrow dark">PENGATURAN AKUN</p><h1>Keamanan Akun</h1><p>Kelola kata sandi dan permintaan penghapusan akun Mentlify Anda.</p></div>
        </div>
        <SecurityPage />
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="unified-page-heading">
        <div><p className="eyebrow dark">PROFIL UTAMA</p><h1>Identitas Belajar</h1><p>Avatar, profil akademik, dan topik bimbingan Anda dalam satu tampilan.</p></div>
        <div className="profile-heading-actions">
          <div className="profile-role-control">
            <span>Mode akun</span>
            <div aria-label="Pilih peran akun">
              {(["Mentor", "Mentee"] as Role[]).map((item) => (
                <button key={item} className={role === item ? "active" : ""} onClick={() => setRole(item)}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="unified-profile">
          <section className="unified-hero-card">
            <div className="unified-identity">
              <div className="unified-avatar">
                <Avatar index={selectedAvatar} size="large" />
                {editing && <span><Icon name="edit" size={14} /></span>}
              </div>
              {!editing ? (
                <div className="identity-copy">
                  <p className="eyebrow dark">MENTLIFY #{String(selectedAvatarNumber).padStart(2, "0")}</p>
                  <h1>Nadine Amalia</h1>
                  <div className="identity-status"><span><Icon name="check" size={13} />Mahasiswa Terverifikasi</span><strong>Universitas Indonesia</strong></div>
                  <p className="identity-email">nadine.amalia@ui.ac.id</p>
                </div>
              ) : (
                <div className="unified-edit-fields">
                  <label><span>Nama Lengkap</span><input value="Nadine Amalia" readOnly /></label>
                  <label><span>Email Kampus</span><input value="nadine.amalia@ui.ac.id" readOnly /></label>
                  <label><span>Universitas</span><input value="Universitas Indonesia" readOnly /></label>
                </div>
              )}
            </div>

            <div className="unified-hero-actions">
              {role === "Mentor" && (
                <div className="mentor-profile-stats">
                  <div><strong>120</strong><span>Sesi Selesai</span></div>
                  <div><strong>4.8 ★</strong><span>Rating</span></div>
                  <div><strong>15</strong><span>Topik Dikuasai</span></div>
                </div>
              )}
              <span className={saved ? "unified-save-notice visible" : "unified-save-notice"}><Icon name="check" />Perubahan tersimpan</span>
              {editing
                ? <div className="unified-edit-actions"><Button variant="ghost" onClick={() => setEditing(false)}>Batal</Button><Button variant="primary" onClick={saveProfile}>Simpan Perubahan</Button></div>
                : <Button variant="outline" icon="edit" onClick={() => setEditing(true)}>Edit Profil</Button>}
            </div>

            {editing && (
              <div className="inline-avatar-picker">
                <div><strong>Pilih karakter avatar</strong><span>Gunakan satu dari 12 karakter resmi Mentlify.</span></div>
                <div className="inline-avatar-grid">
                  {uploadedAvatarPaths.map((_, uploadedIndex) => {
                    const avatarIndex = avatarColors.length + uploadedIndex;
                    return (
                    <button key={avatarIndex} className={selectedAvatar === avatarIndex ? "avatar-choice selected" : "avatar-choice"} onClick={() => setSelectedAvatar(avatarIndex)} aria-label={`Pilih avatar ${uploadedIndex + 1}`}>
                      <Avatar index={avatarIndex} size="grid" />{selectedAvatar === avatarIndex && <span><Icon name="check" size={11} /></span>}
                    </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          <div className="unified-details">
            <section className="unified-bio-card">
              <div className="unified-section-heading"><span><Icon name="user" /></span><div><p className="eyebrow dark">TENTANG SAYA</p><h2>Bio Singkat</h2></div></div>
              {editing ? (
                <label className="unified-bio-editor">
                  <textarea value={bio} onChange={(event) => setBio(event.target.value)} maxLength={180} />
                  <span>{bio.length}/180 karakter</span>
                </label>
              ) : <div className="unified-bio-box"><p>{bio}</p></div>}
            </section>

            <section className="unified-topics-card">
              <div className="unified-section-heading"><span><Icon name="target" /></span><div><p className="eyebrow dark">TOPIK BIMBINGAN</p><h2>Topik yang Dikuasai</h2></div></div>
              <div className="unified-topic-chips">
                {topics.map((topic) => <span key={topic}>{topic}</span>)}
              </div>
              {editing && <button className="add-topic-button" onClick={() => setTopicModal(true)}>+ Tambah Topik</button>}
              <p className="topics-microcopy">Digunakan untuk rekomendasi sistem.</p>
            </section>
          </div>

          <button className="security-entry-card" type="button" onClick={() => setView("security")}>
            <span className="security-entry-icon"><Icon name="lock" /></span>
            <span className="security-entry-copy"><strong>Keamanan Akun</strong><small>Kelola kata sandi dan penghapusan akun</small></span>
            <span className="security-entry-action">Buka Pengaturan <Icon name="arrow" size={16} /></span>
          </button>

          {topicModal && (
            <div className="topic-modal-backdrop" role="presentation" onMouseDown={() => setTopicModal(false)}>
              <section className="topic-modal" role="dialog" aria-modal="true" aria-labelledby="topic-modal-title" onMouseDown={(event) => event.stopPropagation()}>
                <header>
                  <div><p className="eyebrow dark">PETA KEILMUAN UMRAH</p><h2 id="topic-modal-title">Tambah Topik Bimbingan</h2><p>Pilih topik yang ingin ditampilkan pada profil Anda.</p></div>
                  <button onClick={() => setTopicModal(false)} aria-label="Tutup pemilihan topik"><Icon name="x" /></button>
                </header>
                <div className="modal-topic-groups">
                  {umrahTopicGroups.map((group, index) => (
                    <article key={group.code}>
                      <div><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3><b>{group.code}</b></div>
                      <div className="topic-chips">
                        {group.topics.map((topic) => {
                          const selected = topics.includes(topic);
                          return <button key={topic} className={selected ? "topic-chip selected" : "topic-chip"} onClick={() => toggleProfileTopic(topic)}><span>{topic}</span>{selected && <Icon name="x" size={13} />}</button>;
                        })}
                      </div>
                    </article>
                  ))}
                </div>
                <footer><span>{String(topics.length).padStart(2, "0")} topik dipilih</span><Button variant="primary" onClick={() => setTopicModal(false)}>Selesai Memilih</Button></footer>
              </section>
            </div>
          )}
      </div>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState("Dasbor");
  const [role, setRole] = useState<Role>("Mentee");
  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} role={role} />
      <div className="canvas">
        {page === "Profil" ? <Profile role={role} setRole={setRole} /> : page === "Dasbor" ? <Dashboard role={role} /> : page === "Jadwal Sesi" ? <SchedulePage role={role} /> : (
          <main className="placeholder-panel nav-placeholder">
            <span><Icon name="user" size={36} /></span>
            <p className="eyebrow dark">MODUL MENTLIFY</p><h1>{page}</h1>
            <p>Temukan mentor mahasiswa dan alumni berdasarkan topik serta waktu luangmu.</p>
            <Button variant="primary" onClick={() => setPage("Dasbor")}>Kembali ke Dasbor</Button>
          </main>
        )}
      </div>
    </div>
  );
}

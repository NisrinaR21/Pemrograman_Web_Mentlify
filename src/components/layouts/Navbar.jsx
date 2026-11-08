import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  CalendarClock,
  Coins,
  Menu,
  Star,
  Wallet,
  X,
} from 'lucide-react';
import logoWhite from '../../assets/logo-white.png';

// Warna canvas yang sama dengan `lightBg` di tailwind.config.js
const LIGHT_BG = '#F2F2ED';

const ROLES = [
  { key: 'mentee', label: 'Mentee' },
  { key: 'mentor', label: 'Mentor' },
  { key: 'admin', label: 'Admin' },
];

const NAV_ITEMS = {
  mentee: [
    { label: 'Dasbor', to: '/mentee/dasbor' },
    { label: 'Cari Mentor', to: '/mentee/cari-mentor' },
    { label: 'Jadwal Sesi', to: '/mentee/jadwal-sesi' },
    { label: 'Rating', to: '/mentee/rating' },
    { label: 'Profil', to: '/mentee/profil' },
  ],
  mentor: [
    { label: 'Dasbor', to: '/mentor/dasbor' },
    { label: 'Jadwal Sesi', to: '/mentor/jadwal-sesi' },
    { label: 'Rating', to: '/mentor/rating' },
    { label: 'Profil', to: '/mentor/profil' },
  ],
  admin: [
    { label: 'Verifikasi Mentor', to: '/admin/verifikasi-mentor' },
    { label: 'Keuangan & Dispute', to: '/admin/keuangan-dispute' },
  ],
};

const ROLE_HOME = {
  mentee: '/mentee/dasbor',
  mentor: '/mentor/dasbor',
  admin: '/admin/verifikasi-mentor',
};

const ADMIN_USER = {
  name: 'Theo Rodriguez',
  role: 'admin_verifikator',
  initials: 'TR',
};

const MENTOR_PAYOUT = {
  available: 1250000,
  pending: 450000,
};

const NOTIFICATIONS = {
  mentee: [
    {
      id: 1,
      icon: CalendarClock,
      title: 'Sesi Kalkulus dikonfirmasi',
      detail: 'Rina Maharani menerima permintaanmu. Rabu, 19.00 WIB.',
      time: '5 menit lalu',
    },
    {
      id: 2,
      icon: CalendarClock,
      title: 'Sesi Basis Data mulai 30 menit lagi',
      detail: 'Siapkan pertanyaanmu sebelum sesi dimulai.',
      time: '1 jam lalu',
    },
    {
      id: 3,
      icon: Coins,
      title: 'Top up berhasil',
      detail: '50 koin sudah masuk ke saldomu.',
      time: 'Kemarin',
    },
  ],
  mentor: [
    {
      id: 1,
      icon: CalendarClock,
      title: 'Permintaan sesi baru',
      detail: 'Dimas Pratama meminta sesi Struktur Data, Kamis 16.00 WIB.',
      time: '10 menit lalu',
    },
    {
      id: 2,
      icon: Wallet,
      title: 'Payout sedang diproses',
      detail: 'Rp 450.000 akan masuk ke rekeningmu dalam 1-2 hari kerja.',
      time: '2 jam lalu',
    },
    {
      id: 3,
      icon: Star,
      title: 'Rating baru 5 bintang',
      detail: 'Alya Putri menilai sesi Pemrograman Web milikmu.',
      time: 'Kemarin',
    },
  ],
  admin: [],
};

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

/* ------------------------------------------------------------------ */
/* Sub-komponen                                                        */
/* ------------------------------------------------------------------ */

function SimButton({ active = false, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${active
        ? 'border-secondary bg-secondary text-white'
        : 'border-amber-300 bg-white text-primary hover:bg-amber-50'
        }`}
    >
      {children}
    </button>
  );
}

function SimulationBar({
  role,
  onRoleChange,
  hasUnread,
  setHasUnread,
  notifOpen,
  setNotifOpen,
  payoutFilled,
  setPayoutFilled,
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-amber-300 bg-amber-100 px-4 py-2 text-xs text-amber-900">
      <span className="font-bold">🛠️ Simulasi Presentasi:</span>

      <div className="flex items-center gap-1.5">
        <span className="font-medium">Peran</span>
        {ROLES.map((item) => (
          <SimButton
            key={item.key}
            active={role === item.key}
            onClick={() => onRoleChange(item.key)}
          >
            {item.label}
          </SimButton>
        ))}
      </div>

      {role !== 'admin' && (
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Notifikasi</span>
          <SimButton active={hasUnread} onClick={() => setHasUnread(true)}>
            Ada notif baru
          </SimButton>
          <SimButton active={!hasUnread} onClick={() => setHasUnread(false)}>
            Kosong
          </SimButton>
          <SimButton active={notifOpen} onClick={() => setNotifOpen(true)}>
            Buka dropdown
          </SimButton>
        </div>
      )}

      {role === 'mentor' && (
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Saldo payout</span>
          <SimButton active={payoutFilled} onClick={() => setPayoutFilled(true)}>
            Berisi
          </SimButton>
          <SimButton active={!payoutFilled} onClick={() => setPayoutFilled(false)}>
            Kosong
          </SimButton>
        </div>
      )}
    </div>
  );
}

function Brand({ isAdmin, home }) {
  if (isAdmin) {
    return (
      <div className="flex items-center">
        <span className="text-lg font-bold text-primary">Verification Admin</span>
      </div>
    );
  }

  return (
    <Link
      to={home}
      className="flex items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <img src={logoWhite} alt="Mentlify" className="h-6 w-auto object-contain" />
    </Link>
  );
}

// Tab desktop. Tab aktif berwarna lightBg dengan lengkungan di kiri-kanan bawah
// sehingga menyatu dengan kanvas halaman di bawah navbar.
// Admin mode: tanpa lengkungan, cukup border-bottom aktif.
function TabLink({ to, label, tone }) {
  const isLightBar = tone === 'light';

  // Admin: tab sederhana tanpa flare
  if (isLightBar) {
    return (
      <li className="flex h-full items-center">
        <NavLink
          to={to}
          className={({ isActive }) =>
            [
              'relative flex h-full items-center whitespace-nowrap px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
              isActive
                ? 'font-bold text-secondary border-b-[3px] border-secondary'
                : 'text-primary/60 hover:text-primary',
            ].join(' ')
          }
        >
          {label}
        </NavLink>
      </li>
    );
  }

  // Mentee / Mentor: tab folder dengan lengkungan mulus (flare)
  return (
    <li className="flex items-end">
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            'relative flex h-11 items-center whitespace-nowrap px-6 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
            isActive
              ? 'rounded-t-2xl bg-lightBg font-bold text-secondary z-10'
              : 'font-medium text-white/80 hover:text-white',
          ].join(' ')
        }
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <>
                {/* Lengkungan kiri (flare) halus via SVG — transparan di atas, warna lightBg di sudut bawah */}
                <svg
                  className="absolute bottom-0 right-full h-4 w-4 pointer-events-none z-10"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M16 0 Q16 16 0 16 L16 16 Z" fill={LIGHT_BG} />
                </svg>
                {/* Lengkungan kanan (flare) halus via SVG */}
                <svg
                  className="absolute bottom-0 left-full h-4 w-4 pointer-events-none z-10"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M0 0 Q0 16 16 16 L0 16 Z" fill={LIGHT_BG} />
                </svg>
              </>
            )}
            {label}
          </>
        )}
      </NavLink>
    </li>
  );
}

function TopUpButton() {
  return (
    <Link
      to="/mentee/top-up"
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-accentYellow px-4 py-1.5 text-xs font-bold text-[#5A3A00] shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Top Up +
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );
}

function PayoutInfo({ filled }) {
  const amount = filled ? MENTOR_PAYOUT.available : 0;
  const hint = filled
    ? `${formatRupiah(MENTOR_PAYOUT.pending)} sedang diproses`
    : 'Belum ada saldo';

  return (
    <Link
      to="/mentor/payout"
      title={hint}
      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accentYellow py-1 pl-1.5 pr-3 text-[#5A3A00] shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-white/70">
        <Wallet className="h-3 w-3 text-[#5A3A00]" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-[9px] font-semibold text-[#5A3A00]/80">Saldo payout</span>
        <span className="block text-xs font-bold text-[#5A3A00]">{formatRupiah(amount)}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-[#5A3A00]/70" aria-hidden="true" />
    </Link>
  );
}

function NotificationBell({ role, hasUnread, setHasUnread, open, setOpen }) {
  const wrapperRef = useRef(null);
  const items = hasUnread ? NOTIFICATIONS[role] ?? [] : [];

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={hasUnread ? 'Notifikasi, ada yang belum dibaca' : 'Notifikasi'}
        aria-haspopup="true"
        aria-expanded={open}
        className="relative grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />
        {hasUnread && (
          <span
            aria-hidden="true"
            className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-primary"
          />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-accent bg-white text-primary shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-accent/40 px-4 py-3">
            <p className="text-sm font-bold">Notifikasi</p>
            {items.length > 0 && (
              <button
                type="button"
                onClick={() => setHasUnread(false)}
                className="text-xs font-semibold text-secondary hover:underline"
              >
                Tandai sudah dibaca
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-semibold">Belum ada notifikasi baru</p>
              <p className="mt-1 text-xs text-primary/70">
                Kabar sesi dan pembayaran akan muncul di sini.
              </p>
            </div>
          ) : (
            <ul className="max-h-80 divide-y divide-accent/30 overflow-y-auto">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="flex gap-3 px-4 py-3 hover:bg-lightBg">
                    <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/25 text-secondary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-primary/80">{item.detail}</p>
                      <p className="mt-1 text-[11px] text-primary/50">{item.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function AdminProfile({ onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right leading-tight">
        <p className="text-xs font-bold text-primary">{ADMIN_USER.name}</p>
        <p className="text-[11px] text-slate-500">{ADMIN_USER.role}</p>
      </div>
      <span
        aria-hidden="true"
        className="grid h-8 w-8 place-items-center rounded-full bg-accent/30 text-xs font-bold text-primary ring-2 ring-accent"
      >
        {ADMIN_USER.initials}
      </span>
      <button
        type="button"
        onClick={onLogout}
        className="inline-flex items-center gap-1.5 rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Keluar
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Komponen utama                                                      */
/* ------------------------------------------------------------------ */

export default function Navbar({
  userRole,
  setUserRole,
  onLogout,
  showSimulation = true,
}) {
  // Bila prop tidak dikirim, komponen tetap bisa jalan sendiri untuk demo.
  const [internalRole, setInternalRole] = useState('mentee');
  const requestedRole = userRole ?? internalRole;
  const role = NAV_ITEMS[requestedRole] ? requestedRole : 'mentee';
  const updateRole = setUserRole ?? setInternalRole;

  const [hasUnread, setHasUnread] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [payoutFilled, setPayoutFilled] = useState(true);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isAdmin = role === 'admin';
  const items = NAV_ITEMS[role];
  const home = ROLE_HOME[role];

  // Tutup dropdown & menu mobile setiap pindah halaman.
  useEffect(() => {
    setNotifOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const handleRoleChange = (nextRole) => {
    updateRole(nextRole);
    setNotifOpen(false);
    setMobileOpen(false);
    // Pindah ke halaman utama peran baru agar tab aktif langsung terlihat.
    navigate(ROLE_HOME[nextRole]);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    else navigate('/login');
  };

  const bellProps = {
    role,
    hasUnread,
    setHasUnread,
    open: notifOpen,
    setOpen: setNotifOpen,
  };

  return (
    <header className="relative z-30">
      {showSimulation && (
        <SimulationBar
          role={role}
          onRoleChange={handleRoleChange}
          hasUnread={hasUnread}
          setHasUnread={setHasUnread}
          notifOpen={notifOpen}
          setNotifOpen={setNotifOpen}
          payoutFilled={payoutFilled}
          setPayoutFilled={setPayoutFilled}
        />
      )}

      <nav
        aria-label="Navigasi utama"
        className={
          isAdmin
            ? 'border-b border-slate-200 bg-white'
            : 'bg-primary'
        }
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
          <Brand isAdmin={isAdmin} home={home} />

          {/* Desktop */}
          <ul
            className={`hidden h-full md:flex ${isAdmin ? 'ml-10 mr-auto items-center gap-2' : 'ml-auto mr-8 items-end gap-1'
              }`}
          >
            {items.map((item) => (
              <TabLink
                key={item.to}
                to={item.to}
                label={item.label}
                tone={isAdmin ? 'light' : 'dark'}
              />
            ))}
          </ul>

          <div className="hidden items-center gap-3.5 md:flex">
            {role === 'mentee' && <TopUpButton />}
            {role === 'mentor' && <PayoutInfo filled={payoutFilled} />}
            {role !== 'admin' && <NotificationBell {...bellProps} />}
            {isAdmin && <AdminProfile onLogout={handleLogout} />}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            {!isAdmin && <NotificationBell {...bellProps} />}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={mobileOpen}
              className={`grid h-10 w-10 place-items-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isAdmin
                ? 'border-slate-300 text-primary'
                : 'border-accent/50 text-accent'
                }`}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className={`px-4 pb-5 pt-2 md:hidden ${isAdmin ? 'border-t border-slate-200' : 'border-t border-white/10'
              }`}
          >
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm transition-colors ${isActive
                        ? 'bg-lightBg font-bold text-secondary'
                        : isAdmin
                          ? 'font-semibold text-primary hover:bg-lightBg'
                          : 'font-semibold text-accent hover:bg-white/10'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {role === 'mentee' && <TopUpButton />}
              {role === 'mentor' && <PayoutInfo filled={payoutFilled} />}
              {isAdmin && <AdminProfile onLogout={handleLogout} />}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

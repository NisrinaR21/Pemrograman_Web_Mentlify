import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar.jsx';
import AuthForm from './components/page01-login/AuthForm.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminLoginPage from './components/page08-ADMver/AdminLoginPage.jsx';
import AdminVerificationPage from './components/page08-ADMver/adminverificationpage.jsx';
import AdminFinancePage from './pages/AdminFinancePage.jsx';
import CariMentorPage from './components/page03-CariMentor/CariMentorPage.jsx';
import JadwalSesiPage from './pages/JadwalSesiPage.jsx';
import RatingPage from './pages/RatingPage.jsx';
import DompetPage from './pages/DompetPage.jsx'; // 1. Tambahkan import DompetPage
import BankSoalPage from './pages/BankSoalPage.jsx';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Sinkronisasi peran global (mentee, mentor, admin)
  const [userRole, setUserRole] = useState(() => {
    if (location.pathname.startsWith('/mentor')) return 'mentor';
    if (location.pathname.startsWith('/admin')) return 'admin';
    return 'mentee';
  });

  useEffect(() => {
    if (location.pathname.startsWith('/mentor')) {
      setUserRole('mentor');
    } else if (location.pathname.startsWith('/mentee')) {
      setUserRole('mentee');
    } else if (location.pathname.startsWith('/admin')) {
      setUserRole('admin');
    }
  }, [location.pathname]);

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/auth' ||
    location.pathname === '/onboarding' ||
    location.pathname === '/admin/login';

  // State simulasi jadwal hari ini ('terjadwal' | 'kosong')
  const [hasSchedule, setHasSchedule] = useState('terjadwal');

  // State simulasi saldo mentee ('cukup' | 'kurang')
  const [menteeSaldo, setMenteeSaldo] = useState('cukup');

  const handleLogout = () => {
    navigate('/login');
  };

  const handleRoleChangeFromProfile = (newRole) => {
    setUserRole(newRole);
    navigate(`/${newRole}/profil`);
  };

  return (
    <div className="min-h-screen bg-lightBg font-sans">
      <Navbar
        userRole={userRole}
        setUserRole={setUserRole}
        onLogout={handleLogout}
        hasSchedule={hasSchedule}
        setHasSchedule={setHasSchedule}
        menteeSaldo={menteeSaldo}
        setMenteeSaldo={setMenteeSaldo}
      />

      <Routes>
        {/* =========================================
            1. RUTE AUTENTIKASI (User & Admin)
           ========================================= */}
        <Route path="/login" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route path="/auth" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route
          path="/onboarding"
          element={<AuthForm onSuccessLogin={() => navigate('/')} initialMode="onboarding" />}
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* =========================================
            2. RUTE DASBOR (DashboardPage)
           ========================================= */}
        <Route path="/" element={<DashboardPage userRole={userRole} hasSchedule={hasSchedule} />} />
        <Route path="/mentee/dasbor" element={<DashboardPage userRole="mentee" hasSchedule={hasSchedule} />} />
        <Route path="/mentor/dasbor" element={<DashboardPage userRole="mentor" hasSchedule={hasSchedule} />} />

        {/* =========================================
            3. RUTE ADMIN (Verifikasi & Keuangan)
           ========================================= */}
        <Route path="/admin/verifikasi-mentor" element={<AdminVerificationPage />} />
        <Route path="/admin/finance" element={<AdminFinancePage />} />
        <Route path="/admin/keuangan-dispute" element={<AdminFinancePage />} />
        <Route path="/admin/keuangan" element={<AdminFinancePage />} />

        {/* =========================================
            4. RUTE MENTEE: CARI MENTOR
           ========================================= */}
        <Route path="/cari-mentor" element={<CariMentorPage menteeSaldo={menteeSaldo} />} />
        <Route path="/mentee/cari-mentor" element={<CariMentorPage menteeSaldo={menteeSaldo} />} />

        {/* =========================================
            5. RUTE JADWAL SESI & BANK SOAL MENTOR
           ========================================= */}
        <Route path="/jadwal-sesi" element={<JadwalSesiPage userRole={userRole} hasSchedule={hasSchedule} />} />
        <Route path="/mentee/jadwal-sesi" element={<JadwalSesiPage userRole="mentee" hasSchedule={hasSchedule} />} />
        <Route path="/mentor/jadwal-sesi" element={<JadwalSesiPage userRole="mentor" hasSchedule={hasSchedule} />} />
        <Route path="/mentor/bank-soal" element={<BankSoalPage />} />
        <Route path="/bank-soal" element={<BankSoalPage />} />

        {/* =========================================
            6. RUTE RATING
           ========================================= */}
        <Route path="/rating" element={<RatingPage userRole={userRole} hasSchedule={hasSchedule} />} />
        <Route path="/mentee/rating" element={<RatingPage userRole="mentee" hasSchedule={hasSchedule} />} />
        <Route path="/mentor/rating" element={<RatingPage userRole="mentor" hasSchedule={hasSchedule} />} />

        {/* =========================================
            7. RUTE PROFIL & PENGATURAN (ProfilePage)
           ========================================= */}
        <Route
          path="/profil"
          element={
            <ProfilePage
              userRole={userRole === 'admin' ? 'mentee' : userRole}
              setUserRole={handleRoleChangeFromProfile}
              onKeluar={handleLogout}
            />
          }
        />
        <Route
          path="/mentee/profil"
          element={
            <ProfilePage
              userRole="mentee"
              setUserRole={handleRoleChangeFromProfile}
              onKeluar={handleLogout}
            />
          }
        />
        <Route
          path="/mentor/profil"
          element={
            <ProfilePage
              userRole="mentor"
              setUserRole={handleRoleChangeFromProfile}
              onKeluar={handleLogout}
            />
          }
        />

        {/* =========================================
            8. RUTE DOMPET KOIN & TOP UP (Mentee & Mentor)
           ========================================= */}
        <Route path="/dompet" element={<DompetPage userRole={userRole} />} />
        <Route path="/mentee/dompet" element={<DompetPage userRole="mentee" />} />
        <Route path="/mentor/dompet" element={<DompetPage userRole="mentor" />} />
        <Route path="/top-up" element={<DompetPage userRole={userRole} />} />
        <Route path="/topup" element={<DompetPage userRole={userRole} />} />
        <Route path="/mentee/top-up" element={<DompetPage userRole="mentee" />} />
        <Route path="/mentor/top-up" element={<DompetPage userRole="mentor" />} />
        <Route path="/payout" element={<DompetPage userRole="mentor" />} />
        <Route path="/mentor/payout" element={<DompetPage userRole="mentor" />} />

        {/* =========================================
            9. FALLBACK REDIRECT
           ========================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
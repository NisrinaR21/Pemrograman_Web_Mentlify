import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar.jsx';
import AuthForm from './components/page01-login/AuthForm.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminLoginPage from './components/page08-ADMver/AdminLoginPage.jsx';
import AdminVerificationPage from './components/page08-ADMver/adminverificationpage.jsx';
import AdminFinancePage from './components/page08-ADMver/AdminFinancePage.jsx';

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
      />

      <Routes>
        {/* =========================================
            1. RUTE AUTENTIKASI USER (AuthForm)
           ========================================= */}
        <Route path="/login" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route path="/auth" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route
          path="/onboarding"
          element={<AuthForm onSuccessLogin={() => navigate('/')} initialMode="onboarding" />}
        />

        {/* =========================================
            2. RUTE DASBOR (DashboardPage)
           ========================================= */}
        <Route path="/" element={<DashboardPage userRole={userRole} />} />
        <Route path="/mentee/dasbor" element={<DashboardPage userRole="mentee" />} />
        <Route path="/mentor/dasbor" element={<DashboardPage userRole="mentor" />} />

        {/* =========================================
            3. RUTE ADMIN (Admin Verification & Finance)
           ========================================= */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/verifikasi-mentor" element={<AdminVerificationPage />} />
        <Route path="/admin/finance" element={<AdminFinancePage />} />
        <Route path="/admin/keuangan-dispute" element={<AdminFinancePage />} />

        {/* =========================================
            4. RUTE PROFIL & PENGATURAN (ProfilePage)
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
            5. FALLBACK REDIRECT
           ========================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

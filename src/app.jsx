import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar.jsx';
import AuthForm from './components/page01-login/AuthForm.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

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
    location.pathname === '/onboarding';

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-lightBg font-sans">
      {!isAuthPage && (
        <Navbar
          userRole={userRole}
          setUserRole={setUserRole}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        {/* =========================================
            1. RUTE AUTENTIKASI (AuthForm)
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
        <Route path="/admin/verifikasi-mentor" element={<DashboardPage userRole="admin" />} />

        {/* =========================================
            3. RUTE PROFIL & PENGATURAN (ProfilePage)
           ========================================= */}
        <Route
          path="/profil"
          element={
            <ProfilePage
              userRole={userRole}
              setUserRole={setUserRole}
              onKeluar={handleLogout}
            />
          }
        />
        <Route
          path="/mentee/profil"
          element={
            <ProfilePage
              userRole="mentee"
              setUserRole={setUserRole}
              onKeluar={handleLogout}
            />
          }
        />
        <Route
          path="/mentor/profil"
          element={
            <ProfilePage
              userRole="mentor"
              setUserRole={setUserRole}
              onKeluar={handleLogout}
            />
          }
        />

        {/* =========================================
            4. FALLBACK REDIRECT
           ========================================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

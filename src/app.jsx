import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/layouts/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AuthForm from './components/page01-login/AuthForm.jsx';

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

  return (
    <div className="min-h-screen bg-lightBg font-sans">
      {!isAuthPage && (
        <Navbar userRole={userRole} setUserRole={setUserRole} />
      )}
      <Routes>
        <Route path="/" element={<DashboardPage userRole={userRole} />} />
        <Route path="/mentee/dasbor" element={<DashboardPage userRole={userRole} />} />
        <Route path="/mentor/dasbor" element={<DashboardPage userRole={userRole} />} />
        <Route path="/admin/verifikasi-mentor" element={<DashboardPage userRole={userRole} />} />
        <Route path="/login" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route path="/auth" element={<AuthForm onSuccessLogin={() => navigate('/')} />} />
        <Route
          path="/onboarding"
          element={<AuthForm onSuccessLogin={() => navigate('/')} initialMode="onboarding" />}
        />
      </Routes>
    </div>
  );
}

export default App;
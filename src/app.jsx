import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-lightBg font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
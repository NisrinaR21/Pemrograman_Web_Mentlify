// src/pages/DompetPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DompetMenteePage from '../components/page07-TopUp/DompetMenteePage.jsx';
import DompetMentorPage from '../components/page07-TopUp/DompetMentorPage.jsx';

export default function DompetPage({ userRole = 'mentee' }) {
    const location = useLocation();

    // Deteksi awal role berdasarkan URL atau props
    const getRoleDariKonteks = () => {
        if (location.pathname.includes('/mentor') || location.pathname.includes('/payout')) {
            return 'mentor';
        }
        if (location.pathname.includes('/mentee')) {
            return 'mentee';
        }
        return userRole || 'mentee';
    };

    const [roleAktif, setRoleAktif] = useState(getRoleDariKonteks);

    // Sinkronisasi saat URL atau userRole dari Navbar berubah
    useEffect(() => {
        if (location.pathname.includes('/mentor') || location.pathname.includes('/payout')) {
            setRoleAktif('mentor');
        } else if (location.pathname.includes('/mentee')) {
            setRoleAktif('mentee');
        } else if (userRole) {
            setRoleAktif(userRole);
        }
    }, [userRole, location.pathname]);

    const isPayoutRoute = location.pathname.includes('payout');

    return (
        <div className="min-h-screen bg-lightBg">
            {/* Render komponen sesuai role */}
            {roleAktif === 'mentee' ? (
                <DompetMenteePage />
            ) : (
                <DompetMentorPage initialHalaman={isPayoutRoute ? 'payout' : 'dompet'} />
            )}
        </div>
    );
}
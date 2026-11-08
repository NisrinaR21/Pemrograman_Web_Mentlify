// src/pages/AdminFinancePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminFinancePage from '../components/page09-ADMfin/AdminFinancePage.jsx';

export default function AdminFinance() {
    const navigate = useNavigate();

    return (
        <AdminFinancePage onLogout={() => navigate('/admin/login')} />
    );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, UserCheck, Wallet } from 'lucide-react';
import logoBiru from '../../assets/logo-biru.png';

const PRESET_ACCOUNTS = {
  verifikator: {
    role: 'verifikator',
    label: 'Admin Verifikasi Mentor',
    name: 'Theo Rodriguez',
    email: 'theo.rodriguez@admin.umrah.ac.id',
    password: 'admin123',
    redirect: '/admin/verifikasi-mentor',
  },
  finance: {
    role: 'finance',
    label: 'Admin Keuangan & Dispute',
    name: 'Budi Santoso',
    email: 'finance@admin.umrah.ac.id',
    password: 'admin123',
    redirect: '/admin/finance',
  },
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('verifikator');
  const [email, setEmail] = useState('theo.rodriguez@admin.umrah.ac.id');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSelectRole = (roleKey) => {
    setSelectedRole(roleKey);
    const preset = PRESET_ACCOUNTS[roleKey];
    setEmail(preset.email);
    setPassword(preset.password);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Silakan masukkan email/username dan kata sandi.');
      return;
    }

    // Arahkan sesuai role
    if (selectedRole === 'verifikator') {
      navigate('/admin/verifikasi-mentor');
    } else {
      navigate('/admin/finance');
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-42px)] items-center justify-center bg-lightBg px-4 py-12">
      <div className="w-full max-w-[440px]">
        {/* Kartu Login */}
        <div className="rounded-3xl border border-accent/70 bg-white p-8 shadow-xl shadow-primary/5 sm:p-10">
          {/* Logo & Judul */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-primary">Portal Admin Mentlify</h1>
            <p className="mt-1.5 text-xs text-slate-500">
              Khusus staf dan administrator Universitas Maritim Raja Ali Haji
            </p>
          </div>

          {/* Switch Role Admin */}
          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Pilih Divisi Admin
            </p>
            <div className="grid grid-cols-2 gap-2 rounded-2xl bg-lightBg p-1.5 border border-accent/40">
              <button
                type="button"
                onClick={() => handleSelectRole('verifikator')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-bold transition-all duration-200 ${
                  selectedRole === 'verifikator'
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                <UserCheck className="h-4 w-4" />
                Verifikasi
              </button>
              <button
                type="button"
                onClick={() => handleSelectRole('finance')}
                className={`flex items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-bold transition-all duration-200 ${
                  selectedRole === 'finance'
                    ? 'bg-secondary text-white shadow-sm'
                    : 'text-slate-600 hover:text-primary'
                }`}
              >
                <Wallet className="h-4 w-4" />
                Finance
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-bold text-primary">
                Email / ID Staf
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@umrah.ac.id"
                  className="w-full rounded-xl border border-slate-200 bg-lightBg/60 px-4 py-2.5 pl-10 text-sm text-primary transition focus:border-secondary focus:bg-white focus:outline-none"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-primary">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full rounded-xl border border-slate-200 bg-lightBg/60 px-4 py-2.5 pl-10 pr-10 text-sm text-primary transition focus:border-secondary focus:bg-white focus:outline-none"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              Masuk sebagai {selectedRole === 'verifikator' ? 'Verifikator' : 'Finance'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Preset Help */}
          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-[11px] text-slate-400">
              Preset Demo: Username &amp; Kata Sandi otomatis terisi sesuai divisi terpilih.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


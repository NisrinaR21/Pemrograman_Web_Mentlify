import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet, User, Clock } from 'lucide-react';

export default function AdminFinancePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-primary">
      {/* Header Khusus Finance Admin */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">Finance &amp; Dispute Admin</h1>
            <p className="text-xs text-slate-500">Panel Manajemen Keuangan &amp; Payout Mentor</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-bold text-primary">Budi Santoso</p>
            <p className="text-xs text-slate-500">admin_finance</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white">
            <User className="h-5 w-5" />
          </span>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-500 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </header>

      {/* Konten Halaman Putih */}
      <main className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lightBg text-slate-400">
          <Clock className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-primary">
          Modul Keuangan &amp; Dispute
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          Halaman ini disiapkan khusus untuk Admin Finance. Fitur pengelolaan pencairan dana (*payout*), riwayat transaksi koin, dan resolusi dispute sedang dalam tahap pengembangan backend.
        </p>
        <button
          type="button"
          onClick={() => navigate('/admin/login')}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-white transition hover:opacity-90"
        >
          Kembali ke Login Admin
        </button>
      </main>
    </div>
  );
}


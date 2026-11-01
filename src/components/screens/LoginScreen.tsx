import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building,
  Briefcase,
  Layers,
  Database,
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { loginAs, setIsSwitcherOpen, setIsSqlDrawerOpen } = useApp();
  const [tab, setTab] = useState<'agency' | 'client'>('agency');
  const [email, setEmail] = useState('admin@mohddigital.com');
  const [password, setPassword] = useState('••••••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleTabChange = (newTab: 'agency' | 'client') => {
    setTab(newTab);
    if (newTab === 'agency') {
      setEmail('admin@mohddigital.com');
    } else {
      setEmail('owner@citycareclinic.com');
    }
  };

  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'agency') {
      loginAs('admin');
    } else {
      loginAs('client');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFC] flex flex-col items-center justify-center p-4 relative select-none">
      {/* Top Bar for Switcher */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={() => setIsSwitcherOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Layers className="h-3.5 w-3.5 text-indigo-600" />
          <span>Switch Screen (1 of 12)</span>
        </button>
        <button
          onClick={() => setIsSqlDrawerOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
        >
          <Database className="h-3.5 w-3.5 text-emerald-600" />
          <span>Express & SQL Console</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200/80 p-8 shadow-xl shadow-slate-200/50">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-xs mb-3">
            <span className="font-bold text-lg text-indigo-600 tracking-tight">Mohd</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            ENTERPRISE B2B SUITE
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Mohd Digital Marketing
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Sign in to access your Agency or Client dashboard
          </p>
        </div>

        {/* Segmented Control */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleTabChange('agency')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              tab === 'agency'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            <span>Agency Staff</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('client')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition ${
              tab === 'client'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="h-3.5 w-3.5" />
            <span>Client Portal</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleDirectLogin} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Work Email</label>
              <span className="text-[10px] text-slate-400 font-medium">
                {tab === 'agency' ? 'Admin / Employee' : 'Client Account'}
              </span>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition shadow-2xs font-medium"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered email.')}
                className="text-[11px] font-medium text-indigo-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs text-slate-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 focus:outline-none transition shadow-2xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <span className="text-slate-600 font-medium">Remember this workstation</span>
            </label>
            <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Live API
            </span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-700 active:scale-98 transition"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-700 tracking-tight">
              DEMO CREDENTIALS (ONE-CLICK)
            </span>
            <span className="rounded bg-slate-200 px-1.5 py-0.2 font-mono text-[9px] text-slate-600">
              Sandbox v2.4
            </span>
          </div>

          <button
            type="button"
            onClick={() => loginAs('admin')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Admin Control</span>
                <span className="rounded bg-indigo-100 text-indigo-700 text-[10px] font-semibold px-1.5 py-0.2">
                  Full Access
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">admin@mohddigital.com</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            type="button"
            onClick={() => loginAs('specialist')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Rahul Verma</span>
                <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-semibold px-1.5 py-0.2">
                  Marketing Specialist
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">rahul@mohddigital.com</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </button>

          <button
            type="button"
            onClick={() => loginAs('client')}
            className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/40 text-left transition group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800">Dr. Alok Mehta</span>
                <span className="rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold px-1.5 py-0.2">
                  CityCare Clinic
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">owner@citycareclinic.com</div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Security & Infrastructure Footer */}
        <div className="mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
              256-bit SSL Encrypted
            </span>
            <span>•</span>
            <span>JWT Authentication</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Node.js Express & SQL Database
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <span>/</span>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>/</span>
            <a href="#support" className="hover:underline">Support Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

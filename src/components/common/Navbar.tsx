import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Database,
  Layers,
  ChevronDown,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentScreen,
    workspaceMode,
    setIsSqlDrawerOpen,
    setIsSwitcherOpen,
    setIsGlobalSearchOpen,
  } = useApp();

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'specialist';

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-md">
      {/* Left side / Breadcrumb */}
      <div className="flex items-center gap-3">
        {isAdmin ? (
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <span className="font-semibold text-slate-900">Mohd Digital</span>
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 font-medium">Console</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 capitalize">
              {currentScreen.replace('admin-', '').replace('client-', '').replace('-', ' ')}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
              City Care Clinic
            </div>
            <span className="text-xs text-slate-500 font-medium hidden md:inline">
              (Healthcare & Dental)
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Retainer Active
            </span>
            <span className="hidden lg:inline text-xs text-slate-400">
              • Client View (Single Business) • Today, 24 Apr 2025
            </span>
          </div>
        )}
      </div>

      {/* Middle Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <button
          onClick={() => setIsGlobalSearchOpen(true)}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 transition-all shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Search clients, posts, enquiries, or customers...</span>
          </div>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right side tools & Profile */}
      <div className="flex items-center gap-2.5">
        {/* 12-Screen Fast Switcher */}
        <button
          onClick={() => setIsSwitcherOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition shadow-xs"
          title="Switch between all 12 screen layouts"
        >
          <Layers className="h-3.5 w-3.5 text-indigo-600" />
          <span className="hidden sm:inline">12 Screens</span>
          <span className="rounded bg-indigo-200/80 px-1 py-0.2 text-[10px] font-bold">ALL</span>
        </button>

        {/* Node.js & SQL Database Live Console Toggle */}
        <button
          onClick={() => setIsSqlDrawerOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition shadow-xs group"
          title="Inspect Node.js Express API and SQL database queries"
        >
          <Database className="h-3.5 w-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
          <span className="hidden lg:inline font-mono text-[11px] text-slate-600">Express & SQL</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>

        {/* Role Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
          <span>{isAdmin ? 'Agency Admin' : 'Client Admin'}</span>
        </div>

        {/* Notifications */}
        <button
          onClick={() => alert('Notifications: 3 client sign-offs pending, 2 new WhatsApp enquiries received.')}
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
          <img
            src={currentUser?.avatarUrl}
            alt={currentUser?.name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-tight">
              {currentUser?.name}
            </div>
            <div className="text-[10px] font-medium text-slate-500 leading-tight">
              {currentUser?.title}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

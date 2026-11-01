import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Share2,
  FileText,
  CheckSquare,
  History,
  MessageSquare,
  UserCheck,
  HelpCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
  Sparkles,
  ShieldCheck,
  Send,
  Eye,
  PlusCircle,
} from 'lucide-react';
import { ScreenId } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    currentUser,
    currentScreen,
    setScreen,
    workspaceMode,
    setWorkspaceMode,
    logout,
    posts,
    leads,
  } = useApp();

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'specialist';

  // Badges calculation
  const pendingApprovalsCount = posts.filter((p) => p.status === 'Pending Approval').length;
  const unreadWhatsAppCount = leads.filter((l) => l.unreadCount > 0).length || 5;

  const handleNavClick = (screen: ScreenId) => {
    setScreen(screen);
  };

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0 overflow-y-auto select-none">
      <div>
        {/* Logo & Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
              M
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-slate-900 leading-tight">
                Mohd Digital
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {isAdmin ? 'Agency Director' : 'Client Portal'}
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Selector */}
        <div className="px-4 py-3">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            Active Workspace
          </label>
          <div className="relative">
            <select
              value={workspaceMode}
              onChange={(e) => setWorkspaceMode(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs font-semibold text-slate-800 hover:bg-slate-100 focus:border-indigo-500 focus:outline-none transition cursor-pointer"
            >
              <option value="Agency Admin">Agency Admin (Console)</option>
              <option value="City Care Clinic">City Care Clinic (Client)</option>
              <option value="FitZone Fitness Studio">FitZone Fitness Studio</option>
              <option value="Spice Garden Restaurant">Spice Garden Restaurant</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Navigation Sections */}
        {isAdmin ? (
          <div className="px-3 py-2 space-y-6">
            {/* MAIN */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Main
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('admin-overview')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-overview'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-clients')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-clients'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>Clients</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-clients')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Users className="h-4 w-4" />
                  <span>Employees</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-clients')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Assignments</span>
                </button>
              </nav>
            </div>

            {/* SOCIAL & CONTENT */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Social & Content
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('admin-posts')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Social Accounts</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-posts')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-posts'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4" />
                    <span>Posts</span>
                  </div>
                </button>
                <button
                  onClick={() => handleNavClick('admin-composer')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-composer'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>New Composer</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-approvals')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-approvals'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className="h-4 w-4" />
                    <span>Post Approvals</span>
                  </div>
                  <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {pendingApprovalsCount}
                  </span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-posts')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <History className="h-4 w-4" />
                  <span>Publishing History</span>
                </button>
              </nav>
            </div>

            {/* ENGAGEMENT */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Engagement
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('admin-whatsapp')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    currentScreen === 'admin-whatsapp'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <span>WhatsApp Inbox</span>
                  </div>
                  <span className="rounded-full bg-teal-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {unreadWhatsAppCount}
                  </span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-whatsapp')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-whatsapp')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Enquiries</span>
                </button>
              </nav>
            </div>

            {/* ANALYTICS */}
            <div>
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Analytics
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => handleNavClick('client-analytics')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Reports</span>
                </button>
              </nav>
            </div>
          </div>
        ) : (
          /* CLIENT WORKSPACE NAVIGATION (Matching Screen 3, 7, 8, 9, 10, 11) */
          <div className="px-3 py-2 space-y-4">
            <nav className="space-y-1">
              <button
                onClick={() => handleNavClick('client-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  currentScreen === 'client-dashboard'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => handleNavClick('client-posts')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  currentScreen === 'client-posts'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span>My Posts</span>
                </div>
                <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  2
                </span>
              </button>
              <button
                onClick={() => handleNavClick('client-review-detail')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  currentScreen === 'client-review-detail'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="h-4 w-4" />
                <span>Review & Approvals</span>
              </button>
              <button
                onClick={() => handleNavClick('client-leads')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  currentScreen === 'client-leads'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4" />
                  <span>My Enquiries</span>
                </div>
                <span className="rounded-full bg-indigo-100 text-indigo-700 px-1.5 py-0.5 text-[10px] font-bold">
                  3
                </span>
              </button>
              <button
                onClick={() => handleNavClick('client-analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
                  currentScreen === 'client-analytics'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>My Reports</span>
              </button>
              <button
                onClick={() => alert('Social accounts connected: Instagram Business (@citycareclinic_official) & WhatsApp Business (+91 98201 44521)')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Share2 className="h-4 w-4" />
                  <span>Social Accounts</span>
                </div>
                <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                  Connected
                </span>
              </button>
              <button
                onClick={() => alert('Profile & Business Info: City Care Clinic, Bandra West, Mumbai.')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                <Building2 className="h-4 w-4" />
                <span>Profile & Business Info</span>
              </button>
            </nav>

            {/* Assigned Specialist Card */}
            <div className="p-3 mx-1 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Assigned Specialist
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
              </div>
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Rahul Sharma"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-semibold text-slate-800">Rahul Sharma</div>
                  <div className="text-[10px] text-slate-500">Sr. Strategist</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Settings & Logout */}
      <div className="p-4 border-t border-slate-100 space-y-1">
        <button
          onClick={() => alert('System Settings: Node.js Express REST API, Webhooks v19.0, Persistent SQLite Database connection.')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
        >
          <Settings className="h-4 w-4 text-slate-400" />
          <span>Settings</span>
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="h-4 w-4 text-rose-500" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

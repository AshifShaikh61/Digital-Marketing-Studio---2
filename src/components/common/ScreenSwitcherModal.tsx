import React from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import {
  X,
  Layers,
  Shield,
  Briefcase,
  UserCheck,
  Check,
  ExternalLink,
} from 'lucide-react';

interface ScreenDef {
  id: ScreenId;
  number: number;
  title: string;
  category: 'Auth' | 'Admin' | 'Client';
  description: string;
  badge: string;
}

const SCREENS: ScreenDef[] = [
  {
    id: 'login',
    number: 1,
    title: 'Enterprise B2B Login Portal',
    category: 'Auth',
    description: 'Agency Staff and Client Portal sign-in with 1-click demo credentials and secure role-based session control.',
    badge: 'Auth',
  },
  {
    id: 'admin-overview',
    number: 2,
    title: 'Agency Executive Overview',
    category: 'Admin',
    description: 'Executive command center with Q2 KPIs, marketing vs leads chart, live WhatsApp stream, and infrastructure health.',
    badge: 'Admin',
  },
  {
    id: 'admin-clients',
    number: 3,
    title: 'Client Management & Directory',
    category: 'Admin',
    description: '18 Retainer accounts portfolio, channel connectivity donut chart, staff capacity distribution, and onboarding checklists.',
    badge: 'Admin',
  },
  {
    id: 'admin-posts',
    number: 4,
    title: 'Post Management & Editorial Calendar',
    category: 'Admin',
    description: '142 Scheduled Instagram posts across clinics/gyms/restaurants, view switcher, token failure alerts with retry.',
    badge: 'Admin',
  },
  {
    id: 'admin-approvals',
    number: 5,
    title: 'Post Approvals & Client Sign-Off Queue',
    category: 'Admin',
    description: 'Critical SLA queue, bulk approval actions, live Instagram Reel inspector, and client feedback history.',
    badge: 'Admin',
  },
  {
    id: 'admin-composer',
    number: 6,
    title: 'Instagram Post Composer Studio',
    category: 'Admin',
    description: '4-step post creation wizard with AI Polish, hashtag bundles, pre-flight audits, and live mobile phone preview.',
    badge: 'Admin',
  },
  {
    id: 'admin-whatsapp',
    number: 7,
    title: 'WhatsApp Multi-Client Hub (Unified Inbox)',
    category: 'Admin',
    description: '3-channel synchronized WhatsApp live stream, conversational chat thread, quick canned templates, and CRM dossier.',
    badge: 'Admin',
  },
  {
    id: 'client-dashboard',
    number: 8,
    title: 'Client Portal Business Dashboard',
    category: 'Client',
    description: 'Dr. Alok Mehta overview: pending approvals, weekly lead vs posts chart, next scheduled release, and dedicated agency squad.',
    badge: 'Client',
  },
  {
    id: 'client-posts',
    number: 9,
    title: 'My Posts & Creative Catalog',
    category: 'Client',
    description: 'Catalog of 34 client creatives with status tabs (Pending, Scheduled, Published), and urgent ad-hoc brief request banner.',
    badge: 'Client',
  },
  {
    id: 'client-review-detail',
    number: 10,
    title: 'Single Post Review & Sign-Off Detail',
    category: 'Client',
    description: 'Post #IG-9839 interactive 3-slide carousel, doctor pin hotspot, legal & clinical sign-off checklist, and revision chat.',
    badge: 'Client',
  },
  {
    id: 'client-leads',
    number: 11,
    title: 'Patient Enquiries & WhatsApp Leads CRM',
    category: 'Client',
    description: 'Lead tracking table & kanban, conversion pipeline, and interactive doctor consultation scheduler with instant WhatsApp invite.',
    badge: 'Client',
  },
  {
    id: 'client-analytics',
    number: 12,
    title: 'Monthly Marketing Performance & ROI Analytics',
    category: 'Client',
    description: '₹45k ad spend vs ₹2.84L pipeline attribution, CPL trends, campaign roster breakdown, and strategist monthly advisory playbook.',
    badge: 'Client',
  },
];

export const ScreenSwitcherModal: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    isSwitcherOpen,
    setIsSwitcherOpen,
    currentUser,
    setWorkspaceMode,
    loginAs,
  } = useApp();

  if (!isSwitcherOpen) return null;

  const handleSelect = (s: ScreenDef) => {
    if (s.category === 'Auth') {
      setScreen('login');
    } else if (s.category === 'Admin') {
      if (currentUser?.role === 'client') {
        loginAs('admin');
      } else {
        setWorkspaceMode('Agency Admin');
      }
      setScreen(s.id);
    } else {
      if (currentUser?.role !== 'client') {
        loginAs('client');
      } else {
        setWorkspaceMode('City Care Clinic');
      }
      setScreen(s.id);
    }
    setIsSwitcherOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                12 Screens Directory & Instant Switcher
              </h2>
              <p className="text-xs text-slate-500">
                Exact 12 screen layouts requested with Login, Admin Console, and Client Portal views
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSwitcherOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Categories */}
          {(['Auth', 'Admin', 'Client'] as const).map((cat) => {
            const list = SCREENS.filter((s) => s.category === cat);
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      cat === 'Auth'
                        ? 'bg-amber-100 text-amber-800'
                        : cat === 'Admin'
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {cat === 'Auth' ? '1. Authentication' : cat === 'Admin' ? '2. Agency Admin Workspace (6 Screens)' : '3. Client Portal Workspace (5 Screens)'}
                  </span>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {list.map((screen) => {
                    const isCurrent = currentScreen === screen.id;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => handleSelect(screen)}
                        className={`text-left p-4 rounded-xl border transition flex items-start justify-between group ${
                          isCurrent
                            ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-700 font-mono">
                              #{screen.number}
                            </span>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {screen.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">
                            {screen.description}
                          </p>
                        </div>
                        {isCurrent ? (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-600 transition">
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>
            You can also toggle between Agency and Client views anytime from the left sidebar workspace selector.
          </span>
          <button
            onClick={() => setIsSwitcherOpen(false)}
            className="rounded-lg bg-slate-900 px-4 py-1.5 font-semibold text-white hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

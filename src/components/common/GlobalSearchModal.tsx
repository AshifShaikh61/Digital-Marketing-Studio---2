import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Building2, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import { ScreenId } from '../../types';

export const GlobalSearchModal: React.FC = () => {
  const {
    isGlobalSearchOpen,
    setIsGlobalSearchOpen,
    clients,
    posts,
    leads,
    setScreen,
    setSelectedPostId,
    setSelectedLeadId,
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isGlobalSearchOpen) return null;

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.principal.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.clientName.toLowerCase().includes(query.toLowerCase()) ||
    p.postCode.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLeads = leads.filter((l) =>
    l.name.toLowerCase().includes(query.toLowerCase()) ||
    l.treatmentInterest.toLowerCase().includes(query.toLowerCase()) ||
    l.phone.includes(query)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a client, post, patient lead, or command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsGlobalSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4 text-xs">
          {/* Clients */}
          {filteredClients.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                Clients ({filteredClients.length})
              </div>
              <div className="space-y-1">
                {filteredClients.slice(0, 3).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setScreen('admin-clients');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">
                        {c.shortCode}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{c.name}</div>
                        <div className="text-[10px] text-slate-500">{c.principal} • {c.categoryLabel}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Posts */}
          {filteredPosts.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                Creatives & Posts ({filteredPosts.length})
              </div>
              <div className="space-y-1">
                {filteredPosts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPostId(p.id);
                      setScreen('admin-approvals');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-slate-400" />
                      <div>
                        <div className="font-semibold text-slate-900">
                          {p.postCode} {p.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {p.clientName} • {p.status}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                Patient Leads ({filteredLeads.length})
              </div>
              <div className="space-y-1">
                {filteredLeads.slice(0, 3).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setSelectedLeadId(l.id);
                      setScreen('client-leads');
                      setIsGlobalSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 text-left transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <MessageSquare className="h-4 w-4 text-emerald-500" />
                      <div>
                        <div className="font-semibold text-slate-900">{l.name}</div>
                        <div className="text-[10px] text-slate-500">{l.phone} • {l.treatmentInterest}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
          <span>Press ESC to close</span>
          <span>Mohd Digital Search Engine</span>
        </div>
      </div>
    </div>
  );
};

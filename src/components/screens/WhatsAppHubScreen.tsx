import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Phone,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  UserCheck,
  Check,
  CheckCheck,
  ExternalLink,
  ShieldCheck,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';

export const WhatsAppHubScreen: React.FC = () => {
  const {
    leads,
    selectedLeadId,
    setSelectedLeadId,
    sendWhatsAppMessage,
    updateLeadStatus,
  } = useApp();

  const [activeAccountTab, setActiveAccountTab] = useState('City Care Clinic');
  const [subFilter, setSubFilter] = useState<'all' | 'unread' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typedMessage, setTypedMessage] = useState('');

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeLead) return;
    sendWhatsAppMessage(activeLead.id, typedMessage);
    setTypedMessage('');
  };

  const insertTemplate = (templateText: string) => {
    setTypedMessage(templateText);
  };

  return (
    <div className="p-8 space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Engagement / WhatsApp Unified Inbox
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            WhatsApp Multi-Client Hub
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WhatsApp Cloud API: Live & Synced (3 Channels Connected)</span>
            <span className="text-emerald-500">•</span>
            <span className="font-mono text-[10px]">v19.0 Webhook</span>
          </div>
        </div>
      </div>

      {/* Account Switcher Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveAccountTab('All Accounts')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
            activeAccountTab === 'All Accounts'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Accounts <span className="text-[10px] opacity-80">(14 active)</span>
        </button>

        <button
          onClick={() => setActiveAccountTab('City Care Clinic')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
            activeAccountTab === 'City Care Clinic'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
          <span>City Care Clinic (Dr. Alok Mehta)</span>
          <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.2 text-[10px] font-bold">
            3 unread
          </span>
        </button>

        <button
          onClick={() => setActiveAccountTab('FitZone Fitness Studio')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
            activeAccountTab === 'FitZone Fitness Studio'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <span>FitZone Fitness Studio (Vikram M.)</span>
          <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.2 text-[10px] font-bold">
            1 unread
          </span>
        </button>

        <button
          onClick={() => setActiveAccountTab('Spice Garden Restaurant')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
            activeAccountTab === 'Spice Garden Restaurant'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
          <span>Spice Garden Restaurant</span>
        </button>
      </div>

      {/* 3-Column Layout: Conversations (3 cols) | Active Chat (6 cols) | CRM Profile (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {/* Left Column: Conversations List (3.5 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 flex flex-col h-full bg-slate-50/50">
          <div className="p-3.5 border-b border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Conversations</h3>
              <span className="font-mono text-[10px] text-slate-500">28 Total</span>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search phone, customer, or text..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
              <button
                onClick={() => setSubFilter('all')}
                className={`px-2.5 py-1 rounded-md transition ${subFilter === 'all' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200'}`}
              >
                All (28)
              </button>
              <button
                onClick={() => setSubFilter('unread')}
                className={`px-2.5 py-1 rounded-md transition ${subFilter === 'unread' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200'}`}
              >
                Unread (5)
              </button>
              <button
                onClick={() => setSubFilter('urgent')}
                className={`px-2.5 py-1 rounded-md transition ${subFilter === 'urgent' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200'}`}
              >
                Urgent (2)
              </button>
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {leads.map((lead) => {
              const isSelected = activeLead.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-3.5 cursor-pointer transition flex items-start gap-3 ${
                    isSelected ? 'bg-indigo-50/60 border-l-4 border-indigo-600' : 'hover:bg-slate-100/70'
                  }`}
                >
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shadow-2xs">
                      {lead.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    {lead.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                        {lead.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 truncate">{lead.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{lead.firstInquiryTime}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded truncate">
                        {lead.clientName}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate font-mono">
                        {lead.phone}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 truncate italic">
                      "{lead.lastMessageSnippet}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Active Chat Thread (5.5 cols) */}
        <div className="lg:col-span-5 flex flex-col h-full bg-slate-50/30">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                {activeLead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{activeLead.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{activeLead.phone}</span>
                </div>
                <div className="text-[10px] text-indigo-600 font-medium">
                  {activeLead.clientName} • Assigned: Rahul Sharma
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => updateLeadStatus(activeLead.id, 'Consultation Booked')}
                className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold hover:bg-emerald-100"
              >
                Mark Converted
              </button>
              <button className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100">
                <Phone className="h-3.5 w-3.5" />
              </button>
              <button className="p-1.5 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-100">
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Webhook Connectivity Strip */}
          <div className="bg-sky-50 px-4 py-1.5 border-b border-sky-100 text-[11px] text-sky-800 flex items-center justify-between font-mono">
            <span>✓ Connected via {activeLead.clientName} Official</span>
            <span>v19.0 Cloud API Webhook Active</span>
          </div>

          {/* Chat Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-center">
              <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                Today, 24 April 2025
              </span>
            </div>

            {/* Conversation Bubbles */}
            {activeLead.messages.map((msg) => {
              const isOutgoing = msg.sender === 'agent' || msg.sender === 'bot' || msg.sender === 'doctor';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}
                >
                  {msg.isTemplate && (
                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded px-1.5 py-0.2 mb-1">
                      🤖 Automated Clinic Response • Meta Verified Template
                    </span>
                  )}
                  <div
                    className={`max-w-md rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                      isOutgoing
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${
                        isOutgoing ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isOutgoing && <CheckCheck className="h-3 w-3 text-sky-300" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Template Buttons */}
          <div className="px-4 py-2 bg-white border-t border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" /> Quick Templates:
            </span>
            <button
              onClick={() =>
                insertTemplate(
                  'Hello! Dr. Alok Mehta has an open slot tomorrow at 4:00 PM for your dental and skin consultation. Would that work for you?'
                )
              }
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
            >
              Clinic Appointment Template
            </button>
            <button
              onClick={() =>
                insertTemplate(
                  'Hey there! Your 1-Day VIP Trial Pass at FitZone Fitness is active! Show this text at the front desk.'
                )
              }
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
            >
              Gym Free Day Pass
            </button>
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
                <Paperclip className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
                <Smile className="h-4 w-4" />
              </button>
              <input
                type="text"
                placeholder="Type a WhatsApp Cloud API reply..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                className="flex items-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition shadow-xs"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between pt-2 text-[10px] text-slate-400 font-mono">
              <span>Instant Meta Cloud API Dispatch • 256-bit WABA encrypted</span>
              <span>Client: {activeLead.clientName}</span>
            </div>
          </form>
        </div>

        {/* Right Column: CRM Profile & Lead Detail (3 cols) */}
        <div className="lg:col-span-3 border-l border-slate-200 bg-white p-5 space-y-5 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              CRM Profile & Lead Detail
            </h4>
            <span className="rounded bg-indigo-100 text-indigo-700 px-2 py-0.5 text-[10px] font-bold">
              VIP Lead
            </span>
          </div>

          {/* Profile Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-0.5 shadow-md">
              <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-indigo-700 text-base">
                {activeLead.name.split(' ').map((n) => n[0]).join('')}
              </div>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{activeLead.name}</h3>
            <div className="font-mono text-xs text-slate-500">{activeLead.phone}</div>
            <div className="text-[11px] text-slate-400">{activeLead.location}</div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => window.open(`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                className="py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                WhatsApp Web
              </button>
              <button
                onClick={() => alert(`Calling ${activeLead.phone} via telephony bridge...`)}
                className="py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs"
              >
                Call Direct
              </button>
            </div>
          </div>

          {/* Business Context */}
          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Business Context
            </span>
            <div className="flex justify-between">
              <span className="text-slate-500">Client Account:</span>
              <strong className="text-indigo-600">{activeLead.clientName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="text-slate-800">{activeLead.clientCategory}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Specialist:</span>
              <span className="text-slate-800">{activeLead.assignedTo}</span>
            </div>
          </div>

          {/* Lead Pipeline Stage */}
          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Lead Pipeline Stage
            </span>
            <select
              value={activeLead.status}
              onChange={(e) =>
                updateLeadStatus(activeLead.id, e.target.value as any)
              }
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-800"
            >
              <option value="New">New Enquiry</option>
              <option value="Follow-up Required">Follow-up Required</option>
              <option value="Consultation Booked">Consultation Booked</option>
              <option value="Dropped / Inactive">Dropped / Inactive</option>
            </select>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Lead Source:</span>
                <span className="rounded bg-indigo-100 text-indigo-700 px-1.5 font-bold">
                  {activeLead.campaignAttribution}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SLA Priority:</span>
                <span className="text-rose-600 font-bold">High (Within 24h SLA)</span>
              </div>
            </div>
          </div>

          {/* Enquiry Details */}
          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Enquiry Details
            </span>
            <div className="text-slate-700 font-medium">
              Service of Interest:
              <div className="text-slate-900 font-bold mt-0.5">{activeLead.treatmentInterest}</div>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Est. Revenue:</span>
              <strong className="text-emerald-600 font-tabular font-bold">
                ₹{activeLead.estimatedRevenue.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

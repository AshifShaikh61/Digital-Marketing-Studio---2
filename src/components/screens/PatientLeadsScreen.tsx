import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  Share2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  MoreVertical,
  CalendarCheck,
  Send,
  Plus,
  Check,
} from 'lucide-react';
import { WhatsAppLead } from '../../types';

export const PatientLeadsScreen: React.FC = () => {
  const { leads, selectedLeadId, setSelectedLeadId, scheduleAppointment, addInternalNote } = useApp();

  const [activeTab, setActiveTab] = useState<string>('All Leads');
  const [viewFormat, setViewFormat] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('Hydra-Glow Clinical Facial (45 min)');
  const [selectedDate, setSelectedDate] = useState('2025-04-25');
  const [selectedTime, setSelectedTime] = useState('04:00 PM');
  const [noteInput, setNoteInput] = useState('');

  const activeLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const handleConfirmAppointment = () => {
    scheduleAppointment(activeLead.id, selectedDate, selectedTime, selectedService);
    alert(`Consultation booked for ${activeLead.name}! WhatsApp confirmation invite sent via Meta Cloud API.`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteInput.trim()) return;
    addInternalNote(activeLead.id, noteInput);
    setNoteInput('');
  };

  return (
    <div className="p-8 space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-1">
            <span>Client Workspace</span>
            <span>&gt;</span>
            <span className="text-indigo-600 font-semibold">My Enquiries & Patient CRM</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Patient Enquiries & WhatsApp Leads
            </h1>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Meta Webhook • +91 98201 44521
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track incoming patient consultation requests generated via click-to-WhatsApp social campaigns and convert them into clinic appointments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>This Month (April 2025)</span>
          </div>
          <button
            onClick={() => alert('Exporting all patient CRM leads to CSV...')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL ENQUIRIES */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Enquiries</span>
            <span className="rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[10px] font-bold">
              +24% this mo
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">84</span>
            <span className="text-xs text-slate-500 ml-1.5">patients</span>
          </div>
          <div className="text-[11px] text-slate-400">From social ads & organic</div>
        </div>

        {/* NEW / ACTION REQUIRED */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>New / Action Required</span>
            <span className="rounded bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.2 text-[10px] font-bold">
              Needs reply
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">12</span>
            <span className="text-xs text-slate-500 ml-1.5">in queue</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Avg wait time: 14 mins
          </div>
        </div>

        {/* CONSULTATION BOOKED */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Consultation Booked</span>
            <span className="rounded bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 text-[10px] font-bold">
              57.1% rate
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">48</span>
            <span className="text-xs text-slate-500 ml-1.5">confirmed</span>
          </div>
          <div className="text-[11px] text-slate-400">Confirmed clinic visits</div>
        </div>

        {/* PIPELINE EST REVENUE */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pipeline Est. Revenue</span>
            <span className="rounded bg-slate-100 text-slate-700 px-1.5 py-0.2 text-[10px] font-bold">
              Avg ₹5,910 / pt
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">
              ₹2,84,000
            </span>
          </div>
          <div className="text-[11px] text-slate-400">Dermatology & Dental care</div>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
            {[
              { id: 'All Leads', count: 84 },
              { id: 'New Enquiries', count: 12 },
              { id: 'Follow-up Required', count: 18 },
              { id: 'Consultation Booked', count: 48 },
              { id: 'Dropped / Inactive', count: 6 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md transition ${
                  activeTab === tab.id ? 'bg-white text-indigo-700 shadow-2xs font-bold' : ''
                }`}
              >
                {tab.id} <span className="text-[10px] opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewFormat('table')}
              className={`px-3 py-1 rounded-md transition ${viewFormat === 'table' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewFormat('kanban')}
              className={`px-3 py-1 rounded-md transition ${viewFormat === 'kanban' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600'}`}
            >
              Kanban Board
            </button>
          </div>
        </div>

        {/* Search & Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient name, phone (+91...), or treatment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 focus:outline-none"
            />
          </div>

          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs">
            <option>All Treatments (Dental, Hydra-Glow, Ortho)</option>
            <option>Hydra-Glow Facial</option>
            <option>Invisible Aligners / Ortho</option>
            <option>Root Canal & Crown</option>
            <option>Single Tooth Implant</option>
          </select>

          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs">
            <option>All Sources (Ads, Reels, Meta Webhook)</option>
            <option>Hydra-Glow Ad #IG-9839</option>
            <option>Invisible Braces Carousel</option>
            <option>Root Canal Reel</option>
          </select>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Table (7 cols) / Right Consultation Drawer (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Patient Leads Table */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3.5">Patient & Contact</th>
                  <th className="py-3 px-3.5">Ad Campaign & Treatment</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => {
                  const isSelected = activeLead.id === lead.id;
                  const isNew = lead.status === 'New';
                  const isBooked = lead.status === 'Consultation Booked';

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Patient & Contact */}
                      <td className="py-3 px-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-slate-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                            {lead.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900">{lead.name}</span>
                              {isNew && <span className="h-2 w-2 rounded-full bg-rose-500"></span>}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              {lead.phone} • {lead.location}
                            </div>
                            <div className="text-[10px] text-slate-500 italic truncate max-w-xs">
                              "{lead.lastMessageSnippet}"
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Ad Campaign & Treatment */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-800 text-xs">
                          {lead.treatmentInterest}
                        </div>
                        <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
                          {lead.campaignAttribution}
                        </div>
                        <div className="text-[10px] text-slate-400">{lead.firstInquiryTime} via WhatsApp</div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isNew
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isBooked
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isNew ? 'bg-rose-500' : isBooked ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          ></span>
                          {lead.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3.5 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLeadId(lead.id);
                            }}
                            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100"
                          >
                            <MessageSquare className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedLeadId(lead.id);
                            }}
                            className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px]"
                          >
                            Book
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>Showing 1 to 6 of 84 patient leads</div>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-6 w-6 rounded bg-indigo-600 text-white font-bold text-xs">
                1
              </button>
              <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs">
                2
              </button>
              <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs">
                3
              </button>
              <span>...</span>
              <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs">
                14
              </button>
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: CRM Profile, Schedule Consultation & Clinic Notes (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white shadow-2xs p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md">
                {activeLead.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{activeLead.name}</h3>
                  <span className="rounded bg-rose-100 text-rose-700 px-1.5 text-[9px] font-bold">
                    {activeLead.status}
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-500">{activeLead.phone}</div>
                <div className="text-[10px] text-slate-400">{activeLead.location}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.open(`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                className="px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold text-xs flex items-center gap-1 shadow-2xs"
              >
                <MessageSquare className="h-3 w-3" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => alert(`Dialing patient ${activeLead.phone}...`)}
                className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
              >
                <Phone className="h-3 w-3" />
                <span>Call</span>
              </button>
            </div>
          </div>

          {/* Campaign Attribution */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Campaign Attribution:</span>
              <span className="rounded bg-purple-100 text-purple-800 px-1.5 py-0.2 font-bold text-[10px]">
                Meta Paid
              </span>
            </div>
            <div className="font-semibold text-slate-800">{activeLead.campaignAttribution}</div>
            <div className="text-[10px] text-slate-400">
              First Inquired: Today, 24 Apr 2025 at 10:14 AM • Assigned: Rahul Sharma (Mohd Digital)
            </div>
          </div>

          {/* Incoming WhatsApp Text Preview */}
          <div className="p-3 rounded-lg border border-slate-200 bg-white space-y-1 text-xs">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <MessageSquare className="h-3 w-3 text-emerald-600" />
                Incoming WhatsApp Query
              </span>
              <span>10:14 AM</span>
            </div>
            <p className="text-slate-700 italic">
              "{activeLead.lastMessageSnippet}"
            </p>
          </div>

          {/* Schedule Consultation Form (Dr. Alok Mehta) */}
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>Schedule Consultation</span>
              </h4>
              <span className="rounded bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5">
                Dr. Alok Mehta
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-800"
                >
                  <option>Hydra-Glow Clinical Facial (45 min)</option>
                  <option>Dental Root Canal Diagnostic Scan</option>
                  <option>Invisible Orthodontic Assessment</option>
                  <option>Laser Dermis Infusion</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleConfirmAppointment}
                className="w-full py-2.5 mt-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <CalendarCheck className="h-3.5 w-3.5" />
                <span>Confirm & Send WhatsApp Invite</span>
              </button>
            </div>
          </div>

          {/* Internal Clinic Notes */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-800 block">Internal Clinic Notes</span>
            {activeLead.doctorNotes && (
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 text-[11px]">
                <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                  <strong>Dr. Alok Mehta</strong>
                  <span>Today, 10:20 AM</span>
                </div>
                <p className="italic">{activeLead.doctorNotes}</p>
              </div>
            )}

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add clinical note or follow-up note..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Conversion Optimization Banner */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-600 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Need help optimizing lead conversion rate?</h4>
            <p className="text-[11px] text-indigo-100">
              Your Mohd Digital strategist Rahul Sharma is monitoring your WhatsApp API webhook response latency.
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Reviewing automated bot routing rules')}
          className="px-4 py-2 rounded-lg bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition shadow-2xs whitespace-nowrap"
        >
          Review WhatsApp Automation
        </button>
      </div>
    </div>
  );
};

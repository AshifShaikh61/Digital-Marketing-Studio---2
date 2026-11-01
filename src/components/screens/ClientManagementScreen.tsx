import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Share2,
  AlertTriangle,
  ChevronRight,
  ExternalLink,
  Users,
  Shield,
  ArrowUpDown,
  Building,
  Dumbbell,
  Utensils,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { ClientAccount } from '../../types';

export const ClientManagementScreen: React.FC = () => {
  const { clients, setScreen, setWorkspaceMode, loginAs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState<'All' | 'Active' | 'Onboarding' | 'Paused'>('All');
  const [industryFilter, setIndustryFilter] = useState<'All' | 'Clinics' | 'Gyms' | 'Restaurants'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter clients
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusTab === 'All' || c.accountState === statusTab;
    const matchesIndustry =
      industryFilter === 'All' ||
      (industryFilter === 'Clinics' && c.category === 'Clinic') ||
      (industryFilter === 'Gyms' && c.category === 'Gym') ||
      (industryFilter === 'Restaurants' && c.category === 'Restaurant');
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const handleClientRowClick = (client: ClientAccount) => {
    // Jump directly to this client's view in Client Portal
    setWorkspaceMode(client.name);
    setScreen('client-dashboard');
  };

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <span>ENTERPRISE PORTFOLIO</span>
            <span>•</span>
            <span>18 Retainer Accounts</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Client Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage registered client businesses, assigned marketing specialists, and active engagement channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting full client directory to CSV format...')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Directory (CSV)</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Add New Client</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ACTIVE RETAINERS */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ACTIVE RETAINERS</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">16</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <span>↗ 94% retention rate</span>
          </div>
        </div>

        {/* ONBOARDING PIPELINE */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ONBOARDING PIPELINE</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">2</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-600">
            <span>⏳ SLA within 48h</span>
          </div>
        </div>

        {/* SCHEDULED / LIVE POSTS */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>SCHEDULED / LIVE POSTS</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Share2 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">184</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <span>Across 36 handles</span>
          </div>
        </div>

        {/* PENDING APPROVALS */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>PENDING APPROVALS</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">9</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-600">
            <span>! 3 require client input</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client business name, owner, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none shadow-2xs"
            />
            <button className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600">
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 self-start lg:self-auto">
            {(['All', 'Active', 'Onboarding', 'Paused'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusTab(tab)}
                className={`px-3 py-1.5 rounded-md transition ${
                  statusTab === tab ? 'bg-white text-indigo-700 shadow-2xs' : 'hover:text-slate-900'
                }`}
              >
                {tab} {tab === 'Active' ? '(16)' : tab === 'Onboarding' ? '(2)' : tab === 'Paused' ? '(0)' : ''}
              </button>
            ))}
          </div>

          {/* Specialist Dropdown */}
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs focus:outline-none">
              <option>Assigned Specialist: All</option>
              <option>Rahul Sharma (6)</option>
              <option>Priya Kumar (7)</option>
              <option>Arjun Patel (5)</option>
            </select>
          </div>
        </div>

        {/* Industry Filter Chips & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider mr-1">Industry:</span>
            <button
              onClick={() => setIndustryFilter('All')}
              className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                industryFilter === 'All'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Types <span className="text-[10px] bg-indigo-100 px-1 rounded-full">18</span>
            </button>
            <button
              onClick={() => setIndustryFilter('Clinics')}
              className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                industryFilter === 'Clinics'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Building className="h-3 w-3" />
              Clinics <span className="text-[10px] text-slate-400">6</span>
            </button>
            <button
              onClick={() => setIndustryFilter('Gyms')}
              className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                industryFilter === 'Gyms'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Dumbbell className="h-3 w-3" />
              Gyms & Fitness <span className="text-[10px] text-slate-400">6</span>
            </button>
            <button
              onClick={() => setIndustryFilter('Restaurants')}
              className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                industryFilter === 'Restaurants'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Utensils className="h-3 w-3" />
              Restaurants & Cafes <span className="text-[10px] text-slate-400">6</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>Sort by:</span>
            <button className="font-semibold text-slate-800 flex items-center gap-1 hover:text-indigo-600">
              Recently Added <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Clients Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Business & Principal</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Marketing Specialist</th>
                <th className="py-3 px-4 text-center">Active Channels</th>
                <th className="py-3 px-4 text-center">Content Output</th>
                <th className="py-3 px-4 text-right">Account State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  onClick={() => handleClientRowClick(client)}
                  className="hover:bg-indigo-50/40 cursor-pointer transition group"
                >
                  {/* Business & Principal */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-xs ${client.avatarBg} shadow-2xs group-hover:scale-105 transition-transform`}
                      >
                        {client.shortCode}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {client.name}
                          </span>
                          <span className="rounded bg-slate-100 text-slate-600 px-1.5 py-0.2 text-[10px] font-semibold">
                            {client.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {client.principal} • {client.principalTitle}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-800 font-mono text-[11px]">{client.email}</div>
                    <div className="text-slate-400 font-mono text-[10px]">{client.phone}</div>
                  </td>

                  {/* Specialist */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={client.specialist.avatarUrl}
                        alt={client.specialist.name}
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="font-semibold text-slate-900">{client.specialist.name}</div>
                        <div className="text-[10px] text-slate-500">{client.specialist.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Active Channels */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 text-[10px] font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
                        IG {client.activeChannels.instagram}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        WA {client.activeChannels.whatsapp}
                      </span>
                    </div>
                  </td>

                  {/* Content Output */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="font-tabular font-bold text-slate-800">
                      {client.contentOutput.published} <span className="font-normal text-slate-500 text-[10px]">pub</span>
                    </div>
                    <div className="text-[10px] text-indigo-600 font-medium">
                      {client.contentOutput.inReview > 0
                        ? `${client.contentOutput.inReview} in review`
                        : client.contentOutput.pending > 0
                        ? `${client.contentOutput.pending} pending`
                        : `${client.contentOutput.setupDrafts || 0} setup drafts`}
                    </div>
                  </td>

                  {/* Account State */}
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        client.accountState === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          client.accountState === 'Active' ? 'bg-emerald-500' : 'bg-purple-500'
                        }`}
                      ></span>
                      {client.accountState}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Showing 1 to {filteredClients.length} of 18 clients
          </div>
          <div className="flex items-center gap-2">
            <span>Per page:</span>
            <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <div className="flex items-center gap-1 ml-2">
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button className="h-6 w-6 rounded bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </button>
              <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs flex items-center justify-center">
                2
              </button>
              <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs flex items-center justify-center">
                3
              </button>
              <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Insight Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: Channel Connectivity */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Channel Connectivity</h4>
                <p className="text-[11px] text-slate-500">Live social & messaging API linkages</p>
              </div>
              <span className="rounded bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 text-[10px] font-bold">
                94% Healthy
              </span>
            </div>

            <div className="flex items-center gap-6 py-2">
              {/* Donut representation */}
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-indigo-600 bg-slate-50">
                <div className="text-center">
                  <div className="text-lg font-extrabold text-slate-900 font-tabular">34</div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase">Active Pipes</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span>Instagram Graph (18/18)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500"></span>
                  <span>WhatsApp Cloud (16/18)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                  <span>Meta Ads Sync (Pending 2)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Webhook uptime 99.98%</span>
            <button
              onClick={() => alert('Diagnostics: All Meta Graph Tokens active. WABA webhook roundtrip 14ms.')}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Diagnostics →
            </button>
          </div>
        </div>

        {/* Panel 2: Staff Allocation */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Staff Allocation</h4>
                <p className="text-[11px] text-slate-500">Capacity & account distribution</p>
              </div>
              <Users className="h-4 w-4 text-slate-400" />
            </div>

            <div className="space-y-3 py-1">
              {/* Rahul */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Rahul Sharma • 6 Accounts</span>
                  <span className="font-bold text-slate-700">85% Capacity</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              {/* Priya */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Priya Kumar • 7 Accounts</span>
                  <span className="font-bold text-rose-600">92% Capacity</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-rose-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Arjun */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">Arjun Patel • 5 Accounts</span>
                  <span className="font-bold text-slate-700">68% Capacity</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Team aggregate target: 20 slots</span>
            <button
              onClick={() => alert('Rebalance accounts across creative pods.')}
              className="font-semibold text-indigo-600 hover:underline"
            >
              Rebalance →
            </button>
          </div>
        </div>

        {/* Panel 3: Onboarding Attention */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-purple-50 text-purple-600">⚡</span>
                <h4 className="text-xs font-bold text-slate-900">Onboarding Attention</h4>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
              2 client businesses are currently awaiting WhatsApp Cloud API verification numbers and brand guidelines signoff.
            </p>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">PowerFit Gym</span>
                <span className="text-[10px] text-purple-700 font-medium">Meta Business ID pending</span>
              </div>
              <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Urban Bites Cafe</span>
                <span className="text-[10px] text-indigo-700 font-medium">Menu Creative Pack upload</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Opening onboarding verification checklists for pending retainers.')}
            className="w-full mt-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 py-2 text-xs font-semibold text-indigo-700 transition"
          >
            View Checklists
          </button>
        </div>
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Onboard New Retainer Client</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Business Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Orthopedics & Sports Clinic"
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Industry Sector</label>
                  <select className="w-full rounded-lg border border-slate-200 p-2 text-xs">
                    <option>Clinic / Healthcare</option>
                    <option>Gym / Fitness Center</option>
                    <option>Restaurant / Hospitality</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Assigned Specialist</label>
                  <select className="w-full rounded-lg border border-slate-200 p-2 text-xs">
                    <option>Rahul Sharma (Sr. Strategist)</option>
                    <option>Priya Kumar (Creative Lead)</option>
                    <option>Arjun Patel (Growth Lead)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Principal Contact & Phone</label>
                <input
                  type="text"
                  placeholder="Dr. Rajesh / +91 98000 00000"
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Client added to SQL Server database dbo.Clients successfully!');
                  setIsAddModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Provision Client Retainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

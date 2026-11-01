import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPAIGNS } from '../../data/mockData';
import {
  Download,
  Calendar,
  Clock,
  Eye,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Phone,
  Play,
  ArrowRight,
  ShieldCheck,
  Share2,
  Sparkles,
} from 'lucide-react';

export const MonthlyAnalyticsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');
  const [searchCampaign, setSearchCampaign] = useState('');

  const filteredCampaigns = CAMPAIGNS.filter((c) => {
    const matchesTab = activeTab === 'All' || c.status === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchCampaign.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-1">
            <span>Client Workspace</span>
            <span>/</span>
            <span className="text-indigo-600 font-semibold">Marketing Reports & Analytics</span>
            <span>•</span>
            <span className="text-slate-400">Meta Graph & WhatsApp Cloud API Synced • 1h ago</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Monthly Marketing Performance & ROI Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Transparent monthly reporting on creative reach, Meta ad spend, patient leads, and revenue attribution crafted by Mohd Digital.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>April 2025 (Month to Date)</span>
          </div>

          <button
            onClick={() => alert('Exporting raw analytics dataset to CSV')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Raw Data (CSV)</span>
          </button>

          <button
            onClick={() => alert('Generating Executive PDF Report with signed ROI attribution...')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Executive PDF Report</span>
          </button>
        </div>
      </div>

      {/* 4 Top Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL REACH */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Reach & Impressions</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">
              148,200
            </span>
            <span className="text-xs text-slate-400 ml-1.5">Impressions</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +32.4% MoM vs March
            </span>
            <span className="text-slate-400 font-mono text-[10px]">94,500 Unique</span>
          </div>
        </div>

        {/* META AD SPEND */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Meta Ad Spend & Efficiency</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">
              ₹45,000
            </span>
            <span className="text-xs text-slate-400 ml-1.5">Utilized</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -18% CPL Cost
            </span>
            <span className="text-slate-500 font-mono text-[10px]">₹535.70 / lead</span>
          </div>
        </div>

        {/* PATIENT INQUIRIES & BOOKINGS */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Patient Inquiries & Bookings</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">84</span>
            <span className="text-xs text-emerald-600 font-semibold ml-1.5">WhatsApp Leads</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-emerald-600">+24% MoM</span>
            <span className="text-slate-600 font-medium">48 Consultations (57.1%)</span>
          </div>
        </div>

        {/* ATTRIBUTED PIPELINE VALUE */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Attributed Pipeline Value</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">
              ₹2,84,000
            </span>
            <span className="text-xs text-slate-400 ml-1.5">Gross</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="rounded bg-indigo-100 text-indigo-800 font-extrabold px-1.5 py-0.2 text-[10px]">
              6.3x ROAS
            </span>
            <span className="text-slate-500">38 Completed Treatments</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Weekly Inflow vs Ad Spend (7 cols) & Treatment Demand Breakdown (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Inflow vs Meta Ad Spend */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Weekly Lead Inflow vs Meta Ad Spend
                </h3>
                <p className="text-[11px] text-slate-500">
                  Tracking ad spend pace against patient appointment inquiries per week.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <span className="h-3 w-3 rounded-xs bg-indigo-600"></span>
                  Ad Spend (₹)
                </span>
                <span className="flex items-center gap-1.5 text-sky-600">
                  <span className="h-3 w-3 rounded-xs bg-sky-400"></span>
                  WhatsApp Leads
                </span>
              </div>
            </div>

            {/* Custom Dual Bar & Line representation */}
            <div className="relative h-44 flex items-end justify-between px-10 border-b border-slate-200 py-6 my-2">
              {[
                { week: 'W1 (1-7)', spend: '₹9.2k', spendHeight: 90, leads: 18, leadsHeight: 75 },
                { week: 'W2 (8-14)', spend: '₹11.4k', spendHeight: 110, leads: 24, leadsHeight: 100 },
                { week: 'W3 (15-21)', spend: '₹12.1k', spendHeight: 120, leads: 26, leadsHeight: 115 },
                { week: 'W4 (22-28)', spend: '₹12.3k', spendHeight: 122, leads: 16, leadsHeight: 70 },
              ].map((w) => (
                <div key={w.week} className="flex flex-col items-center gap-2 group relative">
                  <div className="flex items-end gap-2">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-mono font-bold text-indigo-700 mb-1">
                        {w.spend}
                      </span>
                      <div
                        style={{ height: `${w.spendHeight}px` }}
                        className="w-7 rounded-t-sm bg-indigo-600/90 hover:bg-indigo-700 transition"
                      ></div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-mono font-bold text-sky-600 mb-1">
                        {w.leads}
                      </span>
                      <div
                        style={{ height: `${w.leadsHeight}px` }}
                        className="w-7 rounded-t-sm bg-sky-400 hover:bg-sky-500 transition"
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{w.week}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Efficiency Trend: <strong className="text-slate-800">Weekly CPL consistently decreased from ₹657 to ₹473.</strong>
            </span>
            <span className="font-mono text-[10px] text-slate-400">Paced for ₹50,000 monthly cap</span>
          </div>
        </div>

        {/* Right: Treatment Demand & Revenue Pipeline */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Treatment Demand & Revenue</h3>
                <p className="text-[11px] text-slate-500">Inquiries, consultations, and attributed pipeline</p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                4 Procedures
              </span>
            </div>

            <div className="space-y-4">
              {/* Hydra-Glow */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Hydra-Glow Facial & Skin</span>
                  <span className="text-indigo-600 font-bold font-tabular">₹1,14,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>38 WhatsApp Leads</span>
                  <span>24 Treatments Completed</span>
                </div>
              </div>

              {/* Dental Implants */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Dental Implants</span>
                  <span className="text-indigo-600 font-bold font-tabular">₹98,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>22 WhatsApp Leads</span>
                  <span>14 Consultations Scheduled</span>
                </div>
              </div>

              {/* Invisible Braces */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Invisible Braces / Ortho</span>
                  <span className="text-indigo-600 font-bold font-tabular">₹54,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>16 WhatsApp Leads</span>
                  <span>8 Intraoral Scans Booked</span>
                </div>
              </div>

              {/* General Dental */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">General Dental & Hygiene</span>
                  <span className="text-indigo-600 font-bold font-tabular">₹18,000</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>8 WhatsApp Leads</span>
                  <span>6 Appointments Done</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Highest Margin: Dental Implants (₹44,500/case)</span>
            <strong className="text-indigo-600">Top Volume: Hydra-Glow</strong>
          </div>
        </div>
      </div>

      {/* Campaign & Creative Performance Roster Table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Campaign & Creative Performance Roster
            </h3>
            <p className="text-[11px] text-slate-500">
              Individual Meta Ads Manager performance metrics and WhatsApp conversion tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaign or creative..."
                value={searchCampaign}
                onChange={(e) => setSearchCampaign(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
              {(['All', 'Active', 'Completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded-md transition ${activeTab === tab ? 'bg-white text-indigo-700 shadow-2xs' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-y border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Campaign / Creative</th>
                <th className="py-2.5 px-3">Format</th>
                <th className="py-2.5 px-3 text-right">Spend</th>
                <th className="py-2.5 px-3 text-right">Reach</th>
                <th className="py-2.5 px-3 text-right">Clicks</th>
                <th className="py-2.5 px-3 text-center">WhatsApp Leads</th>
                <th className="py-2.5 px-3 text-center">Bookings</th>
                <th className="py-2.5 px-3 text-right">Cost / Lead</th>
                <th className="py-2.5 px-3 text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-tabular">
              {filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900">{camp.name}</div>
                    <div className="text-[10px] text-slate-400 font-sans">
                      Targeting: {camp.name.includes('Skin') ? 'Women 24-45 • 5km Clinic Radius' : 'Adults 30-58 • Higher Income Segment'}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700 font-sans">
                      {camp.format}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-medium text-slate-800">
                    ₹{camp.spend.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {camp.reach.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600">
                    {camp.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-indigo-600">{camp.leads}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-emerald-600">{camp.bookings}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-slate-900">
                    ₹{camp.costPerLead.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-emerald-600 font-sans">
                    {camp.roi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Active Ad Sets: 3 Meta Campaigns • Avg Link CTR: 2.84%</span>
          <span>Lead-to-Booking Conversion: 57.1% • Meta Ads Account ID: act_489218201844</span>
        </div>
      </div>

      {/* Secondary Metrics Row (3 cards: Instagram Growth, Top Organic Asset, WhatsApp SLA) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Instagram Growth */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Share2 className="h-3.5 w-3.5 text-indigo-600" /> Instagram Growth
            </span>
            <span className="rounded bg-indigo-50 text-indigo-700 font-bold text-[10px] px-1.5 py-0.2">
              +6.4%
            </span>
          </div>
          <div className="text-2xl font-bold font-tabular text-slate-900">+850</div>
          <div className="text-xs text-slate-500">Net Followers (April)</div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Total Community: 14,240 Patients</span>
            <strong>4.6% ER</strong>
          </div>
        </div>

        {/* Top Organic Asset */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Top Organic Asset</span>
            <span className="rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] px-1.5 py-0.2">
              14 Direct Leads
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-10 w-10 rounded bg-slate-900 shrink-0 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80"
                alt="Reel"
                className="h-full w-full object-cover"
              />
              <Play className="absolute inset-0 m-auto h-3 w-3 text-white fill-current" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                Debunking 5 Sunscreen Myths...
              </h5>
              <div className="text-[10px] text-slate-500">Doctor educational reel video</div>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex justify-between font-tabular">
            <span>412 Likes</span>
            <span>28 Comments</span>
            <span>63 Shares</span>
          </div>
        </div>

        {/* Clinic WhatsApp SLA */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-emerald-600" /> Clinic WhatsApp SLA
            </span>
            <span className="rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] px-1.5 py-0.2">
              Healthy
            </span>
          </div>
          <div className="text-2xl font-bold font-tabular text-slate-900">14 min</div>
          <div className="text-xs text-slate-500">Average First Response</div>
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
            <span>Within 30 Min Target:</span>
            <strong className="text-emerald-600">88% of Patient Chats</strong>
          </div>
        </div>
      </div>

      {/* Strategist Advisory & Next Month Playbook */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50/70 via-white to-indigo-50/40 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-600 text-white text-xs">📍</span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Strategist Advisory & Next Month Playbook
                </h4>
                <span className="text-[10px] text-indigo-700 font-bold">
                  May 2025 Plan • Prepared by Rahul Sharma • Sr. Marketing Strategist, Mohd Digital
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic bg-white/70 p-3 rounded-xl border border-indigo-100">
              "Dr. Mehta, the shift toward Hydra-Glow summer aesthetics coupled with your direct sunscreen reel generated our lowest cost-per-lead (₹486 and ₹425) in clinic history. Patient booking conversion was especially strong (57.1%), demonstrating that video formats featuring you build instant medical credibility."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 flex items-center gap-1">
                  <span>1. Budget Reallocation</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Shift +₹8,000 to Hydra-Glow carousels and launch Mother's Day Clinic Vouchers.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 flex items-center gap-1">
                  <span>2. Automated Reminders</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Activate WhatsApp automated slot notifications for weekend dental checkups.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="font-bold text-indigo-700 flex items-center gap-1">
                  <span>3. 2 New Video Shoots</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Shoot short reels on "Root Canal Myths" and "Teeth Whitening Safety" with Dr. Mehta.
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="w-full lg:w-72 shrink-0 rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Rahul"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-bold text-slate-900">Rahul Sharma</div>
                <div className="text-[10px] text-slate-500">Dedicated Strategist</div>
                <div className="text-[9px] text-emerald-600 font-semibold">Available Mon - Sat</div>
              </div>
            </div>

            <button
              onClick={() => alert('Booking 30-min strategy review call with Rahul Sharma')}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition"
            >
              Schedule Strategy Call
            </button>

            <button
              onClick={() => alert('Creative cut request sent to video editor')}
              className="w-full py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              Request Custom Cut
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] text-emerald-700 font-medium">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              <span>Verified Mohd Digital Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

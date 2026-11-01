import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Building,
  Briefcase,
  Send,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Plus,
  Play,
  ArrowRight,
} from 'lucide-react';

export const AgencyOverviewScreen: React.FC = () => {
  const { setScreen, setSelectedPostId, posts, leads, clients } = useApp();
  const [selectedMonthRange, setSelectedMonthRange] = useState('Last 30 Days');

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Top Command Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            EXECUTIVE COMMAND / Q2 Agency Run-Rate
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Agency Executive Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, Mohd Farhan. Client social queues and WhatsApp Cloud pipelines are active with 8 actions pending.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedMonthRange}
              onChange={(e) => setSelectedMonthRange(e.target.value)}
              className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 focus:outline-none cursor-pointer"
            >
              <option>Last 30 Days</option>
              <option>This Quarter (Q2)</option>
              <option>Year to Date</option>
            </select>
            <Calendar className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => setScreen('admin-composer')}
            className="flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 text-xs font-semibold text-indigo-700 transition shadow-2xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Create Post</span>
          </button>

          <button
            onClick={() => setScreen('admin-clients')}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ New Client</span>
          </button>
        </div>
      </div>

      {/* 6 Top Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* TOTAL CLIENTS */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>TOTAL CLIENTS</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">18</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+2 this mo</span>
            <span className="text-slate-300 ml-auto font-mono text-[9px]">~~~</span>
          </div>
        </div>

        {/* ACTIVE CLIENTS */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ACTIVE CLIENTS</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">16</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            Clinics: 6 • Gyms: 5 • Food: 5
          </div>
        </div>

        {/* TEAM MEMBERS */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>TEAM MEMBERS</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">7</span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium flex items-center justify-between">
            <span>3 Mktg • 2 Des • 2 Tech</span>
            <span className="text-indigo-600 font-bold">100% cap</span>
          </div>
        </div>

        {/* POSTS PUBLISHED */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>POSTS PUBLISHED</span>
            <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <Send className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">142</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+18% MoM</span>
            <span className="text-slate-300 ml-auto font-mono text-[9px]">~~~</span>
          </div>
        </div>

        {/* APPROVALS QUEUE */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>APPROVALS QUEUE</span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">8</span>
            <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[10px] font-bold text-rose-700">
              Action Needed
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-medium">
            3 client feedback requests
          </div>
        </div>

        {/* WHATSAPP ENQUIRIES */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>WHATSAPP ENQUIRIES</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">384</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span>+24% MoM</span>
            <span className="text-slate-300 ml-auto font-mono text-[9px]">~~~</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart (8 cols) & Live WhatsApp Enquiries Stream (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Marketing Activity & WhatsApp Growth Bar Chart */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  PERFORMANCE VELOCITY
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Marketing Activity & WhatsApp Growth
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-indigo-600"></span>
                  <span>Posts Published</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-xs bg-sky-400"></span>
                  <span>WhatsApp Leads</span>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                  6 Months
                </span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="py-8">
              <div className="relative h-48 flex items-end justify-between px-6 border-b border-slate-200">
                {/* Horizontal gridlines */}
                <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-100"></div>
                <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-100"></div>

                {/* Bars */}
                {[
                  { month: 'Nov', posts: 65, leads: 50 },
                  { month: 'Dec', posts: 82, leads: 70 },
                  { month: 'Jan', posts: 95, leads: 88 },
                  { month: 'Feb', posts: 110, leads: 104 },
                  { month: 'Mar', posts: 128, leads: 120 },
                  { month: 'Apr (Now)', posts: 142, leads: 138, active: true },
                ].map((item) => (
                  <div key={item.month} className="flex flex-col items-center gap-2 group relative">
                    {item.active && (
                      <div className="absolute -top-10 bg-slate-900 text-white text-[10px] font-semibold font-mono py-1 px-2 rounded shadow-md whitespace-nowrap">
                        142 Posts / 384 Leads
                      </div>
                    )}
                    <div className="flex items-end gap-1.5">
                      <div
                        style={{ height: `${(item.posts / 150) * 160}px` }}
                        className={`w-6 rounded-t-sm transition-all duration-300 ${
                          item.active ? 'bg-indigo-600' : 'bg-indigo-500/80 hover:bg-indigo-600'
                        }`}
                      ></div>
                      <div
                        style={{ height: `${(item.leads / 150) * 160}px` }}
                        className={`w-6 rounded-t-sm transition-all duration-300 ${
                          item.active ? 'bg-sky-400' : 'bg-sky-400/80 hover:bg-sky-500'
                        }`}
                      ></div>
                    </div>
                    <span
                      className={`text-xs ${
                        item.active ? 'font-bold text-indigo-700' : 'text-slate-500'
                      }`}
                    >
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Conversion Rate: <strong className="text-slate-800">19.4% Avg.</strong>
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-indigo-600">
              <Clock className="h-3.5 w-3.5" />
              API Latency: <strong>18ms via ASP.NET Web API</strong>
            </span>
          </div>
        </div>

        {/* Right: Live Stream: WhatsApp Customer Enquiries */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  LIVE STREAM
                </span>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
                Cloud API
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-2 mb-4">
              WhatsApp Customer Enquiries
            </h3>

            {/* Stream List */}
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Amit Verma</span>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.2 rounded">
                      City Care Clinic
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">2m ago</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 italic">
                  "Hi, is Dr. Kapoor available tomorrow at 4 PM for dental root canal checkup? Please confirm charges."
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-emerald-700 font-medium">✓ Auto-routed to clinic desk</span>
                  <button
                    onClick={() => setScreen('admin-whatsapp')}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Sneha Reddy</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded">
                      FitZone Fitness
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">11m ago</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 italic">
                  "Saw your Instagram reel for the Summer Shred program. Do you have couple memberships with locker access?"
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500 font-medium">✓ Assigned: Priya K.</span>
                  <button
                    onClick={() => setScreen('admin-whatsapp')}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Reply
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Karthik Raj</span>
                    <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-100 px-1.5 py-0.2 rounded">
                      Spice Garden
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">27m ago</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 italic">
                  "Want to reserve an outdoor gazebo table for family dinner this Friday evening for 6 adults."
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500 font-medium">✓ WhatsApp Bot: Booking draft</span>
                  <button
                    onClick={() => setScreen('admin-whatsapp')}
                    className="font-semibold text-indigo-600 hover:underline"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen('admin-whatsapp')}
            className="w-full mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition pt-2 border-t border-slate-100"
          >
            <span>Open WhatsApp Unified Inbox (5 unread)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Lower Section: Multi-Location Operations Table (8 cols) & Top Performing Clients (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Table */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                MULTI-LOCATION OPERATIONS
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Recent Client Social & Campaign Performance
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Filtering client workspaces')}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              >
                <Filter className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => alert('Exporting CSV directory')}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Client Name & Sector</th>
                  <th className="py-2.5 px-3">Account Manager</th>
                  <th className="py-2.5 px-3 text-right">Posts (Mo)</th>
                  <th className="py-2.5 px-3 text-center">Enquiries</th>
                  <th className="py-2.5 px-3 text-center">Instagram Health</th>
                  <th className="py-2.5 px-3 text-center">WhatsApp Cloud</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.slice(0, 4).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${c.avatarBg}`}
                        >
                          {c.shortCode}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-400">{c.categoryLabel}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold text-slate-600">
                          {c.specialist.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <span className="text-slate-700 font-medium">{c.specialist.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-tabular font-bold text-slate-800">
                      {c.contentOutput.published}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 font-bold font-tabular text-[11px]">
                        {c.leadsCount} Leads
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {c.igHealth}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Connected
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Showing 4 of 18 managed client workspaces</span>
            <button
              onClick={() => setScreen('admin-clients')}
              className="font-semibold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <span>View All Client Accounts</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Right: Top Performing Clients ranking */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Top Performing Clients
              </h3>
              <span className="text-xs font-semibold text-slate-400">This Month</span>
            </div>

            <div className="space-y-4">
              {/* #1 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-600">#1</span>
                    <span className="text-xs font-bold text-slate-900">FitZone Fitness</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">+34.8% ROI</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>112 leads acquired</span>
                  <span>Conversion: 28%</span>
                </div>
              </div>

              {/* #2 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-600">#2</span>
                    <span className="text-xs font-bold text-slate-900">City Care Clinic</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">+29.2% ROI</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>84 leads acquired</span>
                  <span>Conversion: 24%</span>
                </div>
              </div>

              {/* #3 */}
              <div className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-600">#3</span>
                    <span className="text-xs font-bold text-slate-900">Spice Garden</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-600">+21.5% ROI</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>76 leads acquired</span>
                  <span>Conversion: 19%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Pending Post Approvals (8 cols) & Infrastructure Health (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Post Approvals Cards */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Pending Post Approvals</h3>
              <span className="rounded-full bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.5 text-[10px] font-bold">
                8 Awaiting Review
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="relative h-36 bg-slate-900">
                  <img
                    src={post.mediaUrls[0]}
                    alt={post.title}
                    className="h-full w-full object-cover opacity-90"
                  />
                  <span className="absolute top-2 left-2 rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-white">
                    {post.clientName}
                  </span>
                  <span className="absolute bottom-2 left-2 rounded bg-indigo-600/90 text-white text-[10px] px-2 py-0.5 font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.urgentSla || 'Scheduled Soon'}
                  </span>
                </div>
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{post.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 italic">
                      "{post.caption.slice(0, 70)}..."
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">By {post.creatorName}</span>
                    <button
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setScreen('admin-approvals');
                      }}
                      className="rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3 py-1 text-[11px] font-bold text-white transition flex items-center gap-1"
                    >
                      <span>Review & Notify</span>
                      <Play className="h-3 w-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Infrastructure Health */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">Infrastructure Health</h3>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All Systems Normal
              </span>
            </div>

            <div className="space-y-3">
              {/* ASP.NET Core */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-indigo-100 text-indigo-700 font-bold text-xs">
                    C#
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">ASP.NET Core Web API</div>
                    <div className="text-[10px] text-slate-500">Core Microservices Backend</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-mono font-bold text-slate-800">
                  18ms <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
              </div>

              {/* Meta Graph */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-blue-100 text-blue-700 font-bold text-xs">
                    IG
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Meta Instagram Graph</div>
                    <div className="text-[10px] text-slate-500">v19.0 API Connector</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Connected
                </span>
              </div>

              {/* WhatsApp Cloud API */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-emerald-100 text-emerald-700 font-bold text-xs">
                    WA
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">WhatsApp Cloud API</div>
                    <div className="text-[10px] text-slate-500">Webhook Listener Sync</div>
                  </div>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Healthy
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-mono">
            SSL Certified • 99.98% Uptime Last 90 Days
          </div>
        </div>
      </div>
    </div>
  );
};

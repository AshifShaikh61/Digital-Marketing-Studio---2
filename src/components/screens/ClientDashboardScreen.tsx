import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Users,
  Image,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  Check,
  Play,
  ShieldCheck,
  ChevronRight,
  Zap,
} from 'lucide-react';

export const ClientDashboardScreen: React.FC = () => {
  const { setScreen, setSelectedPostId, setSelectedLeadId, approvePost, requestChanges, posts, leads } = useApp();

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Welcome & Command Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-1">
            <span>Portal</span>
            <span>&gt;</span>
            <span className="text-indigo-600 font-semibold">Business Dashboard</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome back, Dr. Alok Mehta
            </h1>
            <CheckCircle2 className="h-6 w-6 text-indigo-600 fill-indigo-100" />
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Here is your live marketing performance, pending creative sign-offs, and WhatsApp patient enquiries for City Care Clinic.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>This Month (April 2025)</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px]">
              RS
            </span>
            <div className="text-left text-[11px]">
              <div className="text-[9px] text-slate-400">Account Strategist</div>
              <strong className="text-slate-800">Rahul Sharma</strong>
            </div>
          </div>

          <button
            onClick={() => setScreen('client-posts')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>Review Pending Posts (2)</span>
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
          </button>
        </div>
      </div>

      {/* 5 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Posts */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Posts</span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Image className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">34</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+6 scheduled this month</span>
          </div>
        </div>

        {/* Published Posts */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Published Posts</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">28</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600">
            ✓ 100% on-time via API
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pending Approvals</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">2</span>
          </div>
          <div className="text-[11px] font-semibold text-amber-700">
            • Needs sign-off by 6:00 PM
          </div>
        </div>

        {/* WhatsApp Enquiries */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>WhatsApp Enquiries</span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">84</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+24% high intent patients</span>
          </div>
        </div>

        {/* Instagram Followers */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Instagram Followers</span>
            <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">14.2k</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-600">
            <strong className="text-emerald-600">+850</strong> this month • 4.6% ER
          </div>
        </div>
      </div>

      {/* Action Required: 2 Creatives Awaiting Approval */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-amber-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 className="text-sm font-bold text-slate-900">
              Action Required: 2 Creatives Awaiting Approval
            </h3>
          </div>
          <button
            onClick={() => setScreen('client-posts')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>View All Approvals</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Creative 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="relative h-28 w-28 shrink-0 rounded-lg overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80"
                  alt="Hydra-Glow"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.2 text-[9px] font-mono text-white">
                  3 Slides
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                    Scheduled: Tomorrow, 11:00 AM IST
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Carousel</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Hydra-Glow Summer Skin Treatment
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                  "Restore deep hydration and protect your skin moisture barrier against harsh summer sun..."
                </p>
                <div className="text-[10px] text-slate-400">
                  Crafted by <strong className="text-slate-700">Priya Kumar</strong> (Agency Lead)
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setScreen('client-review-detail')}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Request Changes
              </button>
              <button
                onClick={() => {
                  approvePost('post-9839');
                  alert('Hydra-Glow Creative approved for scheduled release!');
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-xs"
              >
                Approve & Schedule
              </button>
            </div>
          </div>

          {/* Creative 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3 flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="relative h-28 w-28 shrink-0 rounded-lg overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80"
                  alt="Dental Implants"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.2 text-[9px] font-mono text-white">
                  1:1 Feed Post
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-bold">
                    Scheduled: 26 Apr, 10:00 AM IST
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Single Image</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Dental Implants & Invisible Aligners Awareness
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                  "Confused between smile solutions? Here is our comprehensive orthodontics breakdown..."
                </p>
                <div className="text-[10px] text-slate-400">
                  Crafted by <strong className="text-slate-700">Rahul Sharma</strong> (Sr. Strategist)
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => alert('Changes requested for post')}
                className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Request Changes
              </button>
              <button
                onClick={() => {
                  approvePost('post-9828');
                  alert('Dental Implants creative approved!');
                }}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-xs"
              >
                Approve & Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart (8 cols) & Next Release / Channel Status (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Chart */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Marketing Activity & Patient Lead Acquisition
                </h3>
                <p className="text-[11px] text-slate-500">
                  Weekly correlation between social media publishing cadence and incoming WhatsApp clinic inquiries.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-indigo-700">
                  <span className="h-3 w-3 rounded-xs bg-indigo-600"></span>
                  Posts Published
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="h-3 w-3 rounded-xs bg-emerald-500"></span>
                  Patient Enquiries
                </span>
              </div>
            </div>

            {/* Top Funnel Strip */}
            <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-slate-50 rounded-xl text-center text-xs">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Published Content</div>
                <div className="font-extrabold text-slate-900 font-tabular text-base mt-0.5">28 Posts Live</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Direct Consults</div>
                <div className="font-extrabold text-emerald-600 font-tabular text-base mt-0.5">84 WhatsApp Leads</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase">Conversion Efficiency</div>
                <div className="font-extrabold text-indigo-600 font-tabular text-base mt-0.5">19.4% Booking Rate</div>
              </div>
            </div>

            {/* Weekly Bars */}
            <div className="relative h-44 flex items-end justify-between px-10 border-b border-slate-200 py-4">
              {[
                { week: 'Week 1 (1-7 Apr)', posts: 6, leads: 18 },
                { week: 'Week 2 (8-14 Apr)', posts: 8, leads: 24 },
                { week: 'Week 3 (15-21 Apr)', posts: 7, leads: 26 },
                { week: 'Week 4 (Active)', posts: 7, leads: 16, active: true },
              ].map((w) => (
                <div key={w.week} className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-2">
                    <div
                      style={{ height: `${w.posts * 14}px` }}
                      className="w-8 rounded-t-sm bg-indigo-600"
                    ></div>
                    <div
                      style={{ height: `${w.leads * 4.5}px` }}
                      className="w-8 rounded-t-sm bg-emerald-500"
                    ></div>
                  </div>
                  <span className={`text-xs ${w.active ? 'font-bold text-indigo-600' : 'text-slate-500'}`}>
                    {w.week}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Top Content ROI: <strong className="text-slate-700">Educational Carousels (+42% reach)</strong> • Doctor Intro Reels
            </span>
            <span className="font-mono text-[10px] text-slate-400">Data verified via Meta Cloud API</span>
          </div>
        </div>

        {/* Right: Next Scheduled Release & Channel Status */}
        <div className="lg:col-span-4 space-y-4">
          {/* Card 1: Next Scheduled Release */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-600 text-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-indigo-200 text-xs">
              <span className="font-bold uppercase tracking-wider text-[10px]">NEXT SCHEDULED RELEASE</span>
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold tracking-tight">Tomorrow at 11:00 AM IST</div>
              <p className="text-xs text-indigo-100 mt-1">
                Hydra-Glow Summer Treatment (3-Slide Carousel) awaiting final Dr. Alok sign-off.
              </p>
            </div>
            <button
              onClick={() => {
                approvePost('post-9839');
                alert('Fast approved! Creative scheduled.');
              }}
              className="w-full py-2 rounded-lg bg-white text-indigo-900 font-bold text-xs hover:bg-indigo-50 transition shadow-xs"
            >
              Fast Approve Now
            </button>
          </div>

          {/* Card 2: Channel Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Channel Status</h4>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                All Systems Normal
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">@citycareclinic_official</div>
                  <div className="text-[10px] text-slate-400">API: Meta Graph v19.0 • 14.2k Fans</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Connected
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800">+91 98201 44521</div>
                  <div className="text-[10px] text-slate-400">Official Clinic WABA • Response &lt; 3 mins</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Webhook Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Customer Enquiries (8 cols) & Dedicated Squad (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer Enquiries Table */}
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Recent Customer Enquiries (WhatsApp Cloud API)
              </h3>
              <p className="text-[11px] text-slate-500">
                Live incoming consultation queries captured automatically via click-to-WhatsApp social ad campaigns.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Downloading lead inquiries CSV')}
                className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-3 w-3" />
                <span>Download CSV</span>
              </button>
              <button
                onClick={() => setScreen('client-leads')}
                className="rounded-lg bg-indigo-50 text-indigo-700 px-3 py-1.5 text-xs font-bold hover:bg-indigo-100"
              >
                Open All (84)
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                    {lead.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{lead.name}</span>
                      <span className="font-mono text-[10px] text-slate-500">{lead.phone}</span>
                      <span className="rounded bg-sky-100 text-sky-800 px-1.5 py-0.2 text-[9px] font-bold">
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1 italic mt-0.5">
                      "{lead.lastMessageSnippet}"
                    </p>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Source: {lead.campaignAttribution} • Assigned: {lead.assignedTo}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedLeadId(lead.id);
                    setScreen('client-leads');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shrink-0 shadow-2xs"
                >
                  Reply on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Your Dedicated Squad */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Your Dedicated Squad</h4>
              <p className="text-[10px] text-slate-400">Mohd Digital Agency Account Team</p>
            </div>
            <span className="rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5">
              Assigned
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Rahul"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Rahul Sharma</div>
                  <div className="text-[10px] text-slate-500">Account Manager & Sr. Strategist</div>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Priya"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Priya Kumar</div>
                  <div className="text-[10px] text-slate-500">Content & Creative Lead</div>
                </div>
              </div>
              <span className="text-[10px] font-medium text-slate-400">Creative Desk</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
            🛡️ Monthly retainer covers comprehensive creative design, meta ad spends, and HIPAA-compliant patient messaging routing.
          </div>
        </div>
      </div>
    </div>
  );
};

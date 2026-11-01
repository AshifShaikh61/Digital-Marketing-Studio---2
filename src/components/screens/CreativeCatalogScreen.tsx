import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  Check,
  X,
  Play,
  Heart,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Send,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ZoomIn,
} from 'lucide-react';
import { PostItem } from '../../types';

export const CreativeCatalogScreen: React.FC = () => {
  const { posts, setScreen, setSelectedPostId, approvePost, requestChanges } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Scheduled' | 'Published' | 'Changes'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedService, setSelectedService] = useState('All Treatments & Services');

  const clientPosts = posts.filter((p) => p.clientId === 'client-citycare');

  const filtered = clientPosts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Pending' && p.status === 'Pending Approval') ||
      (activeTab === 'Scheduled' && p.status === 'Scheduled') ||
      (activeTab === 'Published' && p.status === 'Published') ||
      (activeTab === 'Changes' && p.status === 'Changes Requested');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>CLIENT WORKSPACE</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              City Care Clinic Official
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            My Posts & Creative Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review marketing creatives, track scheduled deployments, and approve upcoming posts crafted by Mohd Digital for City Care Clinic.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting City Care Clinic editorial calendar to CSV...')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Editorial Log</span>
          </button>
          <button
            onClick={() => setScreen('client-review-detail')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-bold text-white shadow-xs transition"
          >
            <span>Review Pending Posts (2)</span>
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Creatives */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Creatives</span>
            <Layers className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">34</span>
            <span className="text-xs text-slate-500 ml-2">assets created</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-600">
            ↗ +8 new this month (Apr 2025)
          </div>
        </div>

        {/* Awaiting My Sign-Off */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-amber-900 text-xs font-semibold">
            <span>Awaiting My Sign-Off</span>
            <span className="rounded bg-amber-200 text-amber-900 px-1.5 py-0.2 text-[9px] font-bold">
              Action Required
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-amber-900 tracking-tight">02</span>
            <span className="text-xs text-amber-700 ml-2">pending doctor review</span>
          </div>
          <div className="text-[11px] font-semibold text-amber-800 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Next slot deployment in 18 hrs</span>
          </div>
        </div>

        {/* Scheduled */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Scheduled</span>
            <Send className="h-4 w-4 text-sky-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">04</span>
            <span className="text-xs text-slate-500 ml-2">in auto-queue</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-500">
            ✓ Meta Graph API connected
          </div>
        </div>

        {/* Published */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Published</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">28</span>
            <span className="text-xs text-emerald-700 ml-2 font-semibold">100% compliant</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-500">
            💬 1,240+ verified engagements
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-3">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
            {[
              { id: 'All', label: 'All Posts', count: 34 },
              { id: 'Pending', label: 'Pending My Approval', count: 2 },
              { id: 'Scheduled', label: 'Scheduled', count: 4 },
              { id: 'Published', label: 'Published', count: 28 },
              { id: 'Changes', label: 'Changes Requested', count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md transition ${
                  activeTab === tab.id
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                {tab.label} <span className="text-[10px] opacity-70">({tab.count})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs"
            >
              <option>All Formats</option>
              <option>Single Graphic</option>
              <option>Multi Carousel</option>
              <option>Reel Video</option>
            </select>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs"
            >
              <option>All Treatments & Services</option>
              <option>Hydra-Glow & Skin</option>
              <option>Dental & Orthodontics</option>
              <option>Sterilization & Hygiene</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by topic, caption, or hashtag (#SkinCare, #Dental)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 shadow-2xs"
          />
        </div>
      </div>

      {/* Main 6 Post Cards Grid (Matching screen_8c90a9e3.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientPosts.map((post) => {
          const isPending = post.status === 'Pending Approval';
          const isScheduled = post.status === 'Scheduled';
          const isPublished = post.status === 'Published';

          return (
            <div
              key={post.id}
              className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Image Container with Badges */}
              <div className="relative h-60 bg-slate-900 group overflow-hidden">
                <img
                  src={post.mediaUrls[0]}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Format pill */}
                <span className="absolute top-2.5 left-2.5 rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono text-white">
                  {post.formatLabel}
                </span>

                {/* Status indicator */}
                <div className="absolute top-2.5 right-2.5">
                  {isPending ? (
                    <span className="rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                      Awaiting Your Sign-Off
                    </span>
                  ) : isScheduled ? (
                    <span className="rounded-full bg-sky-500 text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                      Scheduled
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-bold shadow-xs">
                      Published
                    </span>
                  )}
                </div>

                {/* Zoom / preview icon */}
                <button
                  onClick={() => {
                    setSelectedPostId(post.id);
                    setScreen('client-review-detail');
                  }}
                  className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 text-white hover:bg-black transition"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>

                {/* Play icon overlay for reel */}
                {post.type === 'Reel Video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-10 w-10 rounded-full bg-white/80 flex items-center justify-center text-slate-900 shadow-md">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">
                      {isPending
                        ? `Scheduled: ${post.scheduledDate || 'Tomorrow'}, 11:00 AM`
                        : isScheduled
                        ? `Scheduled: ${post.scheduledDate || 'Sun, 28 Apr'} • 06:30 PM`
                        : `Published ${post.publishedTime || '22 Apr • 05:00 PM'}`}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {post.title.includes('Skin') ? 'Skin & Aesthetic' : 'Dental Care'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 italic">
                    "{post.caption}"
                  </p>
                </div>

                {/* Bottom stats or creator */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  {isPublished && post.likes && (
                    <div className="grid grid-cols-3 gap-2 py-1 text-center bg-slate-50 rounded-lg text-slate-700 font-tabular font-bold text-[11px]">
                      <div>
                        <div className="text-[9px] text-slate-400 font-normal">Likes</div>
                        {post.likes}
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 font-normal">Comments</div>
                        {post.comments}
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 font-normal">Leads (WA)</div>
                        <span className="text-emerald-600">{post.leadsGenerated}</span>
                      </div>
                    </div>
                  )}

                  {isScheduled && (
                    <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-medium">
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Approved by Dr. Alok Mehta on 23 Apr</span>
                    </div>
                  )}

                  {isPending && (
                    <div className="flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          approvePost(post.id);
                          alert('Creative approved for scheduled launch!');
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                      >
                        Approve Post
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setScreen('client-review-detail');
                        }}
                        className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                      >
                        Request Changes
                      </button>
                    </div>
                  )}

                  {isPending && (
                    <button
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setScreen('client-review-detail');
                      }}
                      className="w-full text-center text-[11px] text-slate-500 hover:text-indigo-600 pt-1"
                    >
                      👁 Quick Preview Slides
                    </button>
                  )}

                  {isScheduled && (
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                      <span>Scheduled for Peak Slot</span>
                      <div className="flex items-center gap-2">
                        <button className="hover:underline">Add Note</button>
                        <button
                          onClick={() => {
                            setSelectedPostId(post.id);
                            setScreen('client-review-detail');
                          }}
                          className="font-semibold text-indigo-600 hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )}

                  {isPublished && (
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <span className="text-emerald-600 font-medium">↗ Above avg engagement</span>
                      <button
                        onClick={() => setScreen('client-analytics')}
                        className="font-semibold text-indigo-600 hover:underline"
                      >
                        Insights
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-4 border-t border-slate-200">
        <div>Showing 1 to 6 of 34 posts</div>
        <div className="flex items-center gap-2">
          <span>Items per page:</span>
          <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
            <option>12</option>
            <option>24</option>
          </select>
          <div className="flex items-center gap-1 ml-2">
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
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
            <span>...</span>
            <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs flex items-center justify-center">
              6
            </button>
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner: Need an Unscheduled Urgent Announcement or Holiday Banner? */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-indigo-600 text-white text-xs">📢</span>
            <h3 className="text-sm font-bold text-slate-900">
              Need an Unscheduled Urgent Announcement or Holiday Banner?
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Submit custom creative briefs directly to your assigned strategist. Rush clinic notices (emergency hours, doctor conference leave, holiday clinic hours) are expedited within 4 working hours.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => window.open('https://wa.me/919820100000', '_blank')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp Rahul (+91 98201 00000)</span>
          </button>
          <button
            onClick={() => alert('Opening Custom Creative Brief Request Form')}
            className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

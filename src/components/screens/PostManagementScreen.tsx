import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Calendar,
  Grid,
  Table as TableIcon,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Share2,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Layers,
  Heart,
  MessageCircle,
  Eye,
  Check,
} from 'lucide-react';
import { PostItem } from '../../types';

export const PostManagementScreen: React.FC = () => {
  const { posts, setScreen, setSelectedPostId, retryPublish } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Posts');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClient = clientFilter === 'All Clients' || p.clientName.includes(clientFilter);
    const matchesStatus =
      statusFilter === 'All Posts' ||
      (statusFilter === 'Draft' && p.status === 'Draft') ||
      (statusFilter === 'Pending Approval' && p.status === 'Pending Approval') ||
      (statusFilter === 'Approved' && p.status === 'Approved') ||
      (statusFilter === 'Scheduled' && p.status === 'Scheduled') ||
      (statusFilter === 'Published' && p.status === 'Published') ||
      (statusFilter === 'Failed' && p.status === 'Dispatch Failed');
    return matchesSearch && matchesClient && matchesStatus;
  });

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            SOCIAL & CONTENT MANAGEMENT / POSTS
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Post Management & Editorial Calendar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize, schedule, approve, and publish Instagram content across all clinic, gym, and restaurant accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting all editorial schedules to CSV...')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Bulk Export CSV</span>
          </button>
          <button
            onClick={() => alert('Editorial calendar view active')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Calendar className="h-3.5 w-3.5 text-indigo-600" />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setScreen('admin-composer')}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>+ Create New Post</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL SCHEDULED */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Scheduled Posts</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">142</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <span>↗ +14.2% vs last month</span>
          </div>
        </div>

        {/* AWAITING CLIENT APPROVAL */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Awaiting Client Approval</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">9</span>
            <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[10px] font-bold text-rose-700">
              3 Urgent Signoffs
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Average review SLA: 4.8 hrs
          </div>
        </div>

        {/* PUBLISHED THIS MONTH */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Published This Month</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">86</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <span>✓ 100% Meta Graph API dispatch</span>
          </div>
        </div>

        {/* FAILED / ACTION NEEDED */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Failed / Action Needed</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">2</span>
            <span className="text-xs font-semibold text-rose-600">requires attention</span>
          </div>
          <div className="text-[11px] text-slate-500 truncate">
            1 token reconnect, 1 aspect error
          </div>
        </div>
      </div>

      {/* Filter and View Bar */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search caption text, client name, doctor/trainer tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Client selector */}
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-2xs focus:outline-none"
            >
              <option>All Clients</option>
              <option>City Care Clinic</option>
              <option>FitZone Fitness</option>
              <option>Spice Garden Restaurant</option>
              <option>Health First Dental</option>
              <option>PowerFit Gym</option>
            </select>

            {/* Platform chip */}
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs">
              <Share2 className="h-3.5 w-3.5 text-indigo-600" />
              <span>Instagram</span>
            </span>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs transition ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Grid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs transition ${
                  viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <TableIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
          {[
            { label: 'All Posts', count: 142 },
            { label: 'Draft', count: 12 },
            { label: 'Pending Approval', count: 9 },
            { label: 'Approved', count: 18 },
            { label: 'Scheduled', count: 24 },
            { label: 'Published', count: 76 },
            { label: 'Failed', count: 3 },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setStatusFilter(tab.label)}
              className={`px-3 py-1.5 rounded-md transition ${
                statusFilter === tab.label
                  ? 'bg-white text-indigo-700 shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
            >
              {tab.label} <span className="text-[10px] text-slate-400">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Posts Cards Grid (6 cards matching screen_8caa2c25.png) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => {
          const isFailed = post.status === 'Dispatch Failed';
          const isAwaiting = post.status === 'Pending Approval';
          const isPublished = post.status === 'Published';
          const isScheduled = post.status === 'Scheduled';
          const isApproved = post.status === 'Approved';
          const isDraft = post.status === 'Draft';

          return (
            <div
              key={post.id}
              className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition"
            >
              {/* Card Header */}
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{post.clientName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isPublished
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isScheduled
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : isApproved
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : isAwaiting
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : isFailed
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isPublished
                          ? 'bg-emerald-500'
                          : isScheduled
                          ? 'bg-sky-500'
                          : isApproved
                          ? 'bg-blue-500'
                          : isAwaiting
                          ? 'bg-amber-500'
                          : isFailed
                          ? 'bg-rose-500'
                          : 'bg-slate-400'
                      }`}
                    ></span>
                    {post.status}
                  </span>
                </div>
              </div>

              {/* Media Preview Box */}
              <div className="relative h-56 bg-slate-900 overflow-hidden group">
                <img
                  src={post.mediaUrls[0]}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Aspect Pill */}
                <span className="absolute top-2.5 left-2.5 rounded bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono text-white">
                  {post.formatLabel}
                </span>

                {/* Urgent badge if applicable */}
                {post.urgentSla && (
                  <span className="absolute top-2.5 right-2.5 rounded bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    Urgent SLA
                  </span>
                )}

                {/* Social stats overlay for published */}
                {isPublished && post.likes && (
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-3 rounded bg-black/70 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-white font-tabular">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      {post.likes.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5 text-slate-300" />
                      {post.comments}
                    </span>
                  </div>
                )}

                {/* Failed Alert Overlay */}
                {isFailed && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                    <div className="rounded-full bg-rose-500/20 p-2 text-rose-400 mb-2">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <h5 className="text-xs font-bold text-white">OAuth Token Expired</h5>
                    <p className="text-[10px] text-slate-300 mt-1 max-w-xs">
                      Meta Graph API requires clinic owner re-auth
                    </p>
                  </div>
                )}
              </div>

              {/* Caption & Hashtags */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{post.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {post.caption}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.hashtags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] text-indigo-600 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meta details & Authors */}
                <div className="pt-3 border-t border-slate-100 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Creator: {post.creatorName}</span>
                    <span className="font-semibold text-slate-800">
                      {post.scheduledTime || post.publishedTime || 'Draft'}
                    </span>
                  </div>

                  {isFailed && (
                    <div className="flex items-center justify-between text-rose-600 text-[10px] font-semibold">
                      <span>Error 190: Access token inactive</span>
                      <button className="underline">Resolve</button>
                    </div>
                  )}

                  {isApproved && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span>Approved by {post.approverName}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setScreen('admin-approvals');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPostId(post.id);
                        setScreen('admin-composer');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Edit
                    </button>

                    {isFailed ? (
                      <button
                        onClick={() => retryPublish(post.id)}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white transition shadow-xs"
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>Retry Publish</span>
                      </button>
                    ) : isAwaiting ? (
                      <button
                        onClick={() => {
                          setSelectedPostId(post.id);
                          setScreen('admin-approvals');
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-xs text-center"
                      >
                        Fast Approve
                      </button>
                    ) : isPublished ? (
                      <button
                        onClick={() => alert('Viewing Instagram post live on Meta CDN')}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-xs font-semibold text-indigo-700 transition text-center"
                      >
                        View Live
                      </button>
                    ) : (
                      <button
                        onClick={() => alert('Pushing creative to Meta queue...')}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-xs text-center"
                      >
                        Push
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-4 border-t border-slate-200">
        <div>Showing 1 - 6 of 142 total posts</div>
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <select className="rounded border border-slate-200 bg-white px-2 py-1 text-xs">
            <option>12</option>
            <option>24</option>
            <option>48</option>
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
            <span>...</span>
            <button className="h-6 w-6 rounded hover:bg-slate-200 font-medium text-xs flex items-center justify-center">
              24
            </button>
            <button className="p-1 rounded border border-slate-200 hover:bg-slate-100">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

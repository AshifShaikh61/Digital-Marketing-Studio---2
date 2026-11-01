import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Check,
  X,
  MessageSquare,
  Share2,
  Smartphone,
  ExternalLink,
  Search,
  Filter,
  Download,
  Play,
  Heart,
  Bookmark,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PostItem } from '../../types';

export const PostApprovalsScreen: React.FC = () => {
  const {
    posts,
    selectedPostId,
    setSelectedPostId,
    approvePost,
    rejectPost,
    requestChanges,
    addPostComment,
    setScreen,
  } = useApp();

  const [clientFilter, setClientFilter] = useState('All Accounts');
  const [subTab, setSubTab] = useState<'all' | 'urgent' | 'changes' | 'approved'>('all');
  const [checkedIds, setCheckedIds] = useState<string[]>(['post-9842', 'post-9839']);
  const [newComment, setNewComment] = useState('');

  // Find currently inspected post
  const activePost = posts.find((p) => p.id === selectedPostId) || posts[1] || posts[0];

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    checkedIds.forEach((id) => approvePost(id));
    alert(`Bulk approved ${checkedIds.length} posts! Meta Graph API scheduling dispatch complete.`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !activePost) return;
    addPostComment(activePost.id, newComment);
    setNewComment('');
  };

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <span>Social & Content</span>
            <span>/</span>
            <span>Post Approvals</span>
            <span className="rounded-full bg-rose-50 border border-rose-200 text-rose-700 px-2 py-0.2 text-[10px] font-bold">
              3 Urgent
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Post Approvals & Client Sign-Off Queue
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review submitted Instagram creatives, manage client revision requests, feedback comments, and dispatch one-click approvals before Graph API publishing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting approval audit logs...')}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition shadow-2xs"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export Approval Log</span>
          </button>
          <button
            onClick={() => setSubTab('urgent')}
            className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 text-xs font-semibold text-amber-800 transition shadow-2xs"
          >
            <Clock className="h-3.5 w-3.5 text-amber-700" />
            <span>Filter by Urgent SLA</span>
          </button>
          <button
            onClick={handleBulkApprove}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Bulk Approve Selected ({checkedIds.length})</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PENDING REVIEW */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>PENDING REVIEW</span>
            <span className="rounded bg-rose-100 text-rose-700 px-2 py-0.5 text-[10px] font-bold">
              3 Critical &lt; 4h
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">9</span>
          </div>
          <div className="text-[11px] text-slate-500">posts awaiting decision</div>
          <div className="w-full bg-slate-100 rounded-full h-1 mt-2">
            <div className="bg-rose-500 h-1 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* CHANGES REQUESTED */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>CHANGES REQUESTED</span>
            <span className="rounded bg-indigo-100 text-indigo-700 px-2 py-0.5 text-[10px] font-bold">
              Agency Action
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">4</span>
          </div>
          <div className="text-[11px] text-slate-500">drafts in revision</div>
          <div className="text-[10px] text-indigo-600 font-medium mt-1">
            ↻ 2 assigned to content writers
          </div>
        </div>

        {/* APPROVED TODAY */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>APPROVED TODAY</span>
            <span className="rounded bg-emerald-100 text-emerald-700 px-2 py-0.5 text-[10px] font-bold">
              Ready to Post
            </span>
          </div>
          <div className="my-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">14</span>
          </div>
          <div className="text-[11px] text-slate-500">creatives synchronized</div>
          <div className="text-[10px] text-emerald-600 font-medium mt-1">
            ✓ Queued for automated scheduling
          </div>
        </div>

        {/* AVG TURNAROUND */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>AVG. TURNAROUND</span>
            <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-bold">
              Meta SLA Target
            </span>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-tabular text-slate-900 tracking-tight">3.8 hrs</span>
            <span className="text-[10px] text-emerald-600 font-semibold">(-42m vs last wk)</span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            ✓ 98.2% on-time approvals
          </div>
        </div>
      </div>

      {/* Account filter pills & subtabs */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All Accounts (9)', 'City Care Clinic (2)', 'FitZone Fitness Studio (3)', 'Spice Garden Restaurant (2)', 'Health First Dental (2)'].map(
            (acc) => (
              <button
                key={acc}
                onClick={() => setClientFilter(acc)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  clientFilter === acc
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {acc}
              </button>
            )
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600 self-start sm:self-auto">
            <button
              onClick={() => setSubTab('all')}
              className={`px-3 py-1 rounded-md transition ${subTab === 'all' ? 'bg-white text-indigo-700 shadow-2xs' : ''}`}
            >
              All Pending (9)
            </button>
            <button
              onClick={() => setSubTab('urgent')}
              className={`px-3 py-1 rounded-md transition ${subTab === 'urgent' ? 'bg-white text-indigo-700 shadow-2xs' : ''}`}
            >
              Urgent / Expiring (3)
            </button>
            <button
              onClick={() => setSubTab('changes')}
              className={`px-3 py-1 rounded-md transition ${subTab === 'changes' ? 'bg-white text-indigo-700 shadow-2xs' : ''}`}
            >
              Changes Requested (4)
            </button>
            <button
              onClick={() => setSubTab('approved')}
              className={`px-3 py-1 rounded-md transition ${subTab === 'approved' ? 'bg-white text-indigo-700 shadow-2xs' : ''}`}
            >
              Recently Approved (18)
            </button>
          </div>

          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by post ID, caption, doctor/trainer tag..."
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-800 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Two-Column Split View: Left Queue Cards / Right Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Post Queue Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {posts.slice(0, 4).map((post) => {
            const isSelected = activePost.id === post.id;
            const isChecked = checkedIds.includes(post.id);

            return (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`rounded-xl border p-4 bg-white transition cursor-pointer relative shadow-2xs ${
                  isSelected
                    ? 'border-indigo-600 ring-2 ring-indigo-500/10 bg-indigo-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleCheck(post.id);
                    }}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  />

                  {/* Media Thumbnail */}
                  <div className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-slate-900 shadow-2xs">
                    <img
                      src={post.mediaUrls[0]}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 py-0.2 text-[9px] font-mono text-white">
                      {post.formatLabel}
                    </span>
                  </div>

                  {/* Post Info */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{post.clientName}</span>
                        <span className="font-mono text-[10px] text-slate-400">{post.postCode}</span>
                      </div>
                      {post.urgentSla ? (
                        <span className="rounded bg-rose-100 text-rose-800 px-2 py-0.5 text-[10px] font-bold">
                          Urgent SLA: {post.urgentSla}
                        </span>
                      ) : (
                        <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-medium">
                          {post.status}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{post.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                      "{post.caption}"
                    </p>

                    {/* Feedback quote note if available */}
                    {post.approvalHistory && post.approvalHistory.length > 0 && (
                      <div className="p-2 rounded bg-amber-50/80 border border-amber-200/60 text-[10px] text-amber-900 flex items-start gap-1.5 mt-1">
                        <MessageSquare className="h-3 w-3 shrink-0 text-amber-600 mt-0.5" />
                        <span>
                          <strong>{post.approvalHistory[0].author}:</strong> "{post.approvalHistory[0].text}"
                        </span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">
                        Creator: <strong className="text-slate-700">{post.creatorName}</strong>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPostId(post.id);
                          }}
                          className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
                        >
                          Preview
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            approvePost(post.id);
                          }}
                          className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                        >
                          Quick Approve
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white shadow-2xs p-5 space-y-4 sticky top-20 self-start">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-900">
                  Post {activePost.postCode}
                </span>
                <span className="rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                  Ready for Review
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {activePost.clientName} • Instagram {activePost.type}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Smartphone className="h-4 w-4" />
              <ExternalLink className="h-4 w-4" />
            </div>
          </div>

          {/* Reel / Media Player Simulation */}
          <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 text-white shadow-lg">
            <div className="relative h-64 overflow-hidden flex items-center justify-center">
              <img
                src={activePost.mediaUrls[0]}
                alt={activePost.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-mono flex items-center gap-1">
                <span>0:28</span>
              </div>
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded">
                  Tagged: @coach_rahul_fit
                </span>
              </div>
            </div>

            {/* Simulated Instagram Reel Footer */}
            <div className="p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-white hover:text-rose-500 cursor-pointer" />
                  <MessageSquare className="h-4 w-4 text-white cursor-pointer" />
                  <Share2 className="h-4 w-4 text-white cursor-pointer" />
                </div>
                <Bookmark className="h-4 w-4 text-white cursor-pointer" />
              </div>
              <p className="text-[11px] text-slate-200 line-clamp-2">
                <strong className="text-white">fitzone_studio</strong> {activePost.caption}
              </p>
              <div className="text-[10px] font-mono text-indigo-400 font-semibold">
                SCHEDULED FOR 24 APR 2025 • 06:30 PM IST (PEAK WINDOW)
              </div>
            </div>
          </div>

          {/* Pre-Flight Audit Verified Banner */}
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-sky-600 mt-0.5 shrink-0" />
            <div className="text-[11px]">
              <strong className="font-semibold">Instagram Graph API v19.0 Pre-flight Verified:</strong> Token valid, aspect ratio 4:5 compliant, content policies passed.
            </div>
          </div>

          {/* Feedback & Approval History */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Feedback & Approval History</span>
              <span className="text-[10px] text-slate-400 font-normal">
                {activePost.approvalHistory?.length || 2} Messages
              </span>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto text-xs p-1">
              {(activePost.approvalHistory || [
                {
                  author: 'Vikram Malhotra (Owner)',
                  authorRole: 'Client',
                  text: 'Looks great, but can we ensure Coach Rahul is tagged in the second slide instead of caption only?',
                  timestamp: '1 hr ago',
                },
                {
                  author: 'Priya Kumar (Mohd Agency Lead)',
                  authorRole: 'Lead',
                  text: 'Updated! Coach Rahul is tagged directly on the media asset. Ready for final approval.',
                  timestamp: '25 mins ago',
                },
              ]).map((msg, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-800">{msg.author}</span>
                    <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">"{msg.text}"</p>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="pt-1">
              <input
                type="text"
                placeholder="Add comment, revision instructions, or approval condition..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-800 focus:bg-white focus:border-indigo-600 focus:outline-none"
              />
            </form>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => approvePost(activePost.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 py-2.5 text-xs font-bold text-white shadow-xs transition"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Approve & Schedule</span>
              </button>
              <button
                onClick={() => requestChanges(activePost.id, 'Client requested adjustments')}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 py-2.5 text-xs font-semibold text-slate-700 transition"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Request Changes</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-[11px]">
              <button
                onClick={() => rejectPost(activePost.id, 'Asset rejected by supervisor.')}
                className="text-rose-600 hover:underline flex items-center gap-1"
              >
                <X className="h-3.5 w-3.5" />
                <span>Reject Asset</span>
              </button>
              <span className="text-slate-400 text-[10px]">Auto-publishes in 22 hrs upon approval</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

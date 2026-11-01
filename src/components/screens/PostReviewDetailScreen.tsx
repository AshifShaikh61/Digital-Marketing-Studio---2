import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  MapPin,
  Check,
  X,
  MessageSquare,
  Share2,
  Paperclip,
  Send,
  Sparkles,
  ShieldCheck,
  CheckSquare,
} from 'lucide-react';

export const PostReviewDetailScreen: React.FC = () => {
  const { posts, approvePost, rejectPost, requestChanges, setScreen } = useApp();

  // Active post #IG-9839
  const post = posts.find((p) => p.id === 'post-9839') || posts[0];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isApproved, setIsApproved] = useState(post.status === 'Approved');

  // 3 Slides for carousel
  const slides = [
    {
      title: 'Hero: Clinical Showcase',
      desc: '45m Clinical Procedure',
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Slide 2: Clinical Benefits',
      desc: 'Skin Barrier & Peptides',
      url: 'https://images.unsplash.com/photo-1512290900672-1f5517fa42d7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Slide 3: Doctor Consultation',
      desc: 'WhatsApp Direct Booking',
      url: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    requestChanges(post.id, commentText);
    alert('Revision note dispatched to creative pod!');
    setCommentText('');
  };

  const handleApprove = () => {
    approvePost(post.id);
    setIsApproved(true);
    alert('Post #IG-9839 successfully approved! Meta Graph API payload queued for tomorrow 11:00 AM IST.');
  };

  return (
    <div className="p-8 space-y-6 max-w-[1440px] mx-auto select-none">
      {/* Breadcrumb Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-1">
            <span>Client Workspace</span>
            <span>/</span>
            <button onClick={() => setScreen('client-posts')} className="hover:underline">
              My Posts
            </button>
            <span>/</span>
            <span className="text-indigo-600 font-semibold">
              Review Post #IG-9839: Hydra-Glow Summer Skin Treatment
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Hydra-Glow Summer Skin Treatment
            </h1>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold border ${
                isApproved
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              {isApproved ? '✓ Approved & Scheduled' : '• Awaiting Your Sign-Off'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-800">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>Deployment: Tomorrow, 25 Apr • 11:00 AM IST (in 18h)</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => alert('Viewing previous pending creative')}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              &lt; Prev
            </button>
            <span className="text-xs text-slate-400 font-mono px-1">1 of 2 Pending</span>
            <button
              onClick={() => alert('Viewing next pending creative')}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Carousel Viewer & Thumbnails (6.5 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tech specs bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="rounded bg-indigo-50 text-indigo-700 px-2 py-0.5 font-bold">
                Carousel Post
              </span>
              <span>1080 × 1350 px (4:5 Portrait)</span>
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Lossless WebP • Meta Pre-flight Ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Pinning compliance annotation')}
                className="text-slate-600 hover:text-indigo-600 text-[11px] font-semibold"
              >
                Pin Revision
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-700">
                <Download className="h-3.5 w-3.5" />
              </button>
              <button className="p-1 text-slate-400 hover:text-slate-700">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Carousel Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[4/5] shadow-xl border border-slate-800">
            <img
              src={slides[currentSlide].url}
              alt={slides[currentSlide].title}
              className="h-full w-full object-cover transition-opacity duration-300"
            />

            {/* Slide Indicator Badge */}
            <span className="absolute top-4 right-4 rounded-full bg-black/70 backdrop-blur-xs px-3 py-1 text-xs font-mono font-bold text-white shadow-md">
              Slide {currentSlide + 1} of 3
            </span>

            {/* Interactive Hotspot Pin #1 */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs ring-4 ring-white/60 shadow-lg">
                1
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              </span>
              <div className="absolute top-10 -left-16 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] p-2 rounded-lg shadow-lg w-40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Dr. Alok Mehta verified Hydra-Glow protocol infusion tag.
              </div>
            </div>

            {/* Left / Right Carousel Nav Arrows */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Bottom Overlay Location & Doctor Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/60 backdrop-blur-md text-white">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose-400" />
                <div className="text-xs">
                  <div className="font-bold">City Care Clinic</div>
                  <div className="text-[10px] text-slate-300">Bandra West, Mumbai</div>
                </div>
              </div>
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-[10px] font-bold">
                Doctor Led
              </span>
            </div>
          </div>

          {/* Carousel Sequence Thumbnails */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">CAROUSEL SEQUENCE</span>
              <span className="text-[10px] text-slate-400 font-mono">
                3 Slides Ready for Meta API Push
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {slides.map((s, idx) => (
                <button
                  key={s.title}
                  onClick={() => setCurrentSlide(idx)}
                  className={`text-left rounded-xl p-2.5 border transition flex items-center gap-2.5 ${
                    currentSlide === idx
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={s.url}
                    alt={s.title}
                    className="h-10 w-10 rounded-lg object-cover shadow-2xs"
                  />
                  <div className="min-w-0 text-xs">
                    <div className="font-bold text-slate-900 truncate">Slide {idx + 1}</div>
                    <div className="text-[10px] text-slate-500 truncate">{s.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Destination channels */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-indigo-600" />
              <span className="text-slate-700 font-semibold">
                Instagram Feed & Facebook Page: <strong className="text-slate-900">@citycareclinic_official</strong>
              </span>
              <span className="text-slate-400">• 18.4K Combined Reach</span>
            </div>
            <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-1">
              <Check className="h-3 w-3" />
              Ad Account Connected
            </span>
          </div>
        </div>

        {/* Right Column: Studio, Checklist & Approval Actions (5.5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Creator Profile & Campaign */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Priya"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Priya Kumar</span>
                    <span className="rounded bg-indigo-50 text-indigo-700 px-1.5 py-0.2 text-[10px] font-bold">
                      Agency Creative Lead
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Mohd Digital • Submitted today at 09:40 AM
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                Associated Campaign
              </span>
              <span className="font-semibold text-slate-800">
                Summer Aesthetics & Hydra-Glow Drive (April 2025)
              </span>
            </div>
          </div>

          {/* Post Caption & First Comment */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-900">Post Caption & First Comment</h4>
              <button
                onClick={() => alert('Opening caption editor')}
                className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                <span>Suggest Caption Edit</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed">
              {post.caption}
            </div>

            <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 text-xs space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span className="font-bold text-slate-700">First Comment (Auto-Posted upon publishing)</span>
                <span className="font-mono">Character Count: 88</span>
              </div>
              <p className="text-[11px] text-slate-600 font-mono italic">
                "{post.firstComment}"
              </p>
            </div>
          </div>

          {/* Clinical & Legal Sign-Off Verification (3 of 3 Passed) */}
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-emerald-200/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <h4 className="text-xs font-bold text-emerald-900">
                  Clinical & Legal Sign-Off Verification
                </h4>
              </div>
              <span className="rounded bg-emerald-200 text-emerald-900 px-2 py-0.5 text-[10px] font-bold">
                3 of 3 Passed
              </span>
            </div>

            <div className="space-y-2 text-xs text-emerald-900">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                <span>Medical claims adhere to healthcare advertising guidelines (MCI / CDSCO)</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                <span>Doctor credentials & Clinic contact verified (+91 98201 44521)</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-emerald-600" />
                <span>Patient model consent on file (Media release #CR-441 verified)</span>
              </label>
            </div>
          </div>

          {/* Review Thread with Mohd Digital */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">Review Thread with Mohd Digital</h4>
              <span className="text-[10px] text-slate-400">2 messages</span>
            </div>

            <div className="space-y-2 max-h-36 overflow-y-auto text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <strong className="text-indigo-900">Dr. Alok Mehta</strong>
                  <span className="text-slate-400">Yesterday, 5:12 PM</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  "Looks great! Just make sure Slide 2 mentions that treatments are customized after initial skin analysis."
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <strong className="text-indigo-900">Priya Kumar</strong>
                  <span className="text-slate-400">15m ago</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  "Updated in Slide 2 subtext! Added: 'Tailored to your dermatological skin assessment.' Ready for your final sign-off! ✨"
                </p>
              </div>
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendRevision} className="space-y-2 pt-1 border-t border-slate-100">
              <input
                type="text"
                placeholder="Add change request or revision note for Priya Kumar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 focus:outline-none"
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-700"
                >
                  <Paperclip className="h-3 w-3" />
                  <span>Attach Reference</span>
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  Send Revision Note
                </button>
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleApprove}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition"
            >
              <Check className="h-4 w-4" />
              <span>Approve & Schedule Post (Meta Graph API Ready)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  requestChanges(post.id, 'Adjustment requested by Dr. Mehta');
                  alert('Revision request logged');
                }}
                className="py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                Request Changes
              </button>
              <button
                onClick={() => {
                  rejectPost(post.id, 'Asset rejected');
                  alert('Creative rejected');
                }}
                className="py-2 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700"
              >
                Reject Creative
              </button>
            </div>

            <div className="text-center pt-1 text-[11px] text-slate-400">
              Urgent question?{' '}
              <a
                href="https://wa.me/919820100000"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 font-semibold hover:underline"
              >
                WhatsApp Rahul Sharma (Sr. Strategist)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

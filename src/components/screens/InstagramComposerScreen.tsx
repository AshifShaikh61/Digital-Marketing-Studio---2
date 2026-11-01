import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Clock,
  Crop,
  RefreshCw,
  Trash2,
  Smile,
  Plus,
  Send,
  Save,
  X,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const InstagramComposerScreen: React.FC = () => {
  const { setScreen, createPost, clients } = useApp();

  const [selectedClient, setSelectedClient] = useState('FitZone Fitness Studio');
  const [postFormat, setPostFormat] = useState<'Single Post' | 'Multi Carousel' | 'Reel Video'>('Single Post');
  const [caption, setCaption] = useState(
    "🔥 Level up your high-intensity workouts this season! Our certified coaches break down explosive kettlebell techniques to maximize endurance and strength without injury risk. Drop a 💪 below if you're hitting the gym floor today!"
  );
  const [hashtags, setHashtags] = useState([
    '#FitZoneFitness',
    '#CrossfitLife',
    '#FunctionalStrength',
    '#PersonalTrainerDelhi',
    '#WorkoutMotivation',
    '#FitnessGoals2025',
  ]);
  const [firstCommentToggle, setFirstCommentToggle] = useState(true);
  const [approvalWorkflow, setApprovalWorkflow] = useState<'require' | 'direct'>('require');
  const [publishDate, setPublishDate] = useState('2025-04-24');
  const [publishTime, setPublishTime] = useState('06:30 PM');
  const [internalNotes, setInternalNotes] = useState(
    'Hi Vikram, this is the first asset for the Summer Shred campaign. Please verify coach tag in caption.'
  );
  const [previewTab, setPreviewTab] = useState<'feed' | 'grid'>('feed');
  const [isAiPolishing, setIsAiPolishing] = useState(false);

  const handleAiPolish = () => {
    setIsAiPolishing(true);
    setTimeout(() => {
      setCaption(
        "⚡ Stop guessing your fitness progress. Our certified trainers break down master-level kettlebell form to build explosive strength safely. Double tap if you're in the gym this week! 💪🔥"
      );
      setIsAiPolishing(false);
    }, 600);
  };

  const removeHashtag = (tagToRemove: string) => {
    setHashtags(hashtags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = () => {
    createPost({
      clientName: selectedClient,
      title: 'Summer Shred Kettlebell Workout',
      caption,
      hashtags,
      firstComment: firstCommentToggle ? hashtags.join(' ') : undefined,
      type: postFormat,
      formatLabel: '4:5 Portrait',
      status: approvalWorkflow === 'require' ? 'Pending Approval' : 'Scheduled',
      scheduledDate: publishDate,
      scheduledTime: `${publishTime} IST`,
      mediaUrls: [
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      ],
    });
    alert('Creative draft saved and sent to client approval queue via Meta Graph API!');
  };

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            <span>Social & Content</span>
            <span>/</span>
            <span>Posts</span>
            <span>/</span>
            <span className="text-indigo-600">Create New Post</span>
            <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.2 text-[10px] font-medium border border-emerald-200">
              • Session Auto-Saved • Draft #8492
            </span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Instagram Post Composer
            </h1>
            <span className="rounded bg-indigo-100 text-indigo-700 text-xs font-mono font-bold px-2 py-0.5">
              v19.0 GRAPH API
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setScreen('admin-posts')}
            className="px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            Cancel / Discard
          </button>
          <button
            onClick={() => {
              alert('Draft #8492 saved to SQL Server database dbo.SocialPosts');
              setScreen('admin-posts');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            <span>Save as Draft</span>
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition shadow-xs"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Submit for Client Approval</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: 4-Step Form Wizard (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Client & Channel Target */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-50 text-indigo-600">🏛️</span>
                Client & Channel Target
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Step 1 of 4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Select Client Business
                </label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-medium text-slate-800 focus:border-indigo-600 focus:outline-none"
                >
                  <option>FitZone Fitness Studio (Gym & Crossfit)</option>
                  <option>City Care Clinic (Healthcare & Dental)</option>
                  <option>Spice Garden Restaurant (Fine Dining)</option>
                  <option>Health First Dental (Orthodontics)</option>
                  <option>PowerFit Gym Downtown</option>
                </select>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1.5">
                  <span>Owner: Vikram Malhotra</span>
                  <span>•</span>
                  <span>Account Lead: Farhan</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Social Endpoint
                </label>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-indigo-600 text-white font-bold text-[9px]">
                      IG
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">@fitzone_studio</div>
                      <div className="text-[10px] text-emerald-600 font-medium">
                        Connected • Token Valid
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Assigned Specialist */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Priya"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <span className="text-slate-600">
                  Assigned Content Creator: <strong className="text-slate-900">Priya Kumar</strong> (Senior Copy & Media Lead)
                </span>
              </div>
              <button className="text-indigo-600 font-semibold text-[11px] hover:underline">
                Reassign
              </button>
            </div>
          </div>

          {/* STEP 2: Creative Media Assets */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-50 text-indigo-600">🖼️</span>
                Creative Media Assets
              </h3>
                {[
                  { id: 'Single Post' as const, label: 'Single Post' },
                  { id: 'Multi Carousel' as const, label: 'Multi Carousel' },
                  { id: 'Reel Video' as const, label: 'Instagram Reel' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setPostFormat(fmt.id)}
                    className={`px-2.5 py-1 rounded-md transition ${
                      postFormat === fmt.id ? 'bg-white text-indigo-700 shadow-2xs' : ''
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
            </div>

            {/* Asset Row */}
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50">
              <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80"
                  alt="Asset"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[8px] font-mono text-white">
                  4:5
                </span>
              </div>

              <div className="flex-1 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">kettlebell_shred_post_v2.jpg</span>
                  <span className="rounded bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 text-[9px] font-bold">
                    Ready
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  Dimensions: 1080 x 1350 px (Portrait 4:5) • Size: 2.4 MB • Color Space: sRGB
                </div>
                <div className="flex items-center gap-2 pt-1 text-[11px]">
                  <button className="flex items-center gap-1 font-semibold text-indigo-600 hover:underline">
                    <Crop className="h-3 w-3" />
                    <span>Crop / Reframe</span>
                  </button>
                  <span>•</span>
                  <button className="flex items-center gap-1 font-semibold text-slate-600 hover:underline">
                    <RefreshCw className="h-3 w-3" />
                    <span>Replace Asset</span>
                  </button>
                </div>
              </div>

              <button className="p-1.5 text-slate-400 hover:text-rose-600 transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Upload Drop Zone */}
            <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center hover:border-indigo-400 transition cursor-pointer">
              <UploadCloud className="mx-auto h-8 w-8 text-indigo-500 mb-2" />
              <div className="text-xs font-bold text-slate-800">
                Drag additional images or drop high-res video
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Accepts JPG, PNG, MP4 up to 50MB. Recommended 1:1 or 4:5 aspect ratio.
              </p>
              <button
                type="button"
                onClick={() => alert('Opening file browser dialog')}
                className="mt-3 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
              >
                Browse Local Drive
              </button>
            </div>
          </div>

          {/* STEP 3: Caption & Copy Studio */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-50 text-indigo-600">✍️</span>
                Caption & Copy Studio
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiPolish}
                  disabled={isAiPolishing}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold hover:bg-indigo-100 transition shadow-2xs"
                >
                  <Sparkles className="h-3 w-3 text-indigo-600" />
                  <span>{isAiPolishing ? 'Polishing Copy...' : 'AI Polish'}</span>
                </button>
                <button className="p-1 text-slate-400 hover:text-slate-600">
                  <Smile className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-slate-200 p-3 text-xs text-slate-800 focus:border-indigo-600 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>Recommended: 125-150 characters before 'more' truncation</span>
                <span>{caption.length} / 2,200</span>
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Target Hashtags (6/30)</span>
                <button className="text-indigo-600 font-medium hover:underline text-[11px]">
                  + Add Tag Group
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    <span>{tag}</span>
                    <button onClick={() => removeHashtag(tag)} className="text-slate-400 hover:text-slate-700">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Publish First Comment Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-800">Publish First Comment</div>
                <div className="text-[10px] text-slate-400">
                  Automatically post hashtag bundle in the first comment for cleaner captions.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={firstCommentToggle}
                  onChange={(e) => setFirstCommentToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>

          {/* STEP 4: Workflow & Schedule */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="p-1 rounded bg-indigo-50 text-indigo-600">📅</span>
                Workflow & Schedule
              </h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Final Step
              </span>
            </div>

            {/* Workflow radios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setApprovalWorkflow('require')}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  approvalWorkflow === 'require'
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Require Client Approval</span>
                  <input
                    type="radio"
                    name="workflow"
                    checked={approvalWorkflow === 'require'}
                    onChange={() => {}}
                    className="text-indigo-600"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Dispatches review notification to Vikram Malhotra before queuing.
                </p>
                <span className="text-[9px] font-bold text-indigo-600 block mt-1">
                  Recommended by Agency Policy
                </span>
              </label>

              <label
                onClick={() => setApprovalWorkflow('direct')}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  approvalWorkflow === 'direct'
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">Direct Scheduled Publishing</span>
                  <input
                    type="radio"
                    name="workflow"
                    checked={approvalWorkflow === 'direct'}
                    onChange={() => {}}
                    className="text-indigo-600"
                  />
                </div>
                <p className="text-[10px] text-slate-500">
                  Bypasses client review using pre-authorized evergreen SLA.
                </p>
                <span className="text-[9px] font-bold text-slate-400 block mt-1">
                  Requires Admin Override
                </span>
              </label>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Publishing Date
                </label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Publishing Time (IST)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800 font-mono"
                  />
                  <span className="rounded bg-sky-50 text-sky-700 border border-sky-200 px-2 py-1 text-[10px] font-bold whitespace-nowrap">
                    Peak: 6PM - 8PM
                  </span>
                </div>
              </div>
            </div>

            {/* Optimal window banner */}
            <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-between text-xs text-sky-900 font-medium">
              <span>📈 Optimal Audience Window Selected</span>
              <strong className="text-sky-700 font-bold">+28% Avg Reach</strong>
            </div>

            {/* Internal notes */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Internal Notes for Vikram Malhotra (Approver)
              </label>
              <input
                type="text"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2 text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Instagram Mobile Preview & Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mobile phone mock */}
          <div className="rounded-3xl border border-slate-300 bg-white p-4 shadow-xl max-w-sm mx-auto">
            <div className="flex items-center justify-between pb-3 text-xs font-semibold text-slate-600 border-b mb-3">
              <span className="font-bold text-slate-900">Live Instagram Mobile Preview</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px]">
                <button
                  onClick={() => setPreviewTab('feed')}
                  className={`px-2 py-0.5 rounded ${previewTab === 'feed' ? 'bg-white font-bold' : ''}`}
                >
                  Feed Post
                </button>
                <button
                  onClick={() => setPreviewTab('grid')}
                  className={`px-2 py-0.5 rounded ${previewTab === 'grid' ? 'bg-white font-bold' : ''}`}
                >
                  Explore Grid
                </button>
              </div>
            </div>

            {/* Simulated iPhone frame */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white text-xs select-none">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-1.5 text-[11px] font-bold text-slate-900 border-b border-slate-100">
                <span>09:41</span>
                <span className="text-[10px] tracking-tight">5G • 100%</span>
              </div>

              {/* Instagram Brand Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <span className="font-serif italic font-bold text-sm text-slate-900 tracking-tight">
                  Instagram
                </span>
                <div className="flex items-center gap-2 text-slate-800">
                  <Heart className="h-4 w-4" />
                  <Send className="h-4 w-4" />
                </div>
              </div>

              {/* Profile Bar */}
              <div className="flex items-center justify-between p-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-fuchsia-600 p-0.5">
                    <img
                      src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80"
                      alt="fitzone"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-slate-900 leading-tight">
                      <span>fitzone_studio</span>
                      <CheckCircle2 className="h-3 w-3 text-sky-500 fill-sky-500 text-white" />
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">
                      FitZone Fitness Studio • Hauz Khas
                    </div>
                  </div>
                </div>
                <span className="text-slate-400 font-bold">•••</span>
              </div>

              {/* Post Image */}
              <div className="relative aspect-[4/5] bg-slate-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80"
                  alt="Kettlebell workout"
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-mono text-white">
                  1/3
                </span>
              </div>

              {/* Interaction Bar */}
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-800">
                    <Heart className="h-4 w-4 hover:text-rose-500 cursor-pointer" />
                    <MessageCircle className="h-4 w-4 cursor-pointer" />
                    <Share2 className="h-4 w-4 cursor-pointer" />
                  </div>
                  <Bookmark className="h-4 w-4 text-slate-800 cursor-pointer" />
                </div>

                <div className="text-[11px] font-bold text-slate-900">
                  Liked by rahul_sharma and 142 others
                </div>

                <p className="text-[11px] text-slate-800 leading-tight">
                  <strong className="font-bold mr-1">fitzone_studio</strong>
                  {caption.slice(0, 110)}... <span className="text-slate-400">more</span>
                </p>

                <div className="text-[10px] text-slate-400">View all 18 comments</div>
                <div className="text-[9px] font-mono text-indigo-600 font-semibold pt-1">
                  SCHEDULED FOR APR 24 • 6:30 PM IST
                </div>
              </div>
            </div>
          </div>

          {/* Pre-Flight Audit Checklist Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900">Pre-Flight Audit Checklist</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Aspect ratio compliant (4:5 Portrait)</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">1080x1350</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Cloudinary CDN media optimization</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">Lossless WebP</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">Caption & hashtags limit checks</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-600 font-bold">
                  Pass ({caption.length}/2200)
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-purple-50">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span className="text-purple-900 font-medium">Awaiting Client Approval dispatch</span>
                </div>
                <span className="font-mono text-[10px] text-purple-700 font-bold">Pending Send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

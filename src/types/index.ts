export type Role = 'admin' | 'specialist' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  title: string;
  avatarUrl: string;
  clientId?: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  category: 'Clinic' | 'Gym' | 'Restaurant';
  categoryLabel: string;
  principal: string;
  principalTitle: string;
  email: string;
  phone: string;
  specialist: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  activeChannels: {
    instagram: 'Live' | 'Syncing' | 'Error';
    whatsapp: 'Biz' | 'Setup' | 'Live';
    metaAds?: 'Synced' | 'Pending';
  };
  contentOutput: {
    published: number;
    inReview: number;
    pending: number;
    setupDrafts?: number;
  };
  accountState: 'Active' | 'Onboarding' | 'Paused';
  leadsCount: number;
  igHealth: string;
  roi: string;
  avatarBg: string;
  shortCode: string;
}

export interface PostItem {
  id: string;
  postCode: string; // e.g. #IG-9842
  clientId: string;
  clientName: string;
  clientAvatar: string;
  type: 'Single Post' | 'Multi Carousel' | 'Reel Video';
  formatLabel: string; // e.g. "1:1 Square", "4:5 Portrait", "Carousel (3 Slides)"
  title: string;
  caption: string;
  hashtags: string[];
  firstComment?: string;
  mediaUrls: string[];
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Scheduled' | 'Published' | 'Changes Requested' | 'Dispatch Failed';
  creatorName: string;
  creatorRole: string;
  approverName: string;
  approverRole: string;
  scheduledDate?: string;
  scheduledTime?: string;
  publishedTime?: string;
  likes?: number;
  comments?: number;
  leadsGenerated?: number;
  errorReason?: string;
  urgentSla?: string;
  slaRemaining?: string;
  approvalHistory?: {
    author: string;
    authorRole: string;
    text: string;
    timestamp: string;
    avatarUrl?: string;
  }[];
  verificationChecklist?: {
    medicalClaims: boolean;
    credentialsVerified: boolean;
    modelConsent: boolean;
  };
}

export interface WhatsAppMessage {
  id: string;
  sender: 'lead' | 'bot' | 'agent' | 'doctor';
  senderName: string;
  text: string;
  timestamp: string;
  isTemplate?: boolean;
}

export interface WhatsAppLead {
  id: string;
  name: string;
  phone: string;
  location: string;
  clientId: string;
  clientName: string;
  clientCategory: string;
  status: 'New' | 'Follow-up Required' | 'Consultation Booked' | 'Dropped / Inactive';
  treatmentInterest: string;
  campaignAttribution: string;
  firstInquiryTime: string;
  lastMessageSnippet: string;
  unreadCount: number;
  assignedTo: string;
  doctorNotes?: string;
  scheduledSlot?: string;
  estimatedRevenue: number;
  messages: WhatsAppMessage[];
}

export interface CampaignPerformance {
  id: string;
  name: string;
  format: string;
  spend: number;
  reach: number;
  clicks: number;
  leads: number;
  bookings: number;
  costPerLead: number;
  status: 'Active' | 'Completed';
  roi: string;
}

export type ScreenId =
  | 'login'
  | 'admin-overview'
  | 'admin-clients'
  | 'admin-posts'
  | 'admin-approvals'
  | 'admin-composer'
  | 'admin-whatsapp'
  | 'client-dashboard'
  | 'client-posts'
  | 'client-review-detail'
  | 'client-leads'
  | 'client-analytics';

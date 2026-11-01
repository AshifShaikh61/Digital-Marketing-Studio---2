import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, ClientAccount, PostItem, WhatsAppLead, ScreenId } from '../types';
import { USERS, CLIENTS, POSTS, LEADS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentScreen: ScreenId;
  workspaceMode: string;
  clients: ClientAccount[];
  posts: PostItem[];
  leads: WhatsAppLead[];
  selectedPostId: string;
  selectedLeadId: string;
  isSqlDrawerOpen: boolean;
  isSwitcherOpen: boolean;
  isGlobalSearchOpen: boolean;
  sqlLogs: { query: string; timestamp: string; durationMs: number; rowCount: number }[];
  isLoading: boolean;
  setScreen: (screen: ScreenId) => void;
  loginAs: (role: 'admin' | 'specialist' | 'client') => void;
  logout: () => void;
  setWorkspaceMode: (mode: string) => void;
  setSelectedPostId: (id: string) => void;
  setSelectedLeadId: (id: string) => void;
  setIsSqlDrawerOpen: (open: boolean) => void;
  setIsSwitcherOpen: (open: boolean) => void;
  setIsGlobalSearchOpen: (open: boolean) => void;
  approvePost: (postId: string) => Promise<void>;
  rejectPost: (postId: string, reason?: string) => Promise<void>;
  requestChanges: (postId: string, comment: string) => Promise<void>;
  addPostComment: (postId: string, comment: string) => Promise<void>;
  sendWhatsAppMessage: (leadId: string, text: string) => Promise<void>;
  updateLeadStatus: (leadId: string, status: WhatsAppLead['status']) => Promise<void>;
  scheduleAppointment: (leadId: string, date: string, time: string, service: string) => Promise<void>;
  addInternalNote: (leadId: string, note: string) => Promise<void>;
  createPost: (postData: Partial<PostItem>) => Promise<void>;
  createClient: (clientData: Partial<ClientAccount>) => Promise<void>;
  retryPublish: (postId: string) => Promise<void>;
  executeSql: (query: string) => Promise<{ columns: string[]; rows: Record<string, unknown>[]; durationMs: number }>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(USERS.admin);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('admin-overview');
  const [workspaceMode, setWorkspaceMode] = useState<string>('Agency Admin');
  const [clients, setClients] = useState<ClientAccount[]>(CLIENTS);
  const [posts, setPosts] = useState<PostItem[]>(POSTS);
  const [leads, setLeads] = useState<WhatsAppLead[]>(LEADS);
  const [selectedPostId, setSelectedPostId] = useState<string>('post-9842');
  const [selectedLeadId, setSelectedLeadId] = useState<string>('lead-1');
  const [isSqlDrawerOpen, setIsSqlDrawerOpen] = useState<boolean>(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState<boolean>(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sqlLogs, setSqlLogs] = useState<{ query: string; timestamp: string; durationMs: number; rowCount: number }[]>([
    {
      query: 'SELECT * FROM Clients WHERE AccountStatus = \'Active\'',
      timestamp: '10:00:12 AM',
      durationMs: 14,
      rowCount: 16,
    },
    {
      query: 'SELECT * FROM SocialPosts WHERE Status = \'Pending Approval\'',
      timestamp: '10:00:08 AM',
      durationMs: 18,
      rowCount: 9,
    },
    {
      query: 'SELECT * FROM PatientLeads ORDER BY EstimatedRevenue DESC',
      timestamp: '10:00:01 AM',
      durationMs: 12,
      rowCount: 84,
    },
  ]);

  // Fetch real data from SQL backend
  const refreshData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [clientsRes, postsRes, leadsRes, logsRes] = await Promise.all([
        fetch('/api/clients').then((r) => r.ok ? r.json() : null),
        fetch('/api/posts').then((r) => r.ok ? r.json() : null),
        fetch('/api/leads').then((r) => r.ok ? r.json() : null),
        fetch('/api/sql/logs').then((r) => r.ok ? r.json() : null),
      ]);

      if (clientsRes && Array.isArray(clientsRes) && clientsRes.length > 0) {
        setClients(clientsRes);
      }
      if (postsRes && Array.isArray(postsRes) && postsRes.length > 0) {
        setPosts(postsRes);
      }
      if (leadsRes && Array.isArray(leadsRes) && leadsRes.length > 0) {
        setLeads(leadsRes);
      }
      if (logsRes && Array.isArray(logsRes) && logsRes.length > 0) {
        setSqlLogs(logsRes);
      }
    } catch (err) {
      console.warn('Backend fetch fallback (using seed state):', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleWorkspaceChange = (mode: string) => {
    setWorkspaceMode(mode);
    if (mode === 'Agency Admin') {
      if (!currentScreen.startsWith('admin-')) {
        setCurrentScreen('admin-overview');
      }
    } else {
      if (!currentScreen.startsWith('client-')) {
        setCurrentScreen('client-dashboard');
      }
    }
  };

  const loginAs = (role: 'admin' | 'specialist' | 'client') => {
    if (role === 'admin') {
      setCurrentUser(USERS.admin);
      setWorkspaceMode('Agency Admin');
      setCurrentScreen('admin-overview');
    } else if (role === 'specialist') {
      setCurrentUser(USERS.specialist);
      setWorkspaceMode('Agency Admin');
      setCurrentScreen('admin-approvals');
    } else {
      setCurrentUser(USERS.client);
      setWorkspaceMode('City Care Clinic');
      setCurrentScreen('client-dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const approvePost = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: currentUser?.name || 'Dr. Alok Mehta' }),
      });
      if (res.ok) {
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
        return;
      }
    } catch (err) {
      console.error('Approve post error:', err);
    }

    // Local fallback if fetch fails
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: 'Approved' } : p))
    );
  };

  const rejectPost = async (postId: string, reason?: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: reason || 'Adjustment requested by client reviewer.',
          author: currentUser?.name || 'Dr. Alok Mehta',
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
        return;
      }
    } catch (err) {
      console.error('Reject post error:', err);
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: 'Changes Requested' } : p))
    );
  };

  const requestChanges = async (postId: string, comment: string) => {
    await rejectPost(postId, comment);
  };

  const addPostComment = async (postId: string, comment: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: comment,
          author: currentUser?.name || 'Mohd Digital Agency',
          authorRole: currentUser?.role === 'admin' ? 'Agency Director' : 'Reviewer',
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
        return;
      }
    } catch (err) {
      console.error('Add comment error:', err);
    }

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            approvalHistory: [
              ...(p.approvalHistory || []),
              {
                author: currentUser?.name || 'Mohd Digital Agency',
                authorRole: currentUser?.role === 'admin' ? 'Agency Director' : 'Reviewer',
                text: comment,
                timestamp: 'Just now',
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const sendWhatsAppMessage = async (leadId: string, text: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sender: currentUser?.role === 'client' ? 'doctor' : 'agent',
          senderName: currentUser?.name || 'Agent',
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
        return;
      }
    } catch (err) {
      console.error('Send WhatsApp error:', err);
    }

    // Local fallback
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            messages: [
              ...lead.messages,
              {
                id: `msg-${Date.now()}`,
                sender: (currentUser?.role === 'client' ? 'doctor' : 'agent') as any,
                senderName: currentUser?.name || 'Agent',
                text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
            lastMessageSnippet: text,
            unreadCount: 0,
          };
        }
        return lead;
      })
    );
  };

  const updateLeadStatus = async (leadId: string, status: WhatsAppLead['status']) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
        return;
      }
    } catch (err) {
      console.error('Update status error:', err);
    }

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    );
  };

  const scheduleAppointment = async (leadId: string, date: string, time: string, service: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, service }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
        return;
      }
    } catch (err) {
      console.error('Schedule appointment error:', err);
    }

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: 'Consultation Booked', scheduledSlot: `${date} at ${time}` } : lead))
    );
  };

  const addInternalNote = async (leadId: string, note: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
        return;
      }
    } catch (err) {
      console.error('Add note error:', err);
    }

    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, doctorNotes: note } : lead))
    );
  };

  const createPost = async (postData: Partial<PostItem>) => {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (res.ok) {
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
        setCurrentScreen('admin-posts');
        return;
      }
    } catch (err) {
      console.error('Create post error:', err);
    }

    // Local fallback
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      postCode: `#IG-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: postData.clientId || 'client-fitzone',
      clientName: postData.clientName || 'FitZone Fitness Studio',
      clientAvatar: postData.clientAvatar || '',
      type: postData.type || 'Single Post',
      formatLabel: postData.formatLabel || '1:1 Square',
      title: postData.title || 'New Instagram Creative',
      caption: postData.caption || '',
      hashtags: postData.hashtags || ['#Marketing'],
      mediaUrls: postData.mediaUrls || ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'],
      status: postData.status || 'Pending Approval',
      creatorName: currentUser?.name || 'Priya Kumar',
      creatorRole: 'Creative Specialist',
      approverName: postData.approverName || 'Vikram Malhotra',
      approverRole: 'Client Approver',
      scheduledDate: postData.scheduledDate || '2025-04-26',
      scheduledTime: postData.scheduledTime || '06:30 PM IST',
    };
    setPosts([newPost, ...posts]);
    setCurrentScreen('admin-posts');
  };

  const createClient = async (clientData: Partial<ClientAccount>) => {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });
      if (res.ok) {
        const created = await res.json();
        setClients((prev) => [created, ...prev]);
        return;
      }
    } catch (err) {
      console.error('Create client error:', err);
    }

    const newClient: ClientAccount = {
      id: `client-${Date.now()}`,
      name: clientData.name || 'New Client Business',
      category: clientData.category || 'Clinic',
      categoryLabel: clientData.categoryLabel || 'Healthcare & Dental',
      principal: clientData.principal || 'Owner',
      principalTitle: clientData.principalTitle || 'Principal',
      email: clientData.email || 'contact@client.com',
      phone: clientData.phone || '+91 98000 00000',
      specialist: clientData.specialist || {
        name: 'Rahul Sharma',
        role: 'Senior Strategist',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      activeChannels: clientData.activeChannels || { instagram: 'Live', whatsapp: 'Biz' },
      contentOutput: clientData.contentOutput || { published: 0, inReview: 0, pending: 0 },
      accountState: clientData.accountState || 'Active',
      leadsCount: 0,
      igHealth: '100% Active',
      roi: '+15.0%',
      avatarBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      shortCode: 'NC',
    };
    setClients([newClient, ...clients]);
  };

  const retryPublish = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/retry`, { method: 'PUT' });
      if (res.ok) {
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)));
        return;
      }
    } catch (err) {
      console.error('Retry publish error:', err);
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, status: 'Scheduled', errorReason: undefined } : p))
    );
  };

  const executeSql = async (query: string) => {
    try {
      const res = await fetch('/api/sql/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (res.ok) {
        const data = await res.json();
        setSqlLogs((prev) => [
          {
            query,
            timestamp: new Date().toLocaleTimeString(),
            durationMs: data.durationMs,
            rowCount: data.rowCount,
          },
          ...prev.slice(0, 9),
        ]);
        return data;
      }
    } catch (err) {
      console.error('Execute SQL error:', err);
    }

    // Fallback if offline
    return {
      columns: ['Result'],
      rows: [{ Result: 'Statement executed in local buffer.' }],
      durationMs: 14,
    };
  };

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentScreen,
        workspaceMode,
        clients,
        posts,
        leads,
        selectedPostId,
        selectedLeadId,
        isSqlDrawerOpen,
        isSwitcherOpen,
        isGlobalSearchOpen,
        sqlLogs,
        isLoading,
        setScreen: setCurrentScreen,
        loginAs,
        logout,
        setWorkspaceMode: handleWorkspaceChange,
        setSelectedPostId,
        setSelectedLeadId,
        setIsSqlDrawerOpen,
        setIsSwitcherOpen,
        setIsGlobalSearchOpen,
        approvePost,
        rejectPost,
        requestChanges,
        addPostComment,
        sendWhatsAppMessage,
        updateLeadStatus,
        scheduleAppointment,
        addInternalNote,
        createPost,
        createClient,
        retryPublish,
        executeSql,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

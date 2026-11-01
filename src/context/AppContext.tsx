import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ClientAccount, PostItem, WhatsAppLead, ScreenId } from '../types';
import { USERS, CLIENTS, POSTS, LEADS, SQL_TABLES_SCHEMA } from '../data/mockData';

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
  setScreen: (screen: ScreenId) => void;
  loginAs: (role: 'admin' | 'specialist' | 'client') => void;
  logout: () => void;
  setWorkspaceMode: (mode: string) => void;
  setSelectedPostId: (id: string) => void;
  setSelectedLeadId: (id: string) => void;
  setIsSqlDrawerOpen: (open: boolean) => void;
  setIsSwitcherOpen: (open: boolean) => void;
  setIsGlobalSearchOpen: (open: boolean) => void;
  approvePost: (postId: string) => void;
  rejectPost: (postId: string, reason?: string) => void;
  requestChanges: (postId: string, comment: string) => void;
  addPostComment: (postId: string, comment: string) => void;
  sendWhatsAppMessage: (leadId: string, text: string) => void;
  updateLeadStatus: (leadId: string, status: WhatsAppLead['status']) => void;
  scheduleAppointment: (leadId: string, date: string, time: string, service: string) => void;
  addInternalNote: (leadId: string, note: string) => void;
  createPost: (postData: Partial<PostItem>) => void;
  retryPublish: (postId: string) => void;
  executeSql: (query: string) => { columns: string[]; rows: Record<string, unknown>[]; durationMs: number };
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
  const [sqlLogs, setSqlLogs] = useState<{ query: string; timestamp: string; durationMs: number; rowCount: number }[]>([
    {
      query: 'SELECT * FROM dbo.SocialPosts WHERE Status = @p0 ORDER BY ScheduledDate DESC',
      timestamp: '10:00:12 AM',
      durationMs: 14,
      rowCount: 9,
    },
    {
      query: 'EXEC sp_GetLeadConversionFunnel @ClientId = 1, @DateRange = @p0',
      timestamp: '10:00:08 AM',
      durationMs: 18,
      rowCount: 84,
    },
    {
      query: 'SELECT c.*, s.FullName FROM dbo.Clients c JOIN dbo.Users s ON c.SpecialistId = s.UserId',
      timestamp: '10:00:01 AM',
      durationMs: 12,
      rowCount: 18,
    },
  ]);

  // Sync workspace switch with screen when toggled
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

  const approvePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'Approved',
            approvalHistory: [
              ...(p.approvalHistory || []),
              {
                author: currentUser?.name || 'Dr. Alok Mehta',
                authorRole: currentUser?.role === 'admin' ? 'Agency Admin' : 'Client Approver',
                text: 'Creative approved for scheduled dispatch via Meta Graph API.',
                timestamp: 'Just now',
                avatarUrl: currentUser?.avatarUrl,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const rejectPost = (postId: string, reason?: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'Changes Requested',
            approvalHistory: [
              ...(p.approvalHistory || []),
              {
                author: currentUser?.name || 'Dr. Alok Mehta',
                authorRole: 'Client Reviewer',
                text: reason || 'Asset rejected, please revise according to compliance feedback.',
                timestamp: 'Just now',
                avatarUrl: currentUser?.avatarUrl,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const requestChanges = (postId: string, comment: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'Changes Requested',
            approvalHistory: [
              ...(p.approvalHistory || []),
              {
                author: currentUser?.name || 'Dr. Alok Mehta',
                authorRole: 'Client Reviewer',
                text: comment,
                timestamp: 'Just now',
                avatarUrl: currentUser?.avatarUrl,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const addPostComment = (postId: string, comment: string) => {
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
                avatarUrl: currentUser?.avatarUrl,
              },
            ],
          };
        }
        return p;
      })
    );
  };

  const sendWhatsAppMessage = (leadId: string, text: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: (currentUser?.role === 'client' ? 'doctor' : 'agent') as 'doctor' | 'agent',
            senderName: currentUser?.name || 'Agent',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            ...lead,
            messages: [...lead.messages, newMsg],
            lastMessageSnippet: text,
            unreadCount: 0,
          };
        }
        return lead;
      })
    );
  };

  const updateLeadStatus = (leadId: string, status: WhatsAppLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead))
    );
  };

  const scheduleAppointment = (leadId: string, date: string, time: string, service: string) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const confirmationText = `📅 Appointment Confirmed: ${service} with Dr. Alok Mehta on ${date} at ${time}. We look forward to seeing you at City Care Clinic!`;
          return {
            ...lead,
            status: 'Consultation Booked',
            scheduledSlot: `${date} at ${time}`,
            messages: [
              ...lead.messages,
              {
                id: `msg-${Date.now()}`,
                sender: 'agent',
                senderName: 'City Care Clinic',
                text: confirmationText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isTemplate: true,
              },
            ],
          };
        }
        return lead;
      })
    );
  };

  const addInternalNote = (leadId: string, note: string) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, doctorNotes: note } : lead))
    );
  };

  const createPost = (postData: Partial<PostItem>) => {
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      postCode: `#IG-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: postData.clientId || 'client-fitzone',
      clientName: postData.clientName || 'FitZone Fitness Studio',
      clientAvatar: postData.clientAvatar || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80',
      type: postData.type || 'Single Post',
      formatLabel: postData.formatLabel || '1:1 Square',
      title: postData.title || 'New Instagram Creative',
      caption: postData.caption || '',
      hashtags: postData.hashtags || ['#Marketing', '#Fitness'],
      mediaUrls: postData.mediaUrls?.length ? postData.mediaUrls : ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'],
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

  const retryPublish = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            status: 'Scheduled',
            errorReason: undefined,
          };
        }
        return p;
      })
    );
  };

  const executeSql = (query: string) => {
    const clean = query.trim().toUpperCase();
    const duration = Math.floor(Math.random() * 12) + 8; // 8-20ms realistic ASP.NET latency

    let result = {
      columns: ['Result'],
      rows: [{ Result: 'Statement executed successfully.' }] as Record<string, unknown>[],
      durationMs: duration,
    };

    if (clean.includes('FROM DBO.CLIENTS') || clean.includes('FROM CLIENTS')) {
      result = {
        columns: ['ClientId', 'BusinessName', 'IndustrySector', 'Principal', 'Email', 'AccountStatus', 'LeadsCount'],
        rows: clients.map((c) => ({
          ClientId: c.id,
          BusinessName: c.name,
          IndustrySector: c.category,
          Principal: c.principal,
          Email: c.email,
          AccountStatus: c.accountState,
          LeadsCount: c.leadsCount,
        })),
        durationMs: duration,
      };
    } else if (clean.includes('FROM DBO.SOCIALPOSTS') || clean.includes('FROM POSTS')) {
      result = {
        columns: ['PostCode', 'ClientName', 'CampaignTitle', 'Format', 'Status', 'ScheduledDate', 'Creator'],
        rows: posts.map((p) => ({
          PostCode: p.postCode,
          ClientName: p.clientName,
          CampaignTitle: p.title,
          Format: p.formatLabel,
          Status: p.status,
          ScheduledDate: `${p.scheduledDate || 'N/A'} ${p.scheduledTime || ''}`,
          Creator: p.creatorName,
        })),
        durationMs: duration,
      };
    } else if (clean.includes('FROM DBO.PATIENTLEADS') || clean.includes('FROM LEADS')) {
      result = {
        columns: ['FullName', 'PhoneNumber', 'Client', 'LeadStatus', 'TreatmentInterest', 'EstRevenueINR'],
        rows: leads.map((l) => ({
          FullName: l.name,
          PhoneNumber: l.phone,
          Client: l.clientName,
          LeadStatus: l.status,
          TreatmentInterest: l.treatmentInterest,
          EstRevenueINR: `₹${l.estimatedRevenue.toLocaleString()}`,
        })),
        durationMs: duration,
      };
    }

    setSqlLogs((prev) => [
      {
        query,
        timestamp: new Date().toLocaleTimeString(),
        durationMs: duration,
        rowCount: result.rows.length,
      },
      ...prev.slice(0, 9),
    ]);

    return result;
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
        retryPublish,
        executeSql,
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

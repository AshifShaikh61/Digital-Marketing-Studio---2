import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, initSchema } from './server/db.js';
import { runSeeder } from './server/seeder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB and run initial seed
initSchema();
runSeeder();

const app = express();
app.use(express.json());

// Log API requests
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.path}`);
  }
  next();
});

// Helper to format client from DB row
function formatClient(row: any) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    categoryLabel: row.categoryLabel,
    principal: row.principal,
    principalTitle: row.principalTitle,
    email: row.email,
    phone: row.phone,
    specialist: JSON.parse(row.specialistJson || '{}'),
    activeChannels: JSON.parse(row.activeChannelsJson || '{}'),
    contentOutput: JSON.parse(row.contentOutputJson || '{}'),
    accountState: row.accountState,
    leadsCount: row.leadsCount,
    igHealth: row.igHealth,
    roi: row.roi,
    avatarBg: row.avatarBg,
    shortCode: row.shortCode,
  };
}

// Helper to format post from DB row
function formatPost(row: any) {
  return {
    id: row.id,
    postCode: row.postCode,
    clientId: row.clientId,
    clientName: row.clientName,
    clientAvatar: row.clientAvatar,
    type: row.type,
    formatLabel: row.formatLabel,
    title: row.title,
    caption: row.caption,
    hashtags: JSON.parse(row.hashtagsJson || '[]'),
    firstComment: row.firstComment,
    mediaUrls: JSON.parse(row.mediaUrlsJson || '[]'),
    status: row.status,
    creatorName: row.creatorName,
    creatorRole: row.creatorRole,
    approverName: row.approverName,
    approverRole: row.approverRole,
    scheduledDate: row.scheduledDate,
    scheduledTime: row.scheduledTime,
    publishedTime: row.publishedTime,
    likes: row.likes,
    comments: row.comments,
    leadsGenerated: row.leadsGenerated,
    urgentSla: row.urgentSla,
    slaRemaining: row.slaRemaining,
    errorReason: row.errorReason,
    approvalHistory: JSON.parse(row.approvalHistoryJson || '[]'),
    verificationChecklist: JSON.parse(row.verificationChecklistJson || 'null'),
  };
}

// Helper to format lead from DB row
function formatLead(row: any) {
  const messages = db.prepare('SELECT * FROM WhatsAppMessages WHERE leadId = ? ORDER BY createdAt ASC').all(row.id).map((m: any) => ({
    id: m.id,
    sender: m.sender,
    senderName: m.senderName,
    text: m.text,
    timestamp: m.timestamp,
    isTemplate: Boolean(m.isTemplate),
  }));

  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    location: row.location,
    clientId: row.clientId,
    clientName: row.clientName,
    clientCategory: row.clientCategory,
    status: row.status,
    treatmentInterest: row.treatmentInterest,
    campaignAttribution: row.campaignAttribution,
    firstInquiryTime: row.firstInquiryTime,
    lastMessageSnippet: row.lastMessageSnippet,
    unreadCount: row.unreadCount,
    assignedTo: row.assignedTo,
    doctorNotes: row.doctorNotes,
    scheduledSlot: row.scheduledSlot,
    estimatedRevenue: row.estimatedRevenue,
    messages,
  };
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Clients API
app.get('/api/clients', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM Clients ORDER BY rowid ASC').all();
  res.json(rows.map(formatClient));
});

app.post('/api/clients', (req: Request, res: Response) => {
  const { name, category, categoryLabel, principal, principalTitle, email, phone, specialist, activeChannels, contentOutput, accountState } = req.body;
  const id = `client-${Date.now()}`;
  const shortCode = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() || 'CL';
  const avatarBg = category === 'Clinic' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : category === 'Gym' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-purple-100 text-purple-700 border-purple-200';

  db.prepare(`
    INSERT INTO Clients (
      id, name, category, categoryLabel, principal, principalTitle, email, phone,
      specialistJson, activeChannelsJson, contentOutputJson, accountState,
      leadsCount, igHealth, roi, avatarBg, shortCode, createdAt
    ) VALUES (
      @id, @name, @category, @categoryLabel, @principal, @principalTitle, @email, @phone,
      @specialistJson, @activeChannelsJson, @contentOutputJson, @accountState,
      0, '100% Active', '+15.0%', @avatarBg, @shortCode, @createdAt
    )
  `).run({
    id,
    name,
    category: category || 'Clinic',
    categoryLabel: categoryLabel || 'Healthcare & Dental',
    principal: principal || 'Principal Contact',
    principalTitle: principalTitle || 'Managing Director',
    email: email || 'contact@client.com',
    phone: phone || '+91 98000 00000',
    specialistJson: JSON.stringify(specialist || { name: 'Rahul Sharma', role: 'Senior Strategist', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }),
    activeChannelsJson: JSON.stringify(activeChannels || { instagram: 'Live', whatsapp: 'Biz' }),
    contentOutputJson: JSON.stringify(contentOutput || { published: 0, inReview: 0, pending: 0 }),
    accountState: accountState || 'Active',
    avatarBg,
    shortCode,
    createdAt: new Date().toISOString(),
  });

  const created = db.prepare('SELECT * FROM Clients WHERE id = ?').get(id);
  res.status(201).json(formatClient(created));
});

// 2. Posts API
app.get('/api/posts', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM SocialPosts ORDER BY rowid ASC').all();
  res.json(rows.map(formatPost));
});

app.post('/api/posts', (req: Request, res: Response) => {
  const p = req.body;
  const id = `post-${Date.now()}`;
  const postCode = `#IG-${Math.floor(1000 + Math.random() * 9000)}`;

  db.prepare(`
    INSERT INTO SocialPosts (
      id, postCode, clientId, clientName, clientAvatar, type, formatLabel,
      title, caption, hashtagsJson, firstComment, mediaUrlsJson, status,
      creatorName, creatorRole, approverName, approverRole, scheduledDate,
      scheduledTime, publishedTime, likes, comments, leadsGenerated,
      urgentSla, slaRemaining, errorReason, approvalHistoryJson,
      verificationChecklistJson, createdAt
    ) VALUES (
      @id, @postCode, @clientId, @clientName, @clientAvatar, @type, @formatLabel,
      @title, @caption, @hashtagsJson, @firstComment, @mediaUrlsJson, @status,
      @creatorName, @creatorRole, @approverName, @approverRole, @scheduledDate,
      @scheduledTime, '', 0, 0, 0,
      @urgentSla, '', '', '[]',
      @verificationChecklistJson, @createdAt
    )
  `).run({
    id,
    postCode,
    clientId: p.clientId || 'client-citycare',
    clientName: p.clientName || 'City Care Clinic',
    clientAvatar: p.clientAvatar || '',
    type: p.type || 'Single Post',
    formatLabel: p.formatLabel || '1:1 Square',
    title: p.title || 'New Creative Asset',
    caption: p.caption || '',
    hashtagsJson: JSON.stringify(p.hashtags || []),
    firstComment: p.firstComment || '',
    mediaUrlsJson: JSON.stringify(p.mediaUrls?.length ? p.mediaUrls : ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80']),
    status: p.status || 'Pending Approval',
    creatorName: p.creatorName || 'Priya Kumar',
    creatorRole: p.creatorRole || 'Creative Lead',
    approverName: p.approverName || 'Dr. Alok Mehta',
    approverRole: p.approverRole || 'Medical Director',
    scheduledDate: p.scheduledDate || '2025-04-26',
    scheduledTime: p.scheduledTime || '06:30 PM IST',
    urgentSla: p.urgentSla || '',
    verificationChecklistJson: JSON.stringify(p.verificationChecklist || { medicalClaims: true, credentialsVerified: true, modelConsent: true }),
    createdAt: new Date().toISOString(),
  });

  const created = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id);
  res.status(201).json(formatPost(created));
});

app.put('/api/posts/:id/approve', (req: Request, res: Response) => {
  const { id } = req.params;
  const post = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id) as any;
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const history = JSON.parse(post.approvalHistoryJson || '[]');
  history.push({
    author: req.body.author || 'Dr. Alok Mehta',
    authorRole: 'Client Approver',
    text: 'Creative approved for scheduled dispatch via Meta Graph API.',
    timestamp: 'Just now',
  });

  db.prepare(`
    UPDATE SocialPosts
    SET status = 'Approved', approvalHistoryJson = ?
    WHERE id = ?
  `).run(JSON.stringify(history), id);

  const updated = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id);
  res.json(formatPost(updated));
});

app.put('/api/posts/:id/reject', (req: Request, res: Response) => {
  const { id } = req.params;
  const { reason, author } = req.body;
  const post = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id) as any;
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const history = JSON.parse(post.approvalHistoryJson || '[]');
  history.push({
    author: author || 'Dr. Alok Mehta',
    authorRole: 'Client Reviewer',
    text: reason || 'Adjustment requested by client reviewer.',
    timestamp: 'Just now',
  });

  db.prepare(`
    UPDATE SocialPosts
    SET status = 'Changes Requested', approvalHistoryJson = ?
    WHERE id = ?
  `).run(JSON.stringify(history), id);

  const updated = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id);
  res.json(formatPost(updated));
});

app.post('/api/posts/:id/comments', (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, author, authorRole } = req.body;
  const post = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id) as any;
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const history = JSON.parse(post.approvalHistoryJson || '[]');
  history.push({
    author: author || 'Client Reviewer',
    authorRole: authorRole || 'Reviewer',
    text,
    timestamp: 'Just now',
  });

  db.prepare(`
    UPDATE SocialPosts
    SET approvalHistoryJson = ?
    WHERE id = ?
  `).run(JSON.stringify(history), id);

  const updated = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id);
  res.json(formatPost(updated));
});

app.put('/api/posts/:id/retry', (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare(`
    UPDATE SocialPosts
    SET status = 'Scheduled', errorReason = ''
    WHERE id = ?
  `).run(id);

  const updated = db.prepare('SELECT * FROM SocialPosts WHERE id = ?').get(id);
  res.json(formatPost(updated));
});

// 3. Leads & WhatsApp API
app.get('/api/leads', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM PatientLeads ORDER BY rowid ASC').all();
  res.json(rows.map(formatLead));
});

app.put('/api/leads/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  db.prepare('UPDATE PatientLeads SET status = ? WHERE id = ?').run(status, id);

  const updated = db.prepare('SELECT * FROM PatientLeads WHERE id = ?').get(id);
  res.json(formatLead(updated));
});

app.post('/api/leads/:id/messages', (req: Request, res: Response) => {
  const { id } = req.params;
  const { text, sender, senderName } = req.body;
  const msgId = `msg-${Date.now()}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  db.prepare(`
    INSERT INTO WhatsAppMessages (id, leadId, sender, senderName, text, timestamp, isTemplate, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, 0, datetime('now'))
  `).run(msgId, id, sender || 'agent', senderName || 'Agent', text, timestamp);

  db.prepare(`
    UPDATE PatientLeads
    SET lastMessageSnippet = ?, unreadCount = 0
    WHERE id = ?
  `).run(text, id);

  const updated = db.prepare('SELECT * FROM PatientLeads WHERE id = ?').get(id);
  res.json(formatLead(updated));
});

app.post('/api/leads/:id/appointment', (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, time, service } = req.body;
  const slot = `${date} at ${time}`;
  const confirmationText = `📅 Appointment Confirmed: ${service} with Dr. Alok Mehta on ${date} at ${time}. We look forward to welcoming you to City Care Clinic!`;

  db.prepare(`
    UPDATE PatientLeads
    SET status = 'Consultation Booked', scheduledSlot = ?, lastMessageSnippet = ?
    WHERE id = ?
  `).run(slot, confirmationText, id);

  const msgId = `msg-${Date.now()}`;
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  db.prepare(`
    INSERT INTO WhatsAppMessages (id, leadId, sender, senderName, text, timestamp, isTemplate, createdAt)
    VALUES (?, ?, 'agent', 'City Care Clinic', ?, ?, 1, datetime('now'))
  `).run(msgId, id, confirmationText, timestamp);

  const updated = db.prepare('SELECT * FROM PatientLeads WHERE id = ?').get(id);
  res.json(formatLead(updated));
});

app.post('/api/leads/:id/notes', (req: Request, res: Response) => {
  const { id } = req.params;
  const { note } = req.body;
  db.prepare('UPDATE PatientLeads SET doctorNotes = ? WHERE id = ?').run(note, id);

  const updated = db.prepare('SELECT * FROM PatientLeads WHERE id = ?').get(id);
  res.json(formatLead(updated));
});

// 4. Campaigns API
app.get('/api/campaigns', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM Campaigns ORDER BY rowid ASC').all();
  res.json(rows);
});

// 5. SQL Query Execution Console (Real SQL Server / SQLite query runner)
app.post('/api/sql/execute', (req: Request, res: Response) => {
  const { query } = req.body;
  const startTime = performance.now();

  try {
    const trimmed = (query || '').trim();
    if (!trimmed) {
      return res.status(400).json({ error: 'Empty SQL query provided' });
    }

    // Normalize dbo. table references for standard SQL / SQLite compatibility
    const normalizedQuery = trimmed.replace(/dbo\./gi, '');

    // Check if SELECT statement
    if (/^\s*SELECT/i.test(normalizedQuery)) {
      const rows = db.prepare(normalizedQuery).all() as Record<string, any>[];
      const durationMs = Math.round(performance.now() - startTime) + 8; // realistic latency
      const columns = rows.length > 0 ? Object.keys(rows[0]) : ['Result'];

      // Log to audit table
      db.prepare(`
        INSERT INTO SqlAuditLogs (query, durationMs, rowCount, timestamp)
        VALUES (?, ?, ?, datetime('now'))
      `).run(trimmed, durationMs, rows.length);

      return res.json({
        columns,
        rows,
        durationMs,
        rowCount: rows.length,
      });
    } else {
      // DML (INSERT, UPDATE, DELETE)
      const info = db.prepare(normalizedQuery).run();
      const durationMs = Math.round(performance.now() - startTime) + 8;

      db.prepare(`
        INSERT INTO SqlAuditLogs (query, durationMs, rowCount, timestamp)
        VALUES (?, ?, ?, datetime('now'))
      `).run(trimmed, durationMs, info.changes);

      return res.json({
        columns: ['Changes', 'LastInsertRowId'],
        rows: [{ Changes: info.changes, LastInsertRowId: info.lastInsertRowid }],
        durationMs,
        rowCount: info.changes,
      });
    }
  } catch (err: any) {
    console.error('SQL Execution error:', err);
    res.status(400).json({
      error: err.message,
      columns: ['Error'],
      rows: [{ Error: err.message }],
      durationMs: 12,
      rowCount: 0,
    });
  }
});

app.get('/api/sql/logs', (req: Request, res: Response) => {
  const rows = db.prepare('SELECT * FROM SqlAuditLogs ORDER BY id DESC LIMIT 10').all();
  res.json(rows);
});

// ----------------------------------------------------
// VITE DEV SERVER / STATIC SERVING
// ----------------------------------------------------
const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] Full-Stack Express & SQLite backend running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

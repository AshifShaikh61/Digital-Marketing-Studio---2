import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.resolve(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.resolve(dataDir, 'mohddigital.db');
export const db = new Database(dbPath);

// Enable WAL mode for high performance
db.pragma('journal_mode = WAL');

// Initialize schema
export function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      categoryLabel TEXT,
      principal TEXT NOT NULL,
      principalTitle TEXT,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      specialistJson TEXT,
      activeChannelsJson TEXT,
      contentOutputJson TEXT,
      accountState TEXT NOT NULL,
      leadsCount INTEGER DEFAULT 0,
      igHealth TEXT,
      roi TEXT,
      avatarBg TEXT,
      shortCode TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS SocialPosts (
      id TEXT PRIMARY KEY,
      postCode TEXT NOT NULL,
      clientId TEXT NOT NULL,
      clientName TEXT NOT NULL,
      clientAvatar TEXT,
      type TEXT NOT NULL,
      formatLabel TEXT NOT NULL,
      title TEXT NOT NULL,
      caption TEXT NOT NULL,
      hashtagsJson TEXT,
      firstComment TEXT,
      mediaUrlsJson TEXT NOT NULL,
      status TEXT NOT NULL,
      creatorName TEXT NOT NULL,
      creatorRole TEXT,
      approverName TEXT NOT NULL,
      approverRole TEXT,
      scheduledDate TEXT,
      scheduledTime TEXT,
      publishedTime TEXT,
      likes INTEGER DEFAULT 0,
      comments INTEGER DEFAULT 0,
      leadsGenerated INTEGER DEFAULT 0,
      urgentSla TEXT,
      slaRemaining TEXT,
      errorReason TEXT,
      approvalHistoryJson TEXT,
      verificationChecklistJson TEXT,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS PatientLeads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      location TEXT,
      clientId TEXT NOT NULL,
      clientName TEXT NOT NULL,
      clientCategory TEXT,
      status TEXT NOT NULL,
      treatmentInterest TEXT,
      campaignAttribution TEXT,
      firstInquiryTime TEXT,
      lastMessageSnippet TEXT,
      unreadCount INTEGER DEFAULT 0,
      assignedTo TEXT,
      doctorNotes TEXT,
      scheduledSlot TEXT,
      estimatedRevenue INTEGER DEFAULT 0,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS WhatsAppMessages (
      id TEXT PRIMARY KEY,
      leadId TEXT NOT NULL,
      sender TEXT NOT NULL,
      senderName TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      isTemplate INTEGER DEFAULT 0,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS Campaigns (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      format TEXT NOT NULL,
      spend INTEGER NOT NULL,
      reach INTEGER NOT NULL,
      clicks INTEGER NOT NULL,
      leads INTEGER NOT NULL,
      bookings INTEGER NOT NULL,
      costPerLead REAL NOT NULL,
      status TEXT NOT NULL,
      roi TEXT NOT NULL,
      createdAt TEXT
    );

    CREATE TABLE IF NOT EXISTS SqlAuditLogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      durationMs INTEGER NOT NULL,
      rowCount INTEGER NOT NULL,
      timestamp TEXT NOT NULL
    );
  `);
}

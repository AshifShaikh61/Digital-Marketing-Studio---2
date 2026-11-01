import { db } from './db.js';
import { CLIENTS, POSTS, LEADS, CAMPAIGNS } from '../src/data/mockData.js';

export function runSeeder() {
  const clientCount = (db.prepare('SELECT count(*) as count FROM Clients').get() as { count: number }).count;

  if (clientCount > 0) {
    console.log(`[DB] Database already contains ${clientCount} clients. Skipping initial seed.`);
    return;
  }

  console.log('[DB] Seeding database with initial datasets...');

  // Seed Clients
  const insertClient = db.prepare(`
    INSERT INTO Clients (
      id, name, category, categoryLabel, principal, principalTitle, email, phone,
      specialistJson, activeChannelsJson, contentOutputJson, accountState,
      leadsCount, igHealth, roi, avatarBg, shortCode, createdAt
    ) VALUES (
      @id, @name, @category, @categoryLabel, @principal, @principalTitle, @email, @phone,
      @specialistJson, @activeChannelsJson, @contentOutputJson, @accountState,
      @leadsCount, @igHealth, @roi, @avatarBg, @shortCode, @createdAt
    )
  `);

  const seedClientsTransaction = db.transaction((clients) => {
    for (const c of clients) {
      insertClient.run({
        id: c.id,
        name: c.name,
        category: c.category,
        categoryLabel: c.categoryLabel,
        principal: c.principal,
        principalTitle: c.principalTitle,
        email: c.email,
        phone: c.phone,
        specialistJson: JSON.stringify(c.specialist),
        activeChannelsJson: JSON.stringify(c.activeChannels),
        contentOutputJson: JSON.stringify(c.contentOutput),
        accountState: c.accountState,
        leadsCount: c.leadsCount,
        igHealth: c.igHealth,
        roi: c.roi,
        avatarBg: c.avatarBg,
        shortCode: c.shortCode,
        createdAt: new Date().toISOString(),
      });
    }
  });

  seedClientsTransaction(CLIENTS);
  console.log(`[DB] Seeded ${CLIENTS.length} clients.`);

  // Seed Social Posts
  const insertPost = db.prepare(`
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
      @scheduledTime, @publishedTime, @likes, @comments, @leadsGenerated,
      @urgentSla, @slaRemaining, @errorReason, @approvalHistoryJson,
      @verificationChecklistJson, @createdAt
    )
  `);

  const seedPostsTransaction = db.transaction((posts) => {
    for (const p of posts) {
      insertPost.run({
        id: p.id,
        postCode: p.postCode,
        clientId: p.clientId,
        clientName: p.clientName,
        clientAvatar: p.clientAvatar || '',
        type: p.type,
        formatLabel: p.formatLabel,
        title: p.title,
        caption: p.caption,
        hashtagsJson: JSON.stringify(p.hashtags || []),
        firstComment: p.firstComment || '',
        mediaUrlsJson: JSON.stringify(p.mediaUrls || []),
        status: p.status,
        creatorName: p.creatorName,
        creatorRole: p.creatorRole || '',
        approverName: p.approverName,
        approverRole: p.approverRole || '',
        scheduledDate: p.scheduledDate || '',
        scheduledTime: p.scheduledTime || '',
        publishedTime: p.publishedTime || '',
        likes: p.likes || 0,
        comments: p.comments || 0,
        leadsGenerated: p.leadsGenerated || 0,
        urgentSla: p.urgentSla || '',
        slaRemaining: p.slaRemaining || '',
        errorReason: p.errorReason || '',
        approvalHistoryJson: JSON.stringify(p.approvalHistory || []),
        verificationChecklistJson: JSON.stringify(p.verificationChecklist || null),
        createdAt: new Date().toISOString(),
      });
    }
  });

  seedPostsTransaction(POSTS);
  console.log(`[DB] Seeded ${POSTS.length} posts.`);

  // Seed Leads & Messages
  const insertLead = db.prepare(`
    INSERT INTO PatientLeads (
      id, name, phone, location, clientId, clientName, clientCategory,
      status, treatmentInterest, campaignAttribution, firstInquiryTime,
      lastMessageSnippet, unreadCount, assignedTo, doctorNotes,
      scheduledSlot, estimatedRevenue, createdAt
    ) VALUES (
      @id, @name, @phone, @location, @clientId, @clientName, @clientCategory,
      @status, @treatmentInterest, @campaignAttribution, @firstInquiryTime,
      @lastMessageSnippet, @unreadCount, @assignedTo, @doctorNotes,
      @scheduledSlot, @estimatedRevenue, @createdAt
    )
  `);

  const insertMsg = db.prepare(`
    INSERT INTO WhatsAppMessages (
      id, leadId, sender, senderName, text, timestamp, isTemplate, createdAt
    ) VALUES (
      @id, @leadId, @sender, @senderName, @text, @timestamp, @isTemplate, @createdAt
    )
  `);

  const seedLeadsTransaction = db.transaction((leads) => {
    for (const l of leads) {
      insertLead.run({
        id: l.id,
        name: l.name,
        phone: l.phone,
        location: l.location || '',
        clientId: l.clientId,
        clientName: l.clientName,
        clientCategory: l.clientCategory || '',
        status: l.status,
        treatmentInterest: l.treatmentInterest || '',
        campaignAttribution: l.campaignAttribution || '',
        firstInquiryTime: l.firstInquiryTime || '',
        lastMessageSnippet: l.lastMessageSnippet || '',
        unreadCount: l.unreadCount || 0,
        assignedTo: l.assignedTo || '',
        doctorNotes: l.doctorNotes || '',
        scheduledSlot: l.scheduledSlot || '',
        estimatedRevenue: l.estimatedRevenue || 0,
        createdAt: new Date().toISOString(),
      });

      if (l.messages && l.messages.length > 0) {
        for (const m of l.messages) {
          insertMsg.run({
            id: m.id,
            leadId: l.id,
            sender: m.sender,
            senderName: m.senderName,
            text: m.text,
            timestamp: m.timestamp,
            isTemplate: m.isTemplate ? 1 : 0,
            createdAt: new Date().toISOString(),
          });
        }
      }
    }
  });

  seedLeadsTransaction(LEADS);
  console.log(`[DB] Seeded ${LEADS.length} leads.`);

  // Seed Campaigns
  const insertCamp = db.prepare(`
    INSERT INTO Campaigns (
      id, name, format, spend, reach, clicks, leads, bookings,
      costPerLead, status, roi, createdAt
    ) VALUES (
      @id, @name, @format, @spend, @reach, @clicks, @leads, @bookings,
      @costPerLead, @status, @roi, @createdAt
    )
  `);

  const seedCampaignsTransaction = db.transaction((campaigns) => {
    for (const camp of campaigns) {
      insertCamp.run({
        id: camp.id,
        name: camp.name,
        format: camp.format,
        spend: camp.spend,
        reach: camp.reach,
        clicks: camp.clicks,
        leads: camp.leads,
        bookings: camp.bookings,
        costPerLead: camp.costPerLead,
        status: camp.status,
        roi: camp.roi,
        createdAt: new Date().toISOString(),
      });
    }
  });

  seedCampaignsTransaction(CAMPAIGNS);
  console.log(`[DB] Seeded ${CAMPAIGNS.length} campaigns.`);

  // Initial Audit Logs
  db.prepare(`
    INSERT INTO SqlAuditLogs (query, durationMs, rowCount, timestamp)
    VALUES ('SELECT * FROM Clients WHERE AccountStatus = ?', 14, 16, datetime('now'))
  `).run();
  db.prepare(`
    INSERT INTO SqlAuditLogs (query, durationMs, rowCount, timestamp)
    VALUES ('SELECT * FROM SocialPosts WHERE Status = ?', 18, 9, datetime('now'))
  `).run();
  db.prepare(`
    INSERT INTO SqlAuditLogs (query, durationMs, rowCount, timestamp)
    VALUES ('SELECT * FROM PatientLeads ORDER BY EstimatedRevenue DESC', 12, 84, datetime('now'))
  `).run();
}

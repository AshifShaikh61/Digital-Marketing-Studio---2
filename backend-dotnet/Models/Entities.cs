using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MohdDigital.Api.Models
{
    [Table("Clients")]
    public class Client
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string? CategoryLabel { get; set; }
        public string Principal { get; set; } = string.Empty;
        public string? PrincipalTitle { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? SpecialistJson { get; set; }
        public string? ActiveChannelsJson { get; set; }
        public string? ContentOutputJson { get; set; }
        public string AccountState { get; set; } = "Active";
        public int LeadsCount { get; set; }
        public string? IgHealth { get; set; }
        public string? Roi { get; set; }
        public string? AvatarBg { get; set; }
        public string? ShortCode { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("SocialPosts")]
    public class SocialPost
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public string ClientId { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public string? ClientAvatar { get; set; }
        public string Type { get; set; } = "Single Post";
        public string FormatLabel { get; set; } = "1:1 Feed Post";
        public string Title { get; set; } = string.Empty;
        public string Caption { get; set; } = string.Empty;
        public string? HashtagsJson { get; set; }
        public string? FirstComment { get; set; }
        public string MediaUrlsJson { get; set; } = "[]";
        public string Status { get; set; } = "Pending Approval";
        public string CreatorName { get; set; } = string.Empty;
        public string? CreatorRole { get; set; }
        public string ApproverName { get; set; } = string.Empty;
        public string? ApproverRole { get; set; }
        public string? ScheduledDate { get; set; }
        public string? ScheduledTime { get; set; }
        public string? PublishedTime { get; set; }
        public int Likes { get; set; }
        public int Comments { get; set; }
        public int LeadsGenerated { get; set; }
        public string? UrgentSla { get; set; }
        public string? SlaRemaining { get; set; }
        public string? ErrorReason { get; set; }
        public string? ApprovalHistoryJson { get; set; }
        public string? VerificationChecklistJson { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    [Table("PatientLeads")]
    public class PatientLead
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? Location { get; set; }
        public string ClientId { get; set; } = string.Empty;
        public string ClientName { get; set; } = string.Empty;
        public string? ClientCategory { get; set; }
        public string Status { get; set; } = "New Consultation";
        public string? TreatmentInterest { get; set; }
        public string? CampaignAttribution { get; set; }
        public string? FirstInquiryTime { get; set; }
        public string? LastMessageSnippet { get; set; }
        public int UnreadCount { get; set; }
        public string? AssignedTo { get; set; }
        public string? DoctorNotes { get; set; }
        public string? ScheduledSlot { get; set; }
        public int EstimatedRevenue { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<WhatsAppMessage> Messages { get; set; } = new();
    }

    [Table("WhatsAppMessages")]
    public class WhatsAppMessage
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string LeadId { get; set; } = string.Empty;
        public string Sender { get; set; } = "agent"; // 'agent' | 'user' | 'doctor'
        public string SenderName { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public string Timestamp { get; set; } = string.Empty;
        public bool IsTemplate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("LeadId")]
        public PatientLead? Lead { get; set; }
    }

    [Table("Campaigns")]
    public class Campaign
    {
        [Key]
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Format { get; set; } = string.Empty;
        public int Spend { get; set; }
        public int Reach { get; set; }
        public int Clicks { get; set; }
        public int Leads { get; set; }
        public int Bookings { get; set; }
        public double CostPerLead { get; set; }
        public string Status { get; set; } = "Active";
        public string Roi { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

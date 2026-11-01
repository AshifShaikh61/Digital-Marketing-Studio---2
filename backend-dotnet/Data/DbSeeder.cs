using System.Text.Json;
using MohdDigital.Api.Models;

namespace MohdDigital.Api.Data
{
    public static class DbSeeder
    {
        public static void SeedData(MohdDigitalDbContext context)
        {
            if (context.Clients.Any())
            {
                return; // Already seeded
            }

            // Seed initial 3 primary clients
            context.Clients.AddRange(new List<Client>
            {
                new Client
                {
                    Id = "client-citycare",
                    Name = "City Care Clinic",
                    Category = "Clinic",
                    CategoryLabel = "Healthcare & Dental",
                    Principal = "Dr. Alok Mehta",
                    PrincipalTitle = "Multispeciality Medical Director",
                    Email = "alok.mehta@citycareclinic.in",
                    Phone = "+91 98201 44521",
                    SpecialistJson = JsonSerializer.Serialize(new { name = "Rahul Sharma", role = "Senior Strategist", avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }),
                    ActiveChannelsJson = JsonSerializer.Serialize(new { instagram = "Live", whatsapp = "Biz" }),
                    ContentOutputJson = JsonSerializer.Serialize(new { published = 28, inReview = 2, pending = 4 }),
                    AccountState = "Active",
                    LeadsCount = 84,
                    IgHealth = "99.4% Active",
                    Roi = "+29.2% ROI",
                    AvatarBg = "bg-indigo-100 text-indigo-700 border-indigo-200",
                    ShortCode = "CC"
                },
                new Client
                {
                    Id = "client-fitzone",
                    Name = "FitZone Fitness Studio",
                    Category = "Gym",
                    CategoryLabel = "Crossfit & HIIT",
                    Principal = "Vikram Malhotra",
                    PrincipalTitle = "Managing Partner",
                    Email = "vikram@fitzonestudio.com",
                    Phone = "+91 97112 88390",
                    SpecialistJson = JsonSerializer.Serialize(new { name = "Arjun Patel", role = "Growth Lead", avatarUrl = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" }),
                    ActiveChannelsJson = JsonSerializer.Serialize(new { instagram = "Live", whatsapp = "Biz" }),
                    ContentOutputJson = JsonSerializer.Serialize(new { published = 42, inReview = 0, pending = 6 }),
                    AccountState = "Active",
                    LeadsCount = 112,
                    IgHealth = "100% Active",
                    Roi = "+34.8% ROI",
                    AvatarBg = "bg-emerald-100 text-emerald-700 border-emerald-200",
                    ShortCode = "FZ"
                },
                new Client
                {
                    Id = "client-spicegarden",
                    Name = "Spice Garden Restaurant",
                    Category = "Restaurant",
                    CategoryLabel = "Fine Dining & Events",
                    Principal = "Chef Sanjeev Anand",
                    PrincipalTitle = "Executive Chef & Founder",
                    Email = "sanjeev@spicegardenbistro.com",
                    Phone = "+91 98114 77291",
                    SpecialistJson = JsonSerializer.Serialize(new { name = "Priya Kumar", role = "Content Lead", avatarUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" }),
                    ActiveChannelsJson = JsonSerializer.Serialize(new { instagram = "Live", whatsapp = "Biz" }),
                    ContentOutputJson = JsonSerializer.Serialize(new { published = 35, inReview = 4, pending = 3 }),
                    AccountState = "Active",
                    LeadsCount = 76,
                    IgHealth = "98.2% Active",
                    Roi = "+21.5% ROI",
                    AvatarBg = "bg-purple-100 text-purple-700 border-purple-200",
                    ShortCode = "SG"
                }
            });

            // Seed initial patient leads
            var lead = new PatientLead
            {
                Id = "lead-1",
                Name = "Amit Verma",
                Phone = "+91 98112 34091",
                Location = "South Extension II, New Delhi",
                ClientId = "client-citycare",
                ClientName = "City Care Clinic",
                ClientCategory = "Healthcare & Dental",
                Status = "New Consultation",
                TreatmentInterest = "Dental Root Canal & Crown",
                CampaignAttribution = "Meta Ad: Dental Pain Relief Reel",
                FirstInquiryTime = "2 mins ago",
                LastMessageSnippet = "Hi, is Dr. Mehta available tomorrow at 4 PM for dental root canal checkup? Please confirm charges.",
                UnreadCount = 1,
                AssignedTo = "Rahul Sharma",
                EstimatedRevenue = 8500
            };

            lead.Messages.Add(new WhatsAppMessage
            {
                Id = "msg-101",
                LeadId = "lead-1",
                Sender = "user",
                SenderName = "Amit Verma",
                Text = "Hi, is Dr. Mehta available tomorrow at 4 PM for dental root canal checkup? Please confirm charges.",
                Timestamp = "11:42 AM",
                IsTemplate = false
            });

            context.PatientLeads.Add(lead);

            context.SaveChanges();
        }
    }
}

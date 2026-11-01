using Microsoft.EntityFrameworkCore;
using MohdDigital.Api.Models;

namespace MohdDigital.Api.Data
{
    public class MohdDigitalDbContext : DbContext
    {
        public MohdDigitalDbContext(DbContextOptions<MohdDigitalDbContext> options) : base(options)
        {
        }

        public DbSet<Client> Clients => Set<Client>();
        public DbSet<SocialPost> SocialPosts => Set<SocialPost>();
        public DbSet<PatientLead> PatientLeads => Set<PatientLead>();
        public DbSet<WhatsAppMessage> WhatsAppMessages => Set<WhatsAppMessage>();
        public DbSet<Campaign> Campaigns => Set<Campaign>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PatientLead>()
                .HasMany(p => p.Messages)
                .WithOne(m => m.Lead)
                .HasForeignKey(m => m.LeadId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

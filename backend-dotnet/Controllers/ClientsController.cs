using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MohdDigital.Api.Data;
using MohdDigital.Api.Models;

namespace MohdDigital.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly MohdDigitalDbContext _context;

        public ClientsController(MohdDigitalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Client>>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(string id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return NotFound();
            return client;
        }

        [HttpPost]
        public async Task<ActionResult<Client>> CreateClient([FromBody] Client client)
        {
            if (string.IsNullOrEmpty(client.Id))
            {
                client.Id = $"client-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
            }
            client.CreatedAt = DateTime.UtcNow;

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }
    }
}

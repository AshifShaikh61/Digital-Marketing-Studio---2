using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MohdDigital.Api.Data;
using MohdDigital.Api.Models;

namespace MohdDigital.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly MohdDigitalDbContext _context;

        public PostsController(MohdDigitalDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SocialPost>>> GetPosts()
        {
            return await _context.SocialPosts.OrderByDescending(p => p.CreatedAt).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<SocialPost>> CreatePost([FromBody] SocialPost post)
        {
            if (string.IsNullOrEmpty(post.Id))
            {
                post.Id = $"post-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
            }
            if (string.IsNullOrEmpty(post.PostCode))
            {
                post.PostCode = $"#IG-{new Random().Next(1000, 9999)}";
            }
            post.CreatedAt = DateTime.UtcNow;

            _context.SocialPosts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApprovePost(string id)
        {
            var post = await _context.SocialPosts.FindAsync(id);
            if (post == null) return NotFound();

            post.Status = "Approved";
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        [HttpPut("{id}/reject")]
        public async Task<IActionResult> RejectPost(string id, [FromBody] RejectRequest request)
        {
            var post = await _context.SocialPosts.FindAsync(id);
            if (post == null) return NotFound();

            post.Status = "Changes Requested";
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        public class RejectRequest
        {
            public string Reason { get; set; } = string.Empty;
            public string Author { get; set; } = string.Empty;
        }
    }
}

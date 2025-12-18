using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GlassesController : ControllerBase
    {
        private readonly OptistyleDbContext _context;

        public GlassesController(OptistyleDbContext context)
        {
            _context = context;
        }

        // GET: api/glasses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Glasses>>> GetGlasses()
        {
            return await _context.Glasses.ToListAsync();
        }

        // GET: api/glasses/{sku}
        [HttpGet("{sku}")]
        public async Task<ActionResult<Glasses>> GetGlasses(int sku)
        {
            var glasses = await _context.Glasses.FindAsync(sku);

            if (glasses == null)
            {
                return NotFound();
            }

            return glasses;
        }

        // POST: api/glasses
        [HttpPost]
        public async Task<ActionResult<Glasses>> PostGlasses(Glasses glasses)
        {
            _context.Glasses.Add(glasses);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGlasses), new { sku = glasses.SKU }, glasses);
        }

        // PUT: api/glasses/{sku}
        [HttpPut("{sku}")]
        public async Task<IActionResult> PutGlasses(int sku, Glasses glasses)
        {
            if (sku != glasses.SKU)
            {
                return BadRequest();
            }

            _context.Entry(glasses).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GlassesExists(sku))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/glasses/{sku}
        [HttpDelete("{sku}")]
        public async Task<IActionResult> DeleteGlasses(int sku)
        {
            var glasses = await _context.Glasses.FindAsync(sku);
            if (glasses == null)
            {
                return NotFound();
            }

            _context.Glasses.Remove(glasses);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GlassesExists(int sku)
        {
            return _context.Glasses.Any(e => e.SKU == sku);
        }
    }
}
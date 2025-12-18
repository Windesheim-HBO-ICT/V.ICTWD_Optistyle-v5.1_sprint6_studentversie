using System.Security.Claims;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly OptistyleDbContext _context;

        public CartController(OptistyleDbContext context)
        {
            _context = context;
        }

        private string GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                throw new InvalidOperationException("UserId could not be verified.");
            }
            return userId;
        }

        public class CartItemDto
        {
            public int Sku { get; set; }
            public string Name { get; set; } = string.Empty;
            public decimal Price { get; set; }
            public int Quantity { get; set; }
        }

        public class AddToCartRequest
        {
            public int Sku { get; set; }
            public int Quantity { get; set; } = 1;
        }

        // GET: api/cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCart()
        {
            var userId = GetUserId();

            var items = await (from c in _context.CartItems
                               join g in _context.Glasses on c.SKU equals g.SKU
                               where c.UserId == userId
                               select new CartItemDto
                               {
                                   Sku = c.SKU,
                                   Name = g.Name,
                                   Price = g.Price,
                                   Quantity = c.Quantity
                               }).ToListAsync();

            return Ok(items);
        }

        // POST: api/cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetUserId();

            var existing = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.SKU == request.Sku);

            if (existing == null)
            {
                var newItem = new CartItem
                {
                    UserId = userId,
                    SKU = request.Sku,
                    Quantity = request.Quantity < 1 ? 1 : request.Quantity
                };
                _context.CartItems.Add(newItem);
            }
            else
            {
                existing.Quantity += request.Quantity < 1 ? 1 : request.Quantity;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cart/{sku}
        [HttpDelete("{sku}")]
        public async Task<IActionResult> RemoveFromCart(int sku)
        {
            var userId = GetUserId();

            var item = await _context.CartItems
                .FirstOrDefaultAsync(c => c.UserId == userId && c.SKU == sku);

            if (item == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/cart
        [HttpDelete]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();

            var items = _context.CartItems.Where(c => c.UserId == userId);
            _context.CartItems.RemoveRange(items);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

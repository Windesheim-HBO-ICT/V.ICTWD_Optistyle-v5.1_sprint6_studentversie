using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class OptistyleDbContext : DbContext
    {
        public OptistyleDbContext(DbContextOptions<OptistyleDbContext> options)
            : base(options)
        {
        }

        public DbSet<Glasses> Glasses { get; set; }

        public DbSet<CartItem> CartItems { get; set; }
    }
}
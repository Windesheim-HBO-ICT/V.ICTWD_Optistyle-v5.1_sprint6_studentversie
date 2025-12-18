using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        // IdentityUser.Id (string)
        [Required]
        public string UserId { get; set; } = default!;

        [Required]
        public int SKU { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;
    }
}

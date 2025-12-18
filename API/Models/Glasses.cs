using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Glasses
    {
        [Key]
        public int SKU { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }= string.Empty;
        public string ImageAlt { get; set; }
    }
}

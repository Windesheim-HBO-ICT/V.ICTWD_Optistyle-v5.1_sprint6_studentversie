using System.ComponentModel.DataAnnotations;

namespace MailApi.Models
{
    public class ContactRequest
    {
        [Display(Name = "Voor- en achternaam")]
        [Required(ErrorMessage = "Vul uw voor- en achternaam in.")]
        [StringLength(50, ErrorMessage = "Maximaal 50 tekens.")]
        // Unicode letters + spaties (accenten inbegrepen via \p{L})
        [RegularExpression(@"^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$", ErrorMessage = "Alleen letters en spaties zijn toegestaan.")]
        public string? Name { get; set; } = string.Empty;

        [Display(Name = "Telefoonnummer")]
        [Required(ErrorMessage = "Vul uw telefoonnummer in.")]
        // Optioneel '+' aan het begin, daarna 1–15 cijfers (E.164-compatibel)
        [RegularExpression(@"^\+?[0-9]{1,15}$", ErrorMessage = "Vul een geldig telefoonnummer in (max. 15 cijfers, optioneel '+' aan het begin).")]
        [DataType(DataType.PhoneNumber)]
        public string? Phone { get; set; } = string.Empty;

        public string? MiddleName { get; set; } // Honeypot veld
    }
}

using MailApi.Models;
using MailApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MailApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public MailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        // POST: api/mail
        [HttpPost("send")]   
        public async Task<IActionResult> SendAsync([FromBody] MailRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.To) || string.IsNullOrWhiteSpace(request.Body) || string.IsNullOrWhiteSpace(request.Subject))
            {
                return BadRequest(new { ok = false, message = "emailadres, subject en mailtekst zijn verplicht" });
            }

            var success = await _emailService.SendAsync(request.To, request.Subject, request.Body);

            if (!success)
            {
                return StatusCode(500, new { ok = false, message = "Kon de e-mail niet verzenden." });
            }

            return Ok(new { ok = true, message = "Uw verzoek is ontvangen. We nemen contact op." });
        }
    }
}

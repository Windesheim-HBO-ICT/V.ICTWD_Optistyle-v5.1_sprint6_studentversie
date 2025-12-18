using System.Net;
using System.Net.Mail;
using System.Numerics;
using System.Xml.Linq;

namespace MailApi.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendAsync(string to, string subject, string body, CancellationToken ct = default)
        {
            var section = _config.GetSection("Smtp");

            var host = section["Host"];
            var port = int.Parse(section["Port"] ?? "2525");
            var user = section["UserName"];
            var pass = section["Password"];
            var from = section["From"];

            try
            {
                using var client = new SmtpClient(host, port)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(user, pass)
                };

                using var message = new MailMessage(from!, to!, subject, body);

                await client.SendMailAsync(message, ct);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

using MailApi.Models;

namespace MailApi.Services
{
    public interface IEmailService
    {
        Task<bool> SendAsync(string to, string subject, string body, CancellationToken ct=default);
    }
}

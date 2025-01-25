using PaymentService.Models;

namespace PaymentService.Services
{
    public interface IPayment
    {
        Task CreateTractionAsync(Guid userId, double? amount, string genre);
        Task CreateGenreAsync(string title);
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
        Task<IEnumerable<Transaction>> GetTransactionByUserIdAsync(Guid userId);
        Task<IEnumerable<Genre>> GetAllGenresAsync();
        Task<bool> SaveChangesAsync();
    }
}

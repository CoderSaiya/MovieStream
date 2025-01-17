using PaymentService.Models;

namespace PaymentService.Repository
{
    public interface IPayment
    {
        Task CreateTractionAsync(Guid userId, double? amount);
        Task CreateGenreAsync(string title);
        Task<IEnumerable<Transaction>> GetAllTransactionsAsync();
        Task<IEnumerable<Transaction>> GetTransactionByUserIdAsync(Guid userId);
        Task<IEnumerable<Genre>> GetAllGenresAsync();
        Task<bool> SaveChangesAsync();
    }
}

using Microsoft.EntityFrameworkCore;
using PaymentService.Data;
using PaymentService.Models;

namespace PaymentService.Repository
{
    public class PaymentRepo : IPayment
    {
        private readonly PaymentDbContext _context;

        public PaymentRepo(PaymentDbContext context)
        {
            _context = context;
        }

        public async Task CreateGenreAsync(string title)
        {
            var genre = new Genre
            {
                Name = title,
            };

            await _context.Genre.AddAsync(genre);
        }

        public async Task CreateTractionAsync(Guid userId, double? amount)
        {
            var transaction = new Transaction
            {
                UserId = userId,
                Amount = amount ?? 0.0
            };

            await _context.Transactions.AddAsync(transaction);
        }

        public async Task<IEnumerable<Genre>> GetAllGenresAsync()
        {
            return await _context.Genre.ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync()
        {
            return await _context.Transactions.ToListAsync();
        }

        public async Task<IEnumerable<Transaction>> GetTransactionByUserIdAsync(Guid userId)
        {
            return await _context.Transactions
                .Where(t => t.UserId == userId)
                .Include(t => t.Genre)
                .ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

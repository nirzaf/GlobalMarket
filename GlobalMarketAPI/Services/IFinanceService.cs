using GlobalMarketAPI.Models;

namespace GlobalMarketAPI.Services
{
    public interface IFinanceService
    {
        Task<Quote> GetQuote(string symbol);
    }
}

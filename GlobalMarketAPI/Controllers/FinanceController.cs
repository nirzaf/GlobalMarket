using Microsoft.AspNetCore.Mvc;
using GlobalMarketAPI.Services;
using GlobalMarketAPI.Models;

namespace GlobalMarketAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinanceController : ControllerBase
    {
        IFinanceService _financeService;
        public FinanceController(IFinanceService financeService)
        {
            _financeService = financeService;
        }

        [HttpGet]
        [Route("quote")]
        public async Task<Quote> GetQuote([FromQuery] string symbol)
        {
            return await _financeService.GetQuote(symbol);
        }
    }
}

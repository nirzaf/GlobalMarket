using GlobalMarketAPI.Models;
using Newtonsoft.Json;
using GlobalMarketAPI.Settings;

namespace GlobalMarketAPI.Services
{
    public class FinanceService : IFinanceService
    {
        private readonly HttpClient _httpClient;
        const string QuoteURL = "v6/finance/quote";
        private readonly Dictionary<string, string> _symbolMap = new Dictionary<string, string>();


        public FinanceService(YahooFinanceSettings settings)
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Add("X-API-KEY", new[] { settings.APIKey });
            _httpClient.BaseAddress = new Uri(settings.BaseURL ?? "");
            if (settings.SymbolMapInfo != null && settings.SymbolMapInfo.Count > 0)
            {
                _symbolMap = settings.SymbolMapInfo.ToDictionary(x => x.Key, x => x.Value);
            }
        }

        public async Task<Quote> GetQuote(string symbol)
        {
            symbol = _symbolMap.ContainsKey(symbol) ? _symbolMap[symbol] : symbol;
            var url = QuoteURL + $"?symbols={symbol}";
            try
            {
                var data = await _httpClient.GetStringAsync(url);
                var result = JsonConvert.DeserializeObject<YahooQuoteResponse>(data);
                return result?.QuoteResponse?.Result?.FirstOrDefault() ?? new Quote();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

namespace GlobalMarketAPI.Settings
{
    public class YahooFinanceSettings
    {
        public string? APIKey { get; set; }
        public string? BaseURL { get; set; }
        public Dictionary<string, string>? SymbolMapInfo
        {
            get;
            set;
        }
    }
}

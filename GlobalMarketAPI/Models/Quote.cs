namespace GlobalMarketAPI.Models
{
    public class Quote
    {
        public string? ShortName { get; set; }

        public string? FullExchangeName { get; set; }

        public string? QuoteType { get; set; }

        public decimal RegularMarketPrice { get; set; }

        public decimal RegularMarketDayHigh { get; set; }

        public decimal RegularMarketDayLow { get; set; }

        public decimal Bid { get; set; }

        public decimal Ask { get; set; }
    }
}

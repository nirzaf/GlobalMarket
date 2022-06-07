export interface Quote {
  shortName: string;
  fullExchangeName: string;
  quoteType: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  bid: number;
  ask: number;
}

export interface DataItem {
  name: string;
  value: number;
}

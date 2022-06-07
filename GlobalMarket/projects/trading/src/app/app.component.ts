import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ITradingViewWidget, Themes } from 'tradingview-widget'
import { Quote, DataItem } from './app.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Global Market';

  widgetConfig: ITradingViewWidget = {
    symbol: 'MSFT',
    widgetType: 'widget',
    allow_symbol_change: true,
    height: 540,
    width: 980,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    theme: Themes.LIGHT,
  };

  symbols = ['MSFT',
    'AAPL',
    'AMZN',
    'TSLA',
    'WTC',
    'BTCUSD',
    'ETHUSD',
    'CLN2022'
  ];

  public quote?: Quote;
  public data: DataItem[] = [];

  public isProgressing: boolean = false;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.isProgressing = true;
    this.http.get<Quote>(`/api/finance/quote?symbol=${this.widgetConfig.symbol}`).subscribe(result => {
      this.quote = result;
      this.data = [
        { name: "Price", value: this.quote.regularMarketPrice },
        { name: "Day High", value: this.quote.regularMarketDayHigh },
        { name: "Day Low", value: this.quote.regularMarketDayLow },
        { name: "Ask", value: this.quote.ask },
        { name: "Bid", value: this.quote.bid },
      ];
      this.isProgressing = false;
    }, error => console.error(error));
  }

  onSymbolChange(event: any) {
    this.widgetConfig = {
      symbol: event,
      widgetType: 'widget',
      allow_symbol_change: true,
      height: 560,
      width: 980,
      hideideas: true,
      hide_legend: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      theme: Themes.LIGHT,
    };
    this.ngOnInit();
  }

  drop(event: CdkDragDrop<DataItem[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}


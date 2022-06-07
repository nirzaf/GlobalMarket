import { TestBed } from '@angular/core/testing';

import { TradingviewWidgetService } from './tradingview-widget.service';

describe('TradingviewWidgetService', () => {
  let service: TradingviewWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingviewWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

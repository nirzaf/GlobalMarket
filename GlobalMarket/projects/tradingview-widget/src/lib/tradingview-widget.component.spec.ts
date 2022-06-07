import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingviewWidgetComponent } from './tradingview-widget.component';

describe('TradingviewWidgetComponent', () => {
  let component: TradingviewWidgetComponent;
  let fixture: ComponentFixture<TradingviewWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingviewWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingviewWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

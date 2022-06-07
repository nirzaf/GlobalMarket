import { Component, Input, OnInit } from '@angular/core';
import { BarStyles, CONTAINER_ID, IntervalTypes, ITradingViewWidget, SCRIPT_ID, Themes } from './tradingview-widget.model';

declare const TradingView: any;

@Component({
  selector: 'tradingview-widget',
  template: `
    <section [id]="containerId"> </section>
  `,
  styles: []
})
export class TradingviewWidgetComponent implements OnInit {

  private _widgetConfig: ITradingViewWidget = {};
  private _defaultConfig: ITradingViewWidget = {
    symbol: 'NASDAQ:AAPL',
    allow_symbol_change: true,
    autosize: false,
    enable_publishing: false,
    height: 610,
    hideideas: true,
    hide_legend: false,
    hide_side_toolbar: true,
    hide_top_toolbar: false,
    interval: IntervalTypes.D,
    locale: 'en',
    save_image: true,
    show_popup_button: false,
    style: BarStyles.CANDLES,
    theme: Themes.LIGHT,
    timezone: 'Etc/UTC',
    toolbar_bg: '#F1F3F6',
    widgetType: 'widget',
    width: 980,
    withdateranges: false
  };

  style: {} = {};
  containerId = CONTAINER_ID;

  @Input('widgetConfig') set widgetConfig(value: ITradingViewWidget) {
    this._widgetConfig = value;
    this.cleanWidget();
    this.initWidget();
  }

  get widgetConfig(): ITradingViewWidget {
    return this._widgetConfig || this._defaultConfig;
  }

  constructor() { }

  ngOnInit(): void {
    this.appendScript(this.initWidget.bind(this));
  }

  initWidget() {
    /* global TradingView */
    if (typeof TradingView === 'undefined' || !this.getContainer()) return;

    const { widgetType, ...widgetConfig } = this.widgetConfig;
    const config = { ...widgetConfig, container_id: this.containerId };

    if (config.autosize) {
      delete config.width;
      delete config.height;
    }


    if (config.popup_width && typeof config.popup_width === 'number') {
      config.popup_width = config.popup_width.toString();
    }

    if (config.popup_height && typeof config.popup_height === 'number') {
      config.popup_height = config.popup_height.toString();
    }

    if (config.autosize) {
      this.style = {
        width: '100%',
        height: '100%'
      };
    }
    /* global TradingView */
    new TradingView[widgetType!](config);
  };

  appendScript(onload : any) {
    if (!this.canUseDOM()) {
      onload();
      return;
    }

    if (this.scriptExists()) {
      /* global TradingView */
      if (typeof TradingView === 'undefined') {
        this.updateOnloadListener(onload);
        return;
      }
      onload();
      return;
    }
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/tv.js';
    script.onload = onload;
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  canUseDOM() {
    return typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
  }

  scriptExists() {
    return this.getScriptElement() !== null;
  }

  updateOnloadListener(onload: any) {
    const script = this.getScriptElement();
    const oldOnload: any = script!.onload!.bind(script!);
    return script!.onload = () => {
      oldOnload();
      onload();
    };
  };

  getScriptElement() {
    return document.getElementById(SCRIPT_ID);
  }

  cleanWidget() {
    if (!this.canUseDOM()) return;
    const container = this.getContainer();
    if (container) {
      container.innerHTML = '';
    }
  };

  getContainer() {
    return document.getElementById(this.containerId);
  }



}

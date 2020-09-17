import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { createCustomElement } from '@angular/elements';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, ChartComponent],
  imports: [BrowserModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const element = createCustomElement(ChartComponent, {
      injector: this.injector,
    });
    customElements.define('ge-chart', element);
  }
}

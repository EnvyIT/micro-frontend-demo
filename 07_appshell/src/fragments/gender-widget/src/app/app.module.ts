import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { ChartComponent } from './chart/chart.component';
import { createCustomElement } from '@angular/elements';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [BrowserModule, ChartsModule],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const chartElement = createCustomElement(ChartComponent, {injector: this.injector});
    customElements.define('me-chart-fragment', chartElement);
  }

}

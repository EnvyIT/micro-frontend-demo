import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { ChartComponent } from './chart/chart.component';
import { createCustomElement } from '@angular/elements';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartComponent],
  imports: [BrowserModule, ChartsModule],
  providers: [],
  bootstrap: [ChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

  constructor(injector: Injector) {
    const chartElement = createCustomElement(ChartComponent, {injector});
    customElements.define('me-chart-fragment', chartElement);
  }

}

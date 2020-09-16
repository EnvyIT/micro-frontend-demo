import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, EmptyRouteComponent, PieChartComponent],
  imports: [BrowserModule, AppRoutingModule, ChartsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

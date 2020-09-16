import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { MeComponent } from './me.component';
import { MeRoutingModule } from './me-routing.module';

@NgModule({
  declarations: [MeComponent, EmptyRouteComponent],
  imports: [BrowserModule, MeRoutingModule],
  providers: [],
  bootstrap: [MeComponent],
})
export class MeModule {}

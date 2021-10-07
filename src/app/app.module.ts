import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheckoutSiteComponent } from './checkout-site/checkout-site.component';
import { StatisticSiteComponent } from './statistic-site/statistic-site.component';
import { SaleItemComponent } from './checkout-site/sale-item/sale-item.component';
import { EventManagementSiteComponent } from './event-management-site/event-management-site.component';
import { SinglePlotComponent } from './statistic-site/single-plot/single-plot.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  declarations: [
    AppComponent,
    CheckoutSiteComponent,
    StatisticSiteComponent,
    SaleItemComponent,
    EventManagementSiteComponent,
    SinglePlotComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    SelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

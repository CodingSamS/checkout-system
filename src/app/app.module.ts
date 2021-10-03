import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheckoutSiteComponent } from './checkout-site/checkout-site.component';
import { StatisticSiteComponent } from './statistic-site/statistic-site.component';
import { SaleItemComponent } from './checkout-site/sale-item/sale-item.component';
import { EventManagementSiteComponent } from './event-management-site/event-management-site.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutSiteComponent,
    StatisticSiteComponent,
    SaleItemComponent,
    EventManagementSiteComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

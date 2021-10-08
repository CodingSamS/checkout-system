import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CheckoutSiteComponent } from './checkout-site/checkout-site.component';
import { StatisticSiteComponent } from './statistic-site/statistic-site.component';
import { SaleItemComponent } from './checkout-site/sale-item/sale-item.component';
import { EventManagementSiteComponent } from './event-management-site/event-management-site.component';
import { SinglePlotComponent } from './statistic-site/single-plot/single-plot.component';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { EventConfigTableComponent } from './event-management-site/event-config-table/event-config-table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toasts/toast/toast.component'
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CheckoutSiteComponent,
    StatisticSiteComponent,
    SaleItemComponent,
    EventManagementSiteComponent,
    SinglePlotComponent,
    EventConfigTableComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    SelectDropDownModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

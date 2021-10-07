import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'checkout-system';
  activeSite: string;

  constructor() {
    this.activeSite = "EventManagement";
  }

  doCheckout(): void {
    this.activeSite = "Checkout";
  }

  doStatistic(): void {
    this.activeSite = "Statistic";
  }

  doEvents(): void {
    this.activeSite = "EventManagement"
  }
}

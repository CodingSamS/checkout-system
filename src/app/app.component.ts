import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'checkout-system';
  activeSite: string;
  checkoutLock: boolean;

  constructor(  ) {
    this.activeSite = "EventManagement";
    this.checkoutLock = false;
  }

  doCheckout(): void {
    this.activeSite = "Checkout";
  }

  applyCheckoutLock(checkoutLock: boolean): void {
    console.log(checkoutLock)
    this.checkoutLock = checkoutLock;
  }

  doStatistic(): void {
    this.activeSite = "Statistic";
  }

  doEvents(): void {
    this.activeSite = "EventManagement"
  }
}

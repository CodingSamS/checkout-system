import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'checkout-system';
  checkout: boolean;

  constructor() {
    this.checkout = true;
  }

  doCheckout(): void {
    this.checkout = true;
  }

  doStatistic(): void {
    this.checkout = false;
  }
}

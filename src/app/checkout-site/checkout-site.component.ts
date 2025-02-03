import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";
import {EventStandalone, EventStandaloneSimple} from "../event";
import { ToastService } from "../toasts/toast.service";

@Component({
    selector: 'app-checkout-site',
    templateUrl: './checkout-site.component.html',
    styleUrls: ['./checkout-site.component.scss'],
    standalone: false
})
export class CheckoutSiteComponent implements OnInit {

  eventData: EventStandaloneSimple;
  sum: number;
  @Output() checkoutLock = new EventEmitter<boolean>();

  constructor(private databaseAccess: DatabaseAccessService, private toastService: ToastService) {
    this.eventData = {
      eventName: "No Event selected",
      items: []
    };
    this.sum = 0;
  }

  ngOnInit(): void {
    const newestEvent: EventStandalone | undefined = this.databaseAccess.getCurrentEvent();
    if (newestEvent != undefined) {
      for (const item of newestEvent.items) {
        this.eventData.items.push({
          "name": item.name,
          "price": item.price,
          "counter": 0
        });
      }
      this.eventData.eventName = newestEvent.eventName;
    }
  }

  updateSum(): void {
    let sum = 0;
    for (const item of this.eventData.items) {
      sum += item.counter * item.price;
    }
    this.sum = sum;
    this.lockCheckout();
  }

  lockCheckout(): void {
    for (const item of this.eventData.items) {
      if (item.counter != 0) {
        this.checkoutLock.emit(true);
        return;
      }
    }
    this.checkoutLock.emit(false);
  }

  getColSize(): string {
    const numberOfItems = this.eventData.items.length;
    if (numberOfItems <= 9) {
      return "col-4"
    } else {
      if (numberOfItems <= 12) {
        return "col-3"
      } else {
        return "col-2"
      }
    }
  }

  reset(): void {
    for (const items of this.eventData.items) {
      items.counter = 0;
    }
    this.sum = 0;
    this.checkoutLock.emit(false);
  }

  submit(internal: boolean): void {
    this.databaseAccess.updateCounter(this.eventData, internal);
    this.toastService.showSuccess( "Eingabe erfolgreich");
    this.reset();
  }

}

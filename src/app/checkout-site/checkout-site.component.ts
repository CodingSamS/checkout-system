import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";
import {EventStandalone, EventStandaloneSimple} from "../event";
import { ToastService } from "../toasts/toast.service";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.scss']
})
export class CheckoutSiteComponent implements OnInit {

  eventData: EventStandaloneSimple;

  constructor(private databaseAccess: DatabaseAccessService, private toastService: ToastService) {
    this.eventData = {
      eventName: "No Event selected",
      items: []
    }
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

  getSum(): number {
    let sum = 0;
    for (const item of this.eventData.items) {
      sum += item.counter * item.price;
    }
    return sum;
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
      items.counter = 0
    }
  }

  submit(internal: boolean): void {
    this.databaseAccess.updateCounter(this.eventData, internal);
    this.toastService.showSuccess( "Eingabe erfolgreich");
    this.reset();
  }

}

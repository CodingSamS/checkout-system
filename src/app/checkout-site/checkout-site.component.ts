import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";
import { CheckoutItem, Event } from "../event";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.scss']
})
export class CheckoutSiteComponent implements OnInit {

  eventName: string;
  data: Record<string, CheckoutItem>;
  dataKeyset: Array<string>;

  constructor(private databaseAccess: DatabaseAccessService) {
    this.data = {};
    this.dataKeyset = [];
    this.eventName = "No Event Selected";
  }

  ngOnInit(): void {
    const newestEvent: Event | undefined = this.databaseAccess.getCurrentEvent();
    if (newestEvent != undefined) {
      this.dataKeyset = Object.keys(newestEvent.content.internal);
      for (const key in this.dataKeyset) {
        this.data[key] = {
          "name": newestEvent.content.internal[key].name,
          "price": newestEvent.content.internal[key].price,
          "counter": 0
        };
      }
      this.eventName = newestEvent.event;
    }
  }

  getDataArray(): Array<CheckoutItem> {
    return Object.values(this.data);
  }

  getSum(): number {
    let sum = 0;
    for (const key in this.dataKeyset){
      sum += this.data[key].counter * this.data[key].price;
    }
    return sum;
  }

  submit(internal: boolean): void {
    this.databaseAccess.writeDatabase(this.data, this.eventName, internal);
    this.ngOnInit();
  }

}

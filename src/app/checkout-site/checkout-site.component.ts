import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";
import { CheckoutItem, Event } from "../event";
import { ToastService } from "../toasts/toast.service";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.scss']
})
export class CheckoutSiteComponent implements OnInit {

  eventName: string;
  data: Record<string, CheckoutItem>;
  dataKeyset: Array<string>;

  // to do: change col-x based on the number of items (make it so, that 3 lines are used if possible - but at least 2 items per line)

  constructor(private databaseAccess: DatabaseAccessService, private toastService: ToastService) {
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

  getColSize(): string {
    const numberOfItems = this.dataKeyset.length;
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

  submit(internal: boolean): void {
    this.databaseAccess.writeDatabase(this.data, this.eventName, internal);
    this.toastService.showSuccess( "Eingabe erfolgreich");
    this.ngOnInit();
  }

}

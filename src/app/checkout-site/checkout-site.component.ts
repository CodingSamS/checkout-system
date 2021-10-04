import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.css']
})
export class CheckoutSiteComponent implements OnInit {

  data: Array<{name: string, price: number}> | undefined;
  eventName: string | undefined;

  constructor(private databaseAccess: DatabaseAccessService) {
  }

  ngOnInit(): void {
    const newestEvent = this.databaseAccess.getNewestEvent()
    this.data = newestEvent.content.internal.checkoutItems;
    this.eventName = newestEvent.event;
  }

  submit(): void {
    this.databaseAccess.writeDatabase();
  }

}

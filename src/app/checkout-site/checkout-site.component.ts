import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.css']
})
export class CheckoutSiteComponent implements OnInit {

  data: Array<{name: string, price: number}>;

  constructor(private databaseAccess: DatabaseAccessService) {
    this.data = [{
      "name": "Käse",
      "price": 1.50
      },
      {
        "name": "Schinken",
        "price": 3.20
      }];
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.databaseAccess.writeDatabase();
  }

}

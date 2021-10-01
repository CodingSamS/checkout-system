import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-checkout-site',
  templateUrl: './checkout-site.component.html',
  styleUrls: ['./checkout-site.component.css']
})
export class CheckoutSiteComponent implements OnInit {

  data: any[][];

  constructor(private databaseAccess: DatabaseAccessService) {
    this.data = [["Käse", 1.50], ["Schinken", 3.20]];
    console.log(this.data);
  }

  ngOnInit(): void {
  }

  submit(): void {
    this.databaseAccess.writeDatabase();
  }

}

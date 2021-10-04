import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css']
})

export class SaleItemComponent implements OnInit {

  counter: number;
  name: string | undefined;
  price: number | undefined;
  @Input() data: any | undefined;

  constructor() {
    this.counter = 0;
  }

  ngOnInit(): void {
    this.name = this.data?.name;
    this.price = this.data?.price;
  }

  increase(): void {
    this.counter += 1;
  }

  decrease(): void {
    this.counter -= 1;
  }

}


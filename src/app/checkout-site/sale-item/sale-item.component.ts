import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.css']
})
export class SaleItemComponent implements OnInit {

  counter: number;
  name: string;
  price: number;
  @Input() data: any[] | undefined;

  constructor() {
    this.counter = 0;
    console.log(this.data);
    this.name="1";
    this.price=1;
  }

  ngOnInit(): void {
  }

  increase(): void {
    this.counter += 1;
  }

  decrease(): void {
    this.counter -= 1;
  }

}

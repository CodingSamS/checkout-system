import { Component, OnInit, Input } from '@angular/core';
import { SimpleCheckoutItem } from "../../event";

@Component({
  selector: 'app-sale-item',
  templateUrl: './sale-item.component.html',
  styleUrls: ['./sale-item.component.scss']
})

export class SaleItemComponent implements OnInit {

  @Input() data: SimpleCheckoutItem | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  increase(): void {
    if (this.data != undefined) {
      this.data.counter += 1;
    }
  }

  decrease(): void {
    if (this.data != undefined) {
      this.data.counter -= 1;
    }
  }

}


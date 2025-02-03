import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CheckoutItemSimple } from "../../event";

@Component({
    selector: 'app-sale-item',
    templateUrl: './sale-item.component.html',
    styleUrls: ['./sale-item.component.scss'],
    standalone: false
})

export class SaleItemComponent implements OnInit {

  @Input() data: CheckoutItemSimple | undefined;
  @Output() valueChanged = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit(): void {
  }

  increase(): void {
    if (this.data != undefined) {
      this.data.counter += 1;
    }
    this.valueChanged.emit();
  }

  decrease(): void {
    if (this.data != undefined) {
      this.data.counter -= 1;
    }
    this.valueChanged.emit();
  }

}


import { Component, OnInit } from '@angular/core';
import { ToastService } from "../../toasts/toast.service";
import { CheckoutItem } from "../../event";
import {FormBuilder, FormGroup, FormControl, FormArray, Validators} from "@angular/forms";

@Component({
  selector: 'app-event-config-table',
  templateUrl: './event-config-table.component.html',
  styleUrls: ['./event-config-table.component.scss']
})
export class EventConfigTableComponent implements OnInit {

  itemForm: FormGroup;

  constructor(private toastService: ToastService, private fb: FormBuilder) {
    this.itemForm = fb.group({
      title: ['', [Validators.required]],
      items: fb.array([
        fb.group({
          name: ['', [Validators.required]],
          price: [0, [Validators.required]],
          counter: [0, [Validators.required]],
        })
      ])
    });
  }

  ngOnInit(): void {
  }
}
/*
  itemList: Array<CheckoutItem>;
  editField: string | undefined;
  valid: boolean;

  constructor(private toastService: ToastService) {
    this.itemList = [];
    this.valid = false;
  }


  add() {
    this.itemList.push({
      "name": "Bitte Namen eingeben",
      "price": 0,
      "counter": 0
    })
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  updateList(id: number, property: string, event: any) {
    if (property == "name") {
      this.itemList[id].name = event.target.textContent;
    } if (property == "price") {
      this.itemList[id].price = Number(event.target.textContent);
    } if (property == "counter") {
      this.itemList[id].counter = Number(event.target.textContent);
    }
  }

  remove(id: any) {
    this.itemList.splice(id, 1);
  }

  saveConfigTable(): void {
    this.toastService.showDanger("hallo welt")
    this.toastService.showSuccess("Speichern erfolgreich");
  }
*/


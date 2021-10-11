import {Component, Input, OnChanges } from '@angular/core';
import { ToastService } from "../../toasts/toast.service";
import {FormBuilder, FormGroup, FormArray, Validators} from "@angular/forms";
import {DatabaseAccessService} from "../../database-access.service";
import {CheckoutItem, Event} from "../../event";

@Component({
  selector: 'app-event-config-table',
  templateUrl: './event-config-table.component.html',
  styleUrls: ['./event-config-table.component.scss']
})
export class EventConfigTableComponent implements OnChanges {

  eventForm: FormGroup;
  @Input() selectedEvent: any;

  // to do:
  // validator: check if the Event already exists -> or: feedback when saving the event, or: asking if overwriting the event
  // delete button with confirmation dialog

  constructor(private toastService: ToastService, private fb: FormBuilder, private databaseAccess: DatabaseAccessService) {
    this.eventForm = this.fb.group({
      title: ['Name der Veranstaltung', [Validators.required]],
      items: this.fb.array([])
    });
  }

  ngOnChanges(): void {
    if (this.selectedEvent) {
      this.eventForm = this.fb.group({
        title: [this.selectedEvent, [Validators.required]],
        items: this.fb.array([])
      });
      let e = this.databaseAccess.getEventByName(this.selectedEvent);
      if(e) {
        let keySet = Object.keys(e.content.items)
        for(let i in keySet) {
          const itemForm = this.fb.group({
            name: [e.content.items[i].name, [Validators.required]],
            price: [e.content.items[i].price, [Validators.required]],
            counterInternal: [e.content.items[i].counterInternal, [Validators.required]],
            counterExternal: [e.content.items[i].counterExternal, [Validators.required]],
          })
          this.items.push(itemForm);
        }
      }
    } else {
      this.eventForm = this.fb.group({
        title: ['Name der Veranstaltung', [Validators.required]],
        items: this.fb.array([])
      });
    }
  }

  get items() {
    return this.eventForm.controls["items"] as FormArray;
  }

  deleteItem(lessonIndex: number) {
    this.items.removeAt(lessonIndex);
  }

  addItem() {
    const itemForm = this.fb.group({
      name: ['', [Validators.required]],
      price: [0, [Validators.required]],
      counterInternal: [0, [Validators.required]],
      counterExternal: [0, [Validators.required]]
    })
    this.items.push(itemForm);
  }

  setCurrentEvent(): void {
    if (this.selectedEvent) {
      let success = this.databaseAccess.setCurrentEvent(this.selectedEvent);
      if (success) {
        this.toastService.showSuccess("Setzen der Veranstaltung erfolgreich");
      } else {
        this.toastService.showDanger("Setzen der Veranstaltung fehlgeschlagen")
      }
    } else {
      this.toastService.showDanger("Setzen der Veranstaltung fehlgeschlagen")
    }

  }

  saveConfigTable(): void {
    if (this.eventForm.valid) {

      let items: Record<string, CheckoutItem> = {}

      for (let i = 0; i < this.items.controls.length; i++) {
        let fg = this.items.controls[i] as FormGroup;
        items[JSON.stringify(i)] = {
          name: fg.controls.name.value,
          price: fg.controls.price.value,
          counterInternal: fg.controls.counterInternal.value,
          counterExternal: fg.controls.counterExternal.value
        }
      }

      let event: Event = {
        event: this.eventForm.controls.title.value,
        content: {
          lastUpdated: new Date(),
          items: items
        }
      }

      this.databaseAccess.overwriteEvent(event);

      this.selectedEvent = event.event;

      this.toastService.showSuccess("Speichern erfolgreich");
    } else {
      this.toastService.showDanger("Die Eingabe enthält Fehler")
    }
  }

}

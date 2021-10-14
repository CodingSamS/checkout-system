import {Component, Input, OnChanges } from '@angular/core';
import { ToastService } from "../../toasts/toast.service";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import {DatabaseAccessService} from "../../database-access.service";
import {CheckoutItem, EventStandalone} from "../../event";

@Component({
  selector: 'app-event-config-table',
  templateUrl: './event-config-table.component.html',
  styleUrls: ['./event-config-table.component.scss']
})
export class EventConfigTableComponent implements OnChanges {

  eventForm: FormGroup;
  deleteRowState: Array<boolean>;
  @Input() selectedEvent: any;
  createUniqueTitleValidator: () => ValidatorFn;

  // to do:
  // delete button with confirmation dialog "bootstrap modal"
  // reset parent component if the event gets deleted (using output)
  // delete: be careful when changing the title to an existing one and deleting than -> shouldn't happen if i use the seletedEvent for deletions
  // after creating new event, it is not possible to create a second new element without switching dialogs

  constructor(private toastService: ToastService, private fb: FormBuilder, private databaseAccess: DatabaseAccessService) {
    this.deleteRowState = [];
    this.createUniqueTitleValidator = () => {
      return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if(!value) {
          return null;
        }

        const titleNotValid = (value != this.selectedEvent) && (this.databaseAccess.database[value] != undefined);

        return titleNotValid ? {titleNotValid:true}: null;
      }
    }
    this.eventForm = this.fb.group({
      title: ['Name der Veranstaltung', [Validators.required, this.createUniqueTitleValidator()]],
      items: this.fb.array([])
    });
  }

  ngOnChanges(): void {
    if (this.selectedEvent) {
      this.eventForm = this.fb.group({
        title: [this.selectedEvent, [Validators.required]],
        items: this.fb.array([])
      });
      let items = this.databaseAccess.getEventItems(this.selectedEvent);
      if(items) {
        for(const item of items) {
          const itemForm = this.fb.group({
            name: [item.name, [Validators.required]],
            price: [item.price, [Validators.required]],
            counterInternal: [item.counterInternal, [Validators.required]],
            counterExternal: [item.counterExternal, [Validators.required]],
          })
          this.items.push(itemForm);
          this.deleteRowState.push(false);
        }
      }
    } else {
      this.eventForm = this.fb.group({
        title: ['Name der Veranstaltung', [Validators.required, this.createUniqueTitleValidator()]],
        items: this.fb.array([])
      });
    }
  }

  get isSaveButtonActive(): boolean {
    return this.selectedEvent && this.selectedEvent == this.eventForm.controls["title"].value;
  }

  get items() {
    return this.eventForm.controls["items"] as FormArray;
  }

  changeDeleteRowState(itemIndex: number) {
    this.deleteRowState[itemIndex] = true;
    setTimeout(() => {
      this.deleteRowState[itemIndex] = false;
    }, 5000)
  }

  deleteItem(itemIndex: number) {
    this.items.removeAt(itemIndex);
    this.deleteRowState.splice(itemIndex, 1);
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

      let items: Array<CheckoutItem> = []

      for (let i = 0; i < this.items.controls.length; i++) {
        let fg = this.items.controls[i] as FormGroup;
        items.push({
          name: fg.controls.name.value,
          price: fg.controls.price.value,
          counterInternal: fg.controls.counterInternal.value,
          counterExternal: fg.controls.counterExternal.value
        })
      }

      let event: EventStandalone = {
        eventName: this.eventForm.controls.title.value,
        items: items
      }

      this.databaseAccess.overwriteEvent(event);

      this.selectedEvent = event.eventName;

      this.toastService.showSuccess("Speichern erfolgreich");
    } else {
      this.toastService.showDanger("Die Eingabe enthält Fehler")
    }
  }

}

import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { ToastService } from "../../toasts/toast.service";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  UntypedFormArray,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import {DatabaseAccessService} from "../../database-access.service";
import {CheckoutItem, EventStandalone} from "../../event";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

@Component({
    selector: 'app-event-config-table',
    templateUrl: './event-config-table.component.html',
    styleUrls: ['./event-config-table.component.scss'],
    standalone: false
})
export class EventConfigTableComponent implements OnChanges {

  eventForm: UntypedFormGroup;
  deleteRowState: Array<boolean>;
  @Input() selectedEvent: any;
  @Output() newEventCreated: EventEmitter<String>;
  @Output() currentEventDeleted: EventEmitter<null>;
  createUniqueTitleValidator: () => ValidatorFn;

  constructor(private toastService: ToastService, private fb: UntypedFormBuilder, private databaseAccess: DatabaseAccessService) {
    this.newEventCreated = new EventEmitter<String>();
    this.currentEventDeleted = new EventEmitter<null>();
    this.deleteRowState = [];
    this.createUniqueTitleValidator = () => {
      return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;

        if(!value) {
          return null;
        }

        const titleNotValid = (value != this.selectedEvent) && this.databaseAccess.database.hasOwnProperty(value);

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
        title: [this.selectedEvent, [Validators.required, this.createUniqueTitleValidator()]],
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

  get isSetButtonActive(): boolean {
    return this.selectedEvent && this.selectedEvent != this.databaseAccess.currentEventName && this.selectedEvent == this.eventForm.controls["title"].value;
  }

  get isDeleteButtonActive(): boolean {
    return this.selectedEvent && this.selectedEvent == this.eventForm.controls["title"].value;
  }

  get isSaveButtonActive(): boolean {
    return this.selectedEvent && this.selectedEvent == this.eventForm.controls["title"].value;
  }

  get items() {
    return this.eventForm.controls["items"] as UntypedFormArray;
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

  resetEvent(): void {
    for (let i = 0; i < this.items.length; i++) {
      this.items.at(i).patchValue({
        counterInternal: 0,
        counterExternal: 0
      })
    }
  }

  saveConfigTable(): void {
    if (this.eventForm.valid) {

      let items: Array<CheckoutItem> = []

      for (let i = 0; i < this.items.controls.length; i++) {
        let fg = this.items.controls[i] as UntypedFormGroup;
        items.push({
          name: fg.controls['name'].value,
          price: fg.controls['price'].value,
          counterInternal: fg.controls['counterInternal'].value,
          counterExternal: fg.controls['counterExternal'].value
        })
      }

      let event: EventStandalone = {
        eventName: this.eventForm.controls['title'].value,
        items: items
      }

      this.databaseAccess.overwriteEvent(event);

      if (this.selectedEvent != event.eventName) {
        this.selectedEvent = event.eventName;
        this.newEventCreated.emit(event.eventName);
      }

      this.toastService.showSuccess("Speichern erfolgreich");
    } else {
      this.toastService.showDanger("Die Eingabe enthält Fehler")
    }
  }

  deleteEvent(): void {
    this.databaseAccess.deleteEvent(this.selectedEvent);
    this.currentEventDeleted.emit();
  }

  drop(event: CdkDragDrop<string[]>) {
    let start_pos = event.previousIndex;
    let end_pos = event.currentIndex;

    if ( start_pos == end_pos ) {
      return;
    }

    let item = this.items.at(start_pos) ;

    this.items.removeAt(start_pos);
    this.items.insert(end_pos, item);
  }

}

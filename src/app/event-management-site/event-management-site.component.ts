import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-event-management-site',
  templateUrl: './event-management-site.component.html',
  styleUrls: ['./event-management-site.component.scss']
})
export class EventManagementSiteComponent implements OnInit {

  dropdownOptions: Array<{id: number, description: string}>;
  dropdownOptionsID: number;
  dropdownConfig: {};
  selectedEvent: any;
  modelData: any;

  // to do: does the select framework respect the order of the list of options?
  // to do: the select framework does not update after a new event is added - only after changing tabs
  // to do: the new event function does not create a new event if the currently displayed event was already created with the new button
  //        --> two way data binding of selectedEvent
  //        --> save notifier additionally: if the selectedEvent changes because of new event, also add it to the dropdown list

  constructor(private databaseAccess: DatabaseAccessService) {
    this.dropdownOptions = [];
    this.dropdownOptionsID = 0;
    this.dropdownConfig = {
      search: true,
      limitTo: 8,
      searchOnKey: 'description',
      placeholder: 'Wähle eine Veranstaltung aus',
      searchPlaceholder: 'Suche',
      noResultsFound: 'Keine Veranstaltung gefunden!'
    }
  }

  ngOnInit(): void {
    for (const eventKey of this.databaseAccess.getSortedKeyList(false)) {
      this.dropdownOptions.push({
        "id": this.dropdownOptionsID,
        "description": eventKey
      });
      this.dropdownOptionsID += 1;
    }
  }

  selectionChanged(data: any): void {
    this.selectedEvent = data.value.description;
  }

  newEvent(): void {
    this.modelData = undefined;
    this.selectedEvent = null;
  }
}

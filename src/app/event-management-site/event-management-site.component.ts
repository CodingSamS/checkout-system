import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
    selector: 'app-event-management-site',
    templateUrl: './event-management-site.component.html',
    styleUrls: ['./event-management-site.component.scss'],
    standalone: false
})
export class EventManagementSiteComponent implements OnInit {

  dropdownOptions: Array<{id: number, description: string}>;
  dropdownOptionsID: number;
  dropdownConfig: {};
  selectedEvent: any;
  modelData: any;

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

  addNewEvent(data: any): void {
    this.selectedEvent = data;
    this.dropdownOptions = [...this.dropdownOptions, {
      "id": this.dropdownOptionsID,
      "description": data
    }];
    this.dropdownOptionsID += 1;
  }

  currentEventDeleted(): void {
    let index = -1;
    for (let i = 0; i < this.dropdownOptions.length; i++) {
      if (this.dropdownOptions[i].description == this.selectedEvent) {
        index = i;
        break;
      }
    }
    if (0 <= index) {
      this.dropdownOptions.splice(index, 1);
    }
    this.dropdownOptions = [...this.dropdownOptions]; // for updating the dropdown menu4
    this.selectedEvent = undefined;
  }

  newEvent(): void {
    this.modelData = undefined;
    this.selectedEvent = null;
  }
}

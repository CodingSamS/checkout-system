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
    const database = this.databaseAccess.getSortedDatabase(false);
    for (let i = 0; i < database.length; i++) {
      this.dropdownOptions.push({
        "id": this.dropdownOptionsID,
        "description": database[i].event
      });
      this.dropdownOptionsID += 1;
    }
  }

  selectionChanged(data: any): void {
    this.selectedEvent = data.value.description;
  }

  newEvent(): void {
    this.modelData = undefined
    this.selectedEvent = null;
  }
}

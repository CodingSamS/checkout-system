import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-event-management-site',
  templateUrl: './event-management-site.component.html',
  styleUrls: ['./event-management-site.component.scss']
})
export class EventManagementSiteComponent implements OnInit {

  currentEvent: string;
  dropdownOptions: Array<{id: number, description: string}>;
  dropdownOptionsID: number;
  dropdownConfig: {};

  constructor(private databaseAccess: DatabaseAccessService) {
    this.currentEvent = "No Event Selected";
    this.dropdownOptions = [];
    this.dropdownOptionsID = 0;
    this.dropdownConfig = {
      search: true,
      limitTo: 10,
      searchOnKey: 'description',
      placeholder: 'Wähle eine Veranstaltung aus'
    }
  }

  ngOnInit(): void {
    const database = this.databaseAccess.getSortedDatabase(false);
    const currentE = this.databaseAccess.getCurrentEvent()
    if (currentE != undefined) {
      this.currentEvent = currentE.event;
    }
    for (let i = 0; i < database.length; i++) {
      this.dropdownOptions.push({
        "id": this.dropdownOptionsID,
        "description": database[i].event
      });
      this.dropdownOptionsID += 1;
    }

    // to do: ngx-select-dropdown: single select dropdown
  }

  selectionChanged(data: any): void {
    console.log(data);
  }

}

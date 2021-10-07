import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-event-management-site',
  templateUrl: './event-management-site.component.html',
  styleUrls: ['./event-management-site.component.scss']
})
export class EventManagementSiteComponent implements OnInit {

  currentEvent: string;
  eventList: Array<string>;

  constructor(private databaseAccess: DatabaseAccessService) {
    this.currentEvent = "No Event Selected";
    this.eventList = [];
  }

  ngOnInit(): void {
    const database = this.databaseAccess.getSortedDatabase(false);
    const currentE = this.databaseAccess.getCurrentEvent()
    if (currentE != undefined) {
      this.currentEvent = currentE.event;
    }
    for (let i = 0; i < database.length; i++) {
      this.eventList.push(database[i].event);
    }

    // to do: ngx-select-dropdown: single select dropdown
  }

}

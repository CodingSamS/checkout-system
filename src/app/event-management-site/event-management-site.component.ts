import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-event-management-site',
  templateUrl: './event-management-site.component.html',
  styleUrls: ['./event-management-site.component.scss']
})
export class EventManagementSiteComponent implements OnInit {

  constructor(private databaseAccess: DatabaseAccessService) { }

  ngOnInit(): void {
  }

}

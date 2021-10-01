import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-statistic-site',
  templateUrl: './statistic-site.component.html',
  styleUrls: ['./statistic-site.component.css']
})
export class StatisticSiteComponent implements OnInit {

  constructor(private databaseAccess: DatabaseAccessService) { }

  ngOnInit(): void {
  }

}

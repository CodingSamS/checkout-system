import {Component, OnInit} from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
    selector: 'app-statistic-site',
    templateUrl: './statistic-site.component.html',
    styleUrls: ['./statistic-site.component.scss'],
    standalone: false
})
export class StatisticSiteComponent implements OnInit {

  data: Array<{ eventName: string, revenue: number, plotData: Array<{name: string, series: Array<{name: string, value: number}>}> }>;

  constructor(private databaseAccess: DatabaseAccessService) {
    this.data = [];
  }

  ngOnInit(): void {
    for (let eventKey of this.databaseAccess.getSortedKeyList(false)) {
      let plotData: any[];
      plotData = [];
      let revenue = 0;
      for (const item of this.databaseAccess.database[eventKey].items) {
        let series = [];
        series.push({
          "name": "Extern",
          "value": item.counterExternal
        });
        series.push({
          "name": "Intern",
          "value": item.counterInternal
        });
        series.push({
          "name": "Summe",
          "value": item.counterInternal + item.counterExternal
        });
        plotData.push({
          "name": item.name,
          "series": series
        })
        revenue += item.counterExternal * item.price
      }
      this.data.push({
        "eventName": eventKey,
        "revenue": revenue,
        "plotData": plotData
      })
    }
  }

}

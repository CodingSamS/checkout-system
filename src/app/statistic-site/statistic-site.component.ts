import { Component, OnInit } from '@angular/core';
import { DatabaseAccessService } from "../database-access.service";

@Component({
  selector: 'app-statistic-site',
  templateUrl: './statistic-site.component.html',
  styleUrls: ['./statistic-site.component.scss']
})
export class StatisticSiteComponent implements OnInit {

  data: Array<{ eventName: string, revenue: number, plotData: Array<{name: string, series: Array<{name: string, value: number}>}> }>;

  constructor(private databaseAccess: DatabaseAccessService) {
    this.data = [];
  }

  ngOnInit(): void {
    const database = this.databaseAccess.getSortedDatabase(false);
    for (let i = 0; i < database.length; i++) {
      let plotData = [];
      let revenue = 0;
      for (const key in Object.keys(database[i].content.internal)) {
        let series = [];
        series.push({
          "name": "Extern",
          "value": database[i].content.external[key].counter
        });
        series.push({
          "name": "Intern",
          "value": database[i].content.internal[key].counter
        });
        series.push({
          "name": "Summe",
          "value": database[i].content.internal[key].counter + database[i].content.external[key].counter
        });
        plotData.push({
          "name": database[i].content.internal[key].name,
          "series": series
        })
        revenue += database[i].content.external[key].counter * database[i].content.external[key].price
      }
      this.data.push({
        "eventName": database[i].event,
        "revenue": revenue,
        "plotData": plotData
      })
    }
  }

}

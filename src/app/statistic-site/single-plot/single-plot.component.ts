import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-single-plot',
    templateUrl: './single-plot.component.html',
    styleUrls: ['./single-plot.component.scss'],
    standalone: false
})
export class SinglePlotComponent implements OnInit {

  @Input() data: { eventName: string, revenue: number, plotData: Array<{name: string, series: Array<{name: string, value: number}>}> } | undefined;

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Menge';
  legendTitle: string = 'Kunde';

  constructor() {
  }

  ngOnInit(): void {
    Object.assign(this, this.data?.plotData)
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}

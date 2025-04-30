import { Component, Input, OnInit } from '@angular/core';
import { ChartData, Color, CommonElementOptions } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: ``
})
export class DoughnutComponent implements OnInit {
  @Input() title: string = 'Without title';
  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') doughnutData: number[] = [123, 456, 321];

  doughnutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.doughnutData },
      ]
    }
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styles: [
  ]
})
export class Chart1Component {
  doughnutChartLabels1: string[] = ['Bread', 'Soda', 'Tacos'];
  data1: number[] = [87, 65, 20];
}

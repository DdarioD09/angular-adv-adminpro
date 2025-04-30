import { Component } from '@angular/core';

@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component {
  doughnutChartLabels1: string[] = ['Bread', 'Soda', 'Tacos'];
  data1: number[] = [87, 65, 20];
}

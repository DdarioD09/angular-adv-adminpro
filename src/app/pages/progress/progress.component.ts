import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progress1: number = 25;
  progress2: number = 35;

  get getProgress1(): string {
    return `${this.progress1}%`;
  }

  get getProgress2(): string {
    return `${this.progress2}%`;
  }

}

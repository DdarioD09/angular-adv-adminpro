import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progress: number = 15;

  getPercentage() {
    return `${this.progress}%`;
  }

  changePercentage(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.progress = 0;
      return;
    }

    this.progress = this.progress + value;
  }

}

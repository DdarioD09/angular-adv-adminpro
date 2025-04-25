import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent {
  @Input('progressValue') progress: number = 50;

  @Output('progressValueUpdated') progressUpdated: EventEmitter<number> = new EventEmitter();

  changeProgress(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progressUpdated.emit(100);
      this.progress = 100;
      return;
    }
    if (this.progress <= 0 && value < 0) {
      this.progressUpdated.emit(0);
      this.progress = 0;
      return;
    }
    this.progress = this.progress + value;
    this.progressUpdated.emit(this.progress);
  }
}

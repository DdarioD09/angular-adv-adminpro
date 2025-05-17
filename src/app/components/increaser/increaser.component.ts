import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: [
  ]
})
export class IncreaserComponent implements OnInit {
  @Input('progressValue') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('progressValueUpdated') progressUpdated: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

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

  onChange(inputValue: number) {
    if (inputValue >= 100) {
      this.progress = 100;
    } else if (inputValue <= 0) {
      this.progress = 0;
    } else {
      this.progress = inputValue;
    }
    this.progressUpdated.emit(this.progress);
  }
}

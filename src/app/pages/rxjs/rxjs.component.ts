import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  intervalSubs!: Subscription;

  constructor() {

    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: valor => console.log('Subs:', valor),
    //   error: error => console.warn('Error:', error),
    //   complete: () => console.log('End obs')
    // });
    this.intervalSubs = this.returnInterval().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {
    return interval(100)
      .pipe(
        take(10),
        map(value => value + 1),
        filter(value => value % 2 === 0),
      );
  }

  returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I has reached the value of 2');
        }

      }, 1000);

    });
  }

}

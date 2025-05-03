import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Data, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: [
  ]
})

export class BreadCrumbsComponent implements OnDestroy {
  title!: string;
  titleSubs$!: Subscription;

  constructor(private router: Router, activatedRoute: ActivatedRoute) {
    // this is another way to check the data in the active route, but it is static
    // console.log(activatedRoute.snapshot.children[0].data);

    this.titleSubs$ = this.getDataRouting().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`
    });
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getDataRouting(): Observable<Data> {
    return this.router.events
      .pipe(
        // filter(event => event instanceof ActivationEnd),
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event) => event.snapshot.firstChild === null),
        map((event): Data => event.snapshot.data)
      )
  }

}

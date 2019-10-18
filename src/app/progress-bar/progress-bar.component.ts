import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {animate, animateChild, group, style, transition, trigger} from "@angular/animations";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  animations: [
    trigger('onRouteLoad', [
      transition(':enter', [
        group([
          style({ width: '0%' }),
          animate('150ms ease-in-out', style({ width: `100%` })),
          animateChild()
        ])
      ]),
    ])
  ]
})
export class ProgressBarComponent implements OnInit {

  isLoadingRoute: boolean = false;
  progress: number = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(
      event => {
        if (event) {
          if (event instanceof NavigationStart) {
            this.isLoadingRoute = true;
            this.progress++;
          } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
            this.isLoadingRoute = false;
            this.progress = 0;
          } else {
            this.progress++;
          }
        }
      }
    )
  }

  getWidth(): Observable<number> {
    return of(this.progress && this.progress * 5);
  }
}

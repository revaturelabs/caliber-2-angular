import {Component} from '@angular/core';
import {ErrorService} from './error-handling/services/error.service';
import {RouterOutlet} from "@angular/router";
import {routeAnimations} from "./app.animations";

/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routeAnimations
  ]
})
export class AppComponent {
  title = 'Caliber | Performance Management';

  constructor(public errorService: ErrorService) {}

  getRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData["animation"];
  }

}

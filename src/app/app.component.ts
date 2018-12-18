import { Component } from '@angular/core';
import { ErrorService } from './error-handling/services/error.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Caliber | Performance Management';

  constructor(private errorService: ErrorService) {}
}

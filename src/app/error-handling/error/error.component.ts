import { Component, OnInit, HostListener, OnChanges, Input } from '@angular/core';
import { ServiceError } from '../types/service-error';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
/**
 * Error Modal for handling all http errors within the application on the front end
 */
export class ErrorComponent implements OnInit, OnChanges {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * The current error being displayed by the modal
   */
  @Input() currentError: ServiceError;

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * Shows the modal if the current error exists
   */
  ngOnChanges() {
    if (this.currentError) {
      document.getElementById('errorModal').className = 'modal show';
    }
  }

  /**
   * Closes the modal on a close click
   */
  close() {
    document.getElementById('errorModal').className = 'modal hidden';
  }

}

import { Injectable, Output, EventEmitter } from '@angular/core';
import { ServiceError } from '../types/service-error';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Service called whenever an error occurs communicating with the back end
 */
export class ErrorService {

  /**
   * The current error
   */
  error: ServiceError;

  constructor() { }

  /**
   * Sets the current error so that the error handling component can bind to it and display it
   * @param serviceName The name of the service which threw an error
   * @param errorMessage The error message to be displayed by the error handling component
   */
  setError(serviceName: string, errorMessage: string) {
    this.error = {
      serviceName: serviceName,
      errorMessage: errorMessage
    };
  }
}

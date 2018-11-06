import { Injectable, Output, EventEmitter } from '@angular/core';
import { ServiceError } from '../types/service-error';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error: ServiceError;

  constructor() { }

  setError(serviceName: string, errorMessage: string) {
    this.error = {
      serviceName: serviceName,
      errorMessage: errorMessage
    };
    console.log(this.error);
  }

  resetError() {
    this.error = null;
  }
}

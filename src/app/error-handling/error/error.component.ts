import { Component, OnInit, HostListener, OnChanges, Input } from '@angular/core';
import { ServiceError } from '../types/service-error';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnChanges {

  constructor(private errorService: ErrorService) { }

  @Input() currentError: ServiceError;
  // @Input() currentService: string;
  // @Input() currentMessage: string;

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.currentError) {
      document.getElementById('errorModal').className = 'modal show';
      console.log('showing ', this.currentError);
    }
  }

  close() {
    document.getElementById('errorModal').className = 'modal hidden';
    console.log('hiding');
    this.errorService.resetError();
    this.currentError = null;
  }

}

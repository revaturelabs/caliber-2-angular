import { Component } from '@angular/core';
import { ErrorService } from './error-handling/services/error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {BatchModalComponent } from '../app/Assess-Batch/Components/toolbar/batch-modal/batch-modal.component';
import { FormModalComponent } from './Assess-Batch/Components/toolbar/form-modal/form-modal.component';
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

  constructor(public errorService: ErrorService, private modalService: NgbModal) {}

}

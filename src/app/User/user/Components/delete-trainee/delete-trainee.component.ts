import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TraineesService } from '../../Services/trainees.service';
import { Trainee } from '../../Types/trainee';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-delete-trainee',
  templateUrl: './delete-trainee.component.html',
  styleUrls: ['./delete-trainee.component.css']
})
export class DeleteTraineeComponent implements OnInit {

  /**
   * expects a 'trainee' as an input
   */
  @Input()
  private trainee: Trainee;

  /**
   * expects to output an 'EventEmitter<boolean>'
   */
  @Output()
  refreshList = new EventEmitter<boolean>();

  /**
   * calls the 'deleteTrainee' function from 'TraineeService' to delete the trainee
   * @param trainee the trainee that is to be deleted
   */
  private deleteTrainee(trainee: Trainee) {
    this.ts.deleteTrainee(trainee.traineeId).subscribe(data => {
      this.refreshList.emit(true);
    },
    issue => {
      if (issue instanceof HttpErrorResponse) {
        const err = issue as HttpErrorResponse;
        this.errorService.setError('TraineesService',
        `Issue deleting trainee. Please contact system administrator: \n
        Status Code: ${err.status} \n
        Status Text: ${err.statusText} \n
        Error: ${err.message}`);
      }
    });
  }

  /**
   * @param ts The trainee service from the User folder, used to communicate with the user microservice
   * @param errorService The error service from the error handling folder,
   *   used to communicate with the error modal to display errors on failed http requests
   */
  constructor(private ts: TraineesService, private errorService: ErrorService) { }

  /**
   * Initializes the trainee and their name on init to prevent binding errors
   */
  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.name = '';
  }

}

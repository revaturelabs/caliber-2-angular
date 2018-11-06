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

  @Input()
  /**
   * trainee refers to the specific trainee object that is to be deleted
   */
  private trainee: Trainee;

  @Output()
  refreshList = new EventEmitter<boolean>();

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

  constructor(private ts: TraineesService, private errorService: ErrorService) { }

  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.name = '';
    console.log(this.trainee);
  }

}

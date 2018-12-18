import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TraineesService } from '../../Services/trainees.service';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @ignore
 */
@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent implements OnInit {

  submitted: Boolean = false;
  @Input() batchId: number;
  @Output() addTraineeEvent = new EventEmitter<boolean>();
  fullName: string;
  email: string;
  skypeId: string;
  phoneNumber: string;
  college: string;
  degree: string;
  major: string;
  recruiterName: string;
  techScreenerName: string;
  projectCompletion: string;
  profileUrl: string;
  trainingStatus: string;

  /**
   * @param ts The trainee service from the User folder, used to communicate with the user microservice
   * @param errorService The error service from the error handling folder,
   *   used to communicate with the error modal to display errors on failed http requests
   */
  constructor(private ts: TraineesService, private errorService: ErrorService) {}

  /**
   * @ignore
   */
  ngOnInit() {
  }

  /**
   * creates a trainee and populates with current fields, then sends the post request to the service
   * Resets the fields upon hearing a response from the user service. Pops up an error modal if the http
   * request fails
   */
  addTrainee() {
    const trainee = new Trainee();
    trainee.batchId = this.batchId;
    trainee.name = this.fullName;
    trainee.email = this.email;
    trainee.skypeId = this.skypeId;
    trainee.phoneNumber = this.phoneNumber;
    trainee.college = this.college;
    trainee.degree = this.degree;
    trainee.major = this.major;
    trainee.recruiterName = this.recruiterName;
    trainee.techScreenerName = this.techScreenerName;
    trainee.projectCompletion = this.projectCompletion;
    trainee.profileUrl = this.profileUrl;
    trainee.trainingStatus = this.trainingStatus;


    this.submitted = true;
    this.ts.createTrainee(trainee).subscribe(data => {
      if (data) {
        const elem = document.getElementById('closeButton1');
        const evt = new MouseEvent('click', { bubbles: true});
        elem.dispatchEvent(evt);
        this.addTraineeEvent.emit(true);
        this.fullName = null;
        this.email = null;
        this.skypeId = null;
        this.phoneNumber = null;
        this.college = null;
        this.degree = null;
        this.major = null;
        this.recruiterName = null;
        this.techScreenerName = null;
        this.projectCompletion = null;
        this.profileUrl = null;
        this.trainingStatus = null;
      }
    },
    issue => {
      if (issue instanceof HttpErrorResponse) {
        const err = issue as HttpErrorResponse;
        this.errorService.setError('TraineesService',
        `Issue creating trainee ${trainee.name}. Please contact system administrator: \n
        Status Code: ${err.status} \n
        Status Text: ${err.statusText} \n
        Error: ${err.message}`);
      }
    });
  }

}

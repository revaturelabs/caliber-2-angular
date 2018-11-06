import { Component, OnInit, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-update-trainee',
  templateUrl: './update-trainee.component.html',
  styleUrls: ['./update-trainee.component.css']
})
export class UpdateTraineeComponent implements OnInit, OnChanges {

  @Input()
  private trainee: Trainee;

  @Output()
  refreshList = new EventEmitter<boolean>();

  private traineeTemp = new Trainee();
  submitted: Boolean = false;
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

  constructor(private ts: TraineesService, private errorService: ErrorService) { }

   ngOnChanges() {
     if (this.trainee) {
       this.refreshTrainee();
     }
  }

  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.email = '';
    console.log(this.trainee);
  }

  close() {
    console.log('in close() setting ' + this.trainee.email + ' to ' + this.traineeTemp.email);
    this.traineeTemp = this.trainee;
    this.refreshList.emit(true);
  }

  refreshTrainee() {
    if (this.trainee) {
      this.traineeTemp.college = this.trainee.college;
      this.traineeTemp.degree = this.trainee.degree;
      this.traineeTemp.email = this.trainee.email;
      this.traineeTemp.major = this.trainee.major;
      this.traineeTemp.name = this.trainee.name;
      this.traineeTemp.phoneNumber = this.trainee.phoneNumber;
      this.traineeTemp.profileUrl = this.trainee.profileUrl;
      this.traineeTemp.projectCompletion = this.trainee.projectCompletion;
      this.traineeTemp.recruiterName = this.trainee.recruiterName;
      this.traineeTemp.techScreenerName = this.trainee.techScreenerName;
      this.traineeTemp.skypeId = this.trainee.skypeId;
      this.traineeTemp.trainingStatus = this.trainee.trainingStatus;
    }
  }

  mergeTrainee() {
    this.trainee.college = this.traineeTemp.college;
    this.trainee.degree = this.traineeTemp.degree;
    this.trainee.email = this.traineeTemp.email;
    this.trainee.major = this.traineeTemp.major;
    this.trainee.name = this.traineeTemp.name;
    this.trainee.phoneNumber = this.traineeTemp.phoneNumber;
    this.trainee.profileUrl = this.traineeTemp.profileUrl;
    this.trainee.projectCompletion = this.traineeTemp.projectCompletion;
    this.trainee.recruiterName = this.traineeTemp.recruiterName;
    this.trainee.techScreenerName = this.traineeTemp.techScreenerName;
    this.trainee.skypeId = this.traineeTemp.skypeId;
    this.trainee.trainingStatus = this.traineeTemp.trainingStatus;
  }

  updateTrainee() {
    this.mergeTrainee();
    this.ts.updateTrainee(this.trainee).subscribe(data => {
      if (data) {
        const elem = document.getElementById('closeButtonUpdate');
        const evt = new MouseEvent('click', { bubbles: true });
        elem.dispatchEvent(evt);
        this.refreshList.emit(true);
      }
    },
    issue => {
      if (issue instanceof HttpErrorResponse) {
        const err = issue as HttpErrorResponse;
        this.errorService.setError('TraineesService',
        `Issue updating trainee ${this.trainee.name}. Please contact system administrator: \n
        Status Code: ${err.status} \n
        Status Text: ${err.statusText} \n
        Error: ${err.message}`);
      }
    });
  }

}

import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Trainee } from '../../Types/trainee';

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

  private traineeTemp: Trainee;
  submitted: Boolean = false;
  /** need to implement batchId sharing between components,
   * specifically between view-all-trainees and this component */
  batchId = 0;
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

  // populateTrainee(trainee: Trainee) {
  //   console.log('in popul trainee');
  //   this.trainee = trainee;
  //   this.batchId = trainee.batchId;
  //   this.college = trainee.college;
  //   this.degree = trainee.degree;
  //   this.email = trainee.email;
  //   this.fullName = trainee.name;
  //   this.major = trainee.major;
  //   this.skypeId = trainee.skypeId;
  //   this.phoneNumber = trainee.phoneNumber;
  //   this.recruiterName = trainee.recruiterName;
  //   this.techScreenerName = trainee.techScreenerName;
  //   this.profileUrl = trainee.profileUrl;
  //   this.trainingStatus = trainee.trainingStatus;
  // }

  constructor() { }

   ngOnChanges() {
     this.traineeTemp = this.trainee;
     console.log('in ngonchanges, trainee: ' + this.trainee.email + ' and traineeTemp: ' + this.traineeTemp.email);
   }

  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.email = '';
    console.log(this.trainee);
  }

  close() {
    console.log('in close() setting ' + this.trainee.email + ' to ' + this.traineeTemp.email);
    this.trainee = this.traineeTemp;
    this.refreshList.emit(true);
  }

}

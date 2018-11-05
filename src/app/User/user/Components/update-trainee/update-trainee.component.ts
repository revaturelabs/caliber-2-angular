import { Component, OnInit, Input, OnChanges, Output, EventEmitter, HostListener } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';

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

  // @HostListener('document:body.click')
  // onHidden(): void {
  //   console.log('handling hidden event');
  //   close();
  // }

  // @HostListener('click', [`$event`])
  // onClick(event: MouseEvent): void {
  //   event.srcElement
  // }

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

  constructor(private ts: TraineesService) { }

  ngOnChanges() {
    this.refreshTrainee();
    // console.log('in ngonchanges, trainee: ' + this.trainee.email + ' and traineeTemp: ' + this.traineeTemp.email);
  }

  ngOnInit() {
    this.trainee = new Trainee();
    this.trainee.email = '';
    console.log(this.trainee);
    // document.getElementsByName('body')[0].addEventListener('click', close);
  }

  close() {
    console.log('in close() setting ' + this.trainee.email + ' to ' + this.traineeTemp.email);
    this.traineeTemp = this.trainee;
    this.refreshList.emit(true);
  }

  // refreshPage(trainee: Trainee) {
  //   this.trainee = trainee;
  //   this.refreshTrainee();
  //   console.log(trainee);
  // }

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
    });
  }

}

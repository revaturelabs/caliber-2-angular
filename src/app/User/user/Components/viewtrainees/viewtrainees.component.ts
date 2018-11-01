import { Component, OnInit } from '@angular/core';
import { TraineeForm } from '../../TraineeForm';
import { UserService } from '../../../user.service';
import { TrainingStatus } from '../../TrainingStatus';


@Component({
  selector: 'app-viewtrainees',
  templateUrl: './viewtrainees.component.html',
  styleUrls: ['./viewtrainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  showdropped = true;
  submitted: Boolean = false;

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
  trainingStatus: TrainingStatus;

  constructor(public userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
  }

  switchTraineeView() {
    const temp = !this.showdropped;
    this.showdropped = temp;
  }

  resetTraineeForm() {
  }

  addTrainee() {
    const traineeForm = new TraineeForm(this.fullName, this.email, this.skypeId, this.batchId, this.phoneNumber, this.college,
      this.degree, this.major, this.recruiterName, this.techScreenerName, this.projectCompletion,
      this.profileUrl, this.trainingStatus);
    console.log(traineeForm);
    this.submitted = true;
    this.userService.postForm(traineeForm).subscribe(data => {
      if (data) {
        const elem = document.getElementById('closeButton1');
        const evt = new MouseEvent('click', { bubbles: true});
        elem.dispatchEvent(evt);
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
    });
  }
}


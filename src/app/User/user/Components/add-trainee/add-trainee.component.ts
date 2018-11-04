import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineesService } from '../../Services/trainees.service';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrls: ['./add-trainee.component.css']
})
export class AddTraineeComponent implements OnInit {

  submitted: Boolean = false;
  /** need to implement batchId sharing between components,
   * specifically between view-all-trainees and this component */
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

  constructor(private ts: TraineesService) {}

  ngOnInit() {
  }

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
    });
  }

}

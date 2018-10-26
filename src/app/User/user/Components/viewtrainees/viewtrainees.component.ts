import { Component, OnInit } from '@angular/core';
import { TraineeForm } from '../../TraineeForm';


@Component({
  selector: 'app-viewtrainees',
  templateUrl: './viewtrainees.component.html',
  styleUrls: ['./viewtrainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  showdropped = true;
  traineeForm: TraineeForm;

  constructor() { }

  ngOnInit() {
  }

  switchTraineeView() {
    const temp = !this.showdropped;
    this.showdropped = temp;
  }

  resetTraineeForm() {
  }

}

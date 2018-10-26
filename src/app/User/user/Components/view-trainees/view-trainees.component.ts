import { Component, OnInit } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TrainingStatus } from '../../types/training-status';

@Component({
  selector: 'app-viewtrainees',
  templateUrl: './viewtrainees.component.html',
  styleUrls: ['./viewtrainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  showdropped = true;
  trainees: Trainee[];

  t1: Trainee = new Trainee('John Dao', 'jd@j.com', TrainingStatus.SIGNED, 7, '111' );
  t2: Trainee = new Trainee( 'Emily Dao', 'ed@j.com', TrainingStatus.SIGNED, 7, '222' );


  constructor() { }

  ngOnInit() {
    this.trainees = [ this.t1, this.t2];
  }

  switchTraineeView() {
    const temp = !this.showdropped;
    this.showdropped = temp;
  }

}

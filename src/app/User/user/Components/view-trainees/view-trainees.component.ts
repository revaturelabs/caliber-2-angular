import { Component, OnInit } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TrainingStatus } from '../../types/training-status';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from '../../Pipes/trainee-toggle.pipe';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  togglePipe: TraineeTogglePipe;
  showdropped = true;
  trainees: Trainee[];

  t1: Trainee = new Trainee('John Dao', 'jd@j.com', TrainingStatus.SIGNED, 7, '111' );
  t2: Trainee = new Trainee( 'Emily Dao', 'ed@j.com', TrainingStatus.SIGNED, 7, '222' );


  constructor() { }

  ngOnInit() {
    this.trainees = [ this.t1, this.t2];
  }

  switchTraineeView() {
    this.showdropped = !this.showdropped;
  }

}

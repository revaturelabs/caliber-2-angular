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

  t1: Trainee;
  t2: Trainee;


  constructor() { }

  ngOnInit() {
    this.t1 = new Trainee('John Dao', 'jd@j.com', TrainingStatus.DROPPED, 7, '111');
    this.t2 = new Trainee('Emily Dao', 'ed@j.com', TrainingStatus.SIGNED, 7, '222');
    console.log(this.t1);
    this.trainees = [this.t1, this.t2];
    console.log(this.trainees);
  }

  switchTraineeView() {
    this.showdropped = !this.showdropped;
  }

  showTrainingStatus(t: Trainee) {
    switch (t.trainingStatus) {
      case TrainingStatus.SIGNED:
        return 'Signed';
      case TrainingStatus.SELECTED:
        return 'Selected';
      case TrainingStatus.TRAINING:
        return 'Training';
      case TrainingStatus.MARKETING:
        return 'Marketing';
      case TrainingStatus.CONFIRMED:
        return 'Confirmed';
      case TrainingStatus.EMPLOYED:
        return 'Employed';
      case TrainingStatus.DROPPED:
        return 'Dropped';
      case TrainingStatus.PROJECT:
        return 'Project';
      case TrainingStatus.STAGING:
        return 'Staging';
    }
  }

}

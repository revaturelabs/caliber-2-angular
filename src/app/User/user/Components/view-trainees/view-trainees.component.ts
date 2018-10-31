import { Component, OnInit } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TrainingStatus } from '../../types/training-status';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from '../../Pipes/trainee-toggle.pipe';
import { TraineeFlag } from '../../types/trainee-flag';
import { ViewAllTraineesService } from '../../Services/view-all-trainees.service';
import { HttpClient } from '@angular/common/http';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  private status: string;
  togglePipe: TraineeTogglePipe;
  showActive = true;
  trainees2: Trainee[];
  trainees: Trainee[];

  red = TraineeFlag.RED;
  green = TraineeFlag.GREEN;
  none = TraineeFlag.NONE;

  t1: Trainee;
  t2: Trainee;

  constructor(
    private viewAllTraineeService: ViewAllTraineesService,
    private http: HttpClient) { }

  /**
   * Uses lifecycle hook ngOnInit to intialize mock trainees for testing
   */
  ngOnInit() {
    this.t1 = new Trainee('John Dao', 'jd@j.com', 'Dropped', '111');
    this.t2 = new Trainee('Emily Dao', 'ed@j.com', 'Signed', '222');
    this.t2.flagStatus = TraineeFlag.RED;
    this.t1.flagStatus = TraineeFlag.GREEN;
    this.t1.profileUrl = 'http://www.google.com';
    this.trainees2 = [this.t1, this.t2];
    // this.viewAllTraineeService.getTrainees(2200).subscribe(data => {
    //    // this.trainees = data;
    //   // console.log(this.trainees);
    //   });
    this.viewAllTraineeService.getTrainees(2200).subscribe(data => {
      this.trainees = data;
      console.log(this.trainees);
    });
  }

  /**
   * Swaps showDropped from it's current boolean to the opposite boolean
   */
  switchTraineeView() {
    this.showActive = !this.showActive;
  }

  /**
   * returns the trainee's current Training Status as a String
   */
  showTrainingStatus(t: Trainee) {
    /*switch (t.trainingStatus) {
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
    }*/
    return t.trainingStatus;
  }

  // Needs to be completed along with the rest of the flag methods
  // currently not working, look into this whoever does this user story
  toggleColor( t: Trainee) {
    if (t.flagStatus === this.green) {
      console.log('changing to none!');
      t.flagStatus = this.none;
    } else if (t.flagStatus === this.red) {
      console.log('changing to green!');
      t.flagStatus = this.green;
    } else {
      console.log('changing to red!');
      t.flagStatus = this.red;
    }
  }

}

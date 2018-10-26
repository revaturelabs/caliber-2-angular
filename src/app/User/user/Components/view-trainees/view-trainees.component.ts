import { Component, OnInit } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TrainingStatus } from '../../types/training-status';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from '../../Pipes/trainee-toggle.pipe';
import { TraineeFlag } from '../../types/trainee-flag';
import { ViewAllTraineesService } from '../../Services/view-all-trainees.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewtraineesComponent implements OnInit {

  togglePipe: TraineeTogglePipe;
  showActive = true;
  trainees2: Trainee[];
  trainees: Trainee[];

  t1: Trainee;
  t2: Trainee;


  constructor(
    private viewAllTraineeService: ViewAllTraineesService,
    private http: HttpClient) { }

  ngOnInit() {
    this.t1 = new Trainee('John Dao', 'jd@j.com', TrainingStatus.DROPPED, '111');
    this.t2 = new Trainee('Emily Dao', 'ed@j.com', TrainingStatus.SIGNED, '222');
    this.t1.profileUrl = 'http://www.google.com';
    this.trainees2 = [this.t1, this.t2];
    this.viewAllTraineeService.getTrainees(2200).subscribe(data => {
       this.trainees = data;
       console.log(this.trainees);
      });
  }

  switchTraineeView() {
    this.showActive = !this.showActive;
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

  // Needs to be completed along with the rest of the flag methods
  // currently not working, look into this whoever does this user story
  toggleColor( t: Trainee, index: number) {
    const flag = document.getElementsByClassName('glyphicon-flag').item(index);
    let status = TraineeFlag.NONE;
    if (flag.getAttribute('class') === 'glyphicon glyphicon-flag color-white') {
      status = TraineeFlag.RED;
      flag.setAttribute('class',
          'glyphicon glyphicon-flag color-red');
    } else if (flag.getAttribute('class') === 'glyphicon glyphicon-flag color-red') {
      status = TraineeFlag.GREEN;
      flag.setAttribute('class',
          'glyphicon glyphicon-flag color-green');
    } else if (flag.getAttribute('class') === 'glyphicon glyphicon-flag color-green') {
      flag.setAttribute('class',
          'glyphicon glyphicon-flag color-white');
    }
    if (t.flagStatus !== status) {
      // look into: commentBox(flag, status, initialStatus, index, t);
      t.flagStatus = status;
    } else {
      // look into: $scope.hideNotes(index);
    }
  }

}

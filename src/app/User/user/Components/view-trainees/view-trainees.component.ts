import { Component, OnInit } from '@angular/core';
import { Trainee } from '../../types/trainee';
import { TrainingStatus } from '../../types/training-status';
import { FormsModule } from '@angular/forms';
import { TraineeTogglePipe } from '../../Pipes/trainee-toggle.pipe';
import { TraineeFlag } from '../../types/trainee-flag';
import { TraineesService } from '../../Services/trainees.service';
import { HttpClient } from '@angular/common/http';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewTraineesComponent implements OnInit {

  private status: string;
  togglePipe: TraineeTogglePipe;
  showActive = true;
  trainees: Trainee[];
  showCommentForm: boolean[];
  showNotes: boolean[];

  red = TraineeFlag.RED;
  green = TraineeFlag.GREEN;
  none = TraineeFlag.NONE;

  constructor(
    private ts: TraineesService,
    private http: HttpClient) { }

  /**
   * Uses lifecycle hook ngOnInit to intialize mock trainees for testing
   */
  ngOnInit() {
    this.trainees = new Array<Trainee>();
    this.showCommentForm = new Array<boolean>();
    this.showNotes = new Array<boolean>();
    this.ts.getTrainees(2200).subscribe(data => {
      this.trainees = data;
      this.showCommentForm = new Array<boolean>(this.trainees.length);
      this.showCommentForm = new Array<boolean>(this.trainees.length);
      this.showNotes = new Array<boolean>(this.trainees.length);
    });
  }

  /**
   * Swaps showDropped from it's current boolean to the opposite boolean
   */
  switchTraineeView() {
    this.showActive = !this.showActive;
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

  updateTraineeFlagNotes(t: Trainee, flagNote: HTMLInputElement) {
    t.flagNotes = flagNote.value;
    this.ts.updateTrainee(t).subscribe();
  }
}

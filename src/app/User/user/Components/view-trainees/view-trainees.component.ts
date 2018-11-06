import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineeTogglePipe } from '../../Pipes/trainee-toggle.pipe';
import { TraineeFlag } from '../../Types/trainee-flag';
import { TraineesService } from '../../Services/trainees.service';
import { HttpClient } from '@angular/common/http';
import { UpdateTraineeComponent } from '../update-trainee/update-trainee.component';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewTraineesComponent implements OnInit, OnChanges {


  @Input() batchId: number;
  private status: string;
  togglePipe: TraineeTogglePipe;
  showActive = true;
  trainees: Trainee[];
  showCommentForm: boolean[];
  showNotes: boolean[];
  traineeToUpdate: Trainee;
  traineeToDelete: Trainee;
  switchTrainee: Trainee;

  red = TraineeFlag.RED;
  green = TraineeFlag.GREEN;
  none = TraineeFlag.NONE;
  @ViewChild('updateTraineeModal') updateTrainee: UpdateTraineeComponent;

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
    this.refreshList();
  }

  ngOnChanges() {
    if (this.batchId) {
      this.refreshList();
    }
  }

  /**
   * Swaps showDropped from it's current boolean to the opposite boolean
   */
  switchTraineeView() {
    this.showActive = !this.showActive;
  }

  // Needs to be completed along with the rest of the flag methods
  // currently not working, look into this whoever does this user story
  toggleColor(t: Trainee) {
    if (t.flagStatus === this.green) {
      t.flagStatus = this.none;
    } else if (t.flagStatus === this.red) {
      t.flagStatus = this.green;
    } else {
      t.flagStatus = this.red;
    }
  }

  updateTraineeFlagNotes(t: Trainee, flagNote: HTMLInputElement) {
    t.flagNotes = flagNote.value;
    this.ts.updateTrainee(t).subscribe();
  }

  setDeleteTrainee(t: Trainee) {
    this.traineeToDelete = t;
  }

  refreshList() {
    this.ts.getTrainees(this.batchId).subscribe(data => {
      this.trainees = data;
      this.showCommentForm = new Array<boolean>(this.trainees.length);
      this.showCommentForm = new Array<boolean>(this.trainees.length);
      this.showNotes = new Array<boolean>(this.trainees.length);
    });
    this.traineeToUpdate = null;
  }

  populateTrainee(trainee: Trainee) {
    if (trainee) {
      this.traineeToUpdate = trainee;
      this.updateTrainee.refreshTrainee();
    }
  }

  getSwitchableBatches(trainee: Trainee) {
    this.switchTrainee = trainee;
  }
}

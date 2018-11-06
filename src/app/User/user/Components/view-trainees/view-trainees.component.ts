import { Component, OnInit, Input, OnChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import { Trainee } from '../../Types/trainee';
import { TraineeFlag } from '../../Types/trainee-flag';
import { TraineesService } from '../../Services/trainees.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UpdateTraineeComponent } from '../update-trainee/update-trainee.component';
import { ErrorService } from 'src/app/error-handling/services/error.service';

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
export class ViewTraineesComponent implements OnInit, OnChanges {


  @Input() batchId: number;
  @Output() closeTraineeModal =  new EventEmitter<void>();
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
    private http: HttpClient,
    private errorService: ErrorService) { }

  /**
   * Uses lifecycle hook ngOnInit to intialize mock trainees for testing
   */
  ngOnInit() {
    this.trainees = new Array<Trainee>();
    this.showCommentForm = new Array<boolean>();
    this.showNotes = new Array<boolean>();
    if (this.batchId) {
      this.refreshList();
    }
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
    console.log('refreshing');
    this.ts.getTrainees(this.batchId).subscribe(data => {
      if (data) {
        this.trainees = data;
        this.showCommentForm = new Array<boolean>(this.trainees.length);
        this.showCommentForm = new Array<boolean>(this.trainees.length);
        this.showNotes = new Array<boolean>(this.trainees.length);
        console.log('refreshed');
      }
    },
    issue => {
      if (issue instanceof HttpErrorResponse) {
        const err = issue as HttpErrorResponse;
        this.errorService.setError('TraineesService',
        `Issue finding trainees. Please contact system administrator: \n
        Status Code: ${err.status} \n
        Status Text: ${err.statusText} \n
        Error: ${err.message}`);
      }
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

  refreshView() {
    this.showActive = true;
    this.switchTrainee = new Trainee();
    this.traineeToUpdate = new Trainee();
    this.traineeToDelete = new Trainee();
    this.trainees = new Array<Trainee>();
    this.showCommentForm = new Array<boolean>();
    this.showNotes = new Array<boolean>();
  }

  close() {
    this.closeTraineeModal.emit();
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {TraineesService} from '../../Services/trainees.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UpdateTraineeComponent} from '../update-trainee/update-trainee.component';
import {ErrorService} from 'src/app/error-handling/services/error.service';
import {Trainee} from "../../../../domain/model/trainee.dto";
import {TraineeFlag} from "../../../../domain/model/trainee-flag.dto";
import {TraineeService} from "../../../../services/subvertical/user/trainee.service";

@Component({
  selector: 'app-view-trainees',
  templateUrl: './view-trainees.component.html',
  styleUrls: ['./view-trainees.component.css']
})
/**
 * This component handles all actions related with the trainees modal
 */
export class ViewTraineesComponent implements OnInit, OnChanges {

  /**
   * The batch id of the batch currently being viewed
   */
  @Input() batchId: number;

  /**
   * The event that fires when the trainees modal is closed
   */
  @Output() closeTraineeModal =  new EventEmitter<void>();

  /**
   * Helps determine whether active or inactive trainees are shown
   */
  showActive = true;

  /**
   * The current array of trainees
   */
  trainees: Trainee[];

  /**
   * Array of booleans that show or hide flags based on the trainee flag status
   */
  showCommentForm: boolean[];

  /**
   * Array of booleans that show or hide comments based on the trainee and the flags
   */
  showNotes: boolean[];

  /**
   * The trainee bound to the update component
   */
  traineeToUpdate: Trainee;

  /**
   * The trainee bound to the delete component
   */
  traineeToDelete: Trainee;

  /**
   * The trainee bound to the switch batch component
   */
  switchTrainee: Trainee;

  /**
   * Red trainee flag status
   */
  red = TraineeFlag.RED;

  /**
   * Green trainee flag status
   */
  green = TraineeFlag.GREEN;

  /**
   * None trainee flag status
   */
  none = TraineeFlag.NONE;

  /**
   * Update trainee component as hosted by this component
   */
  @ViewChild('updateTraineeModal') updateTrainee: UpdateTraineeComponent;

  /**
   * @param ts The trainee service from the User folder, used to communicate with the user microservice
   * @param errorService The error service from the error handling folder,
   *   used to communicate with the error modal to display errors on failed http requests
   */
  constructor(
    private ts: TraineeService,
    private errorService: ErrorService) { }

  /**
   * Uses lifecycle hook ngOnInit to intialize trainees
   */
  ngOnInit() {
    this.trainees = new Array<Trainee>();
    this.showCommentForm = new Array<boolean>();
    this.showNotes = new Array<boolean>();
    if (this.batchId) {
      this.refreshList();
    }
  }

  /**
  * Refreshes the trainee list when our @input batchId changes
  */
  ngOnChanges() {
    if (this.batchId) {
      this.refreshList();
    }
  }

  /**
   * Swaps showDropped from its current boolean to the opposite boolean
   */
  switchTraineeView() {
    this.showActive = !this.showActive;
  }

  /**
   * Iterates through a trainee's flag statuses
   * @param t The current trainee
   */
  toggleColor(t: Trainee) {
    if (t.flagStatus === this.green) {
      t.flagStatus = this.none;
    } else if (t.flagStatus === this.red) {
      t.flagStatus = this.green;
    } else {
      t.flagStatus = this.red;
    }
  }

  /**
  * Updates a flagnote for a specific trainee
  */
  updateTraineeFlagNotes(t: Trainee, flagNote: HTMLInputElement) {
    t.flagNotes = flagNote.value;
    this.ts.updateTrainee(t).subscribe();
  }

  /**
  * Used for setting a trainee to pass to our delete-trainee component
  */
  setDeleteTrainee(t: Trainee) {
    this.traineeToDelete = t;
  }

  /**
  * Used to repopulate the trainee list after an update, delete, swap
  */
  refreshList() {
    this.ts.getTraineesByBatchId(this.batchId).subscribe(data => {
      if (data) {
        this.trainees = data;
        this.showCommentForm = new Array<boolean>(this.trainees.length);
        this.showCommentForm = new Array<boolean>(this.trainees.length);
        this.showNotes = new Array<boolean>(this.trainees.length);
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

  /**
  * Calls our child modal to refresh a trainee's fields
  */
  populateTrainee(trainee: Trainee) {
    if (trainee) {
      this.traineeToUpdate = trainee;
      this.updateTrainee.refreshTrainee();
    }
  }

  /**
   * sets the trainee that is to be switched
   */
  getSwitchableBatches(trainee: Trainee) {
    this.switchTrainee = trainee;
  }

  /**
   * Refreshes this component on the close event as called by a parent component
   */
  refreshView() {
    this.showActive = true;
    this.switchTrainee = new Trainee();
    this.traineeToUpdate = new Trainee();
    this.traineeToDelete = new Trainee();
    this.trainees = new Array<Trainee>();
    this.showCommentForm = new Array<boolean>();
    this.showNotes = new Array<boolean>();
  }

  /**
   * Emits a closing event
   */
  close() {
    this.closeTraineeModal.emit();
  }
}

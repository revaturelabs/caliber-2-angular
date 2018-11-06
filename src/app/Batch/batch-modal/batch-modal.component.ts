import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormGroup } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BLocation } from '../type/location';


  /*
  The batch modal component is the child component of the batch view component.
  It handles the modal used to create and update batches.
  This component also handles form validation from the user.
  @author Anthony Jin, Juan Trejo

 */


@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit, OnChanges {

  /*
 The batch modal component is the child component of the batch view component.
 It handles the modal used to create and update batches.
 This component also handles form validation from the user.
 @author Anthony Jin, Juan Trejo

*/

  // grabs value from parent component
  @Input() createOrUpdate: Batch;

  // modal event emmitters
  @Output() someEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();

  // class variables
  currBatch: Batch;
  batchFormName: '';
  trainingName: string = null;
  trainingType: string = null;
  trainingTypes: string[];
  skillType: string = null;
  skillTypes: string[];
  location: number = null;
  locationOptions: BLocation[];
  trainer: string = null;
  // needs to be a user type
  trainers: Trainer[];
  coTrainer: string = null;
  startDate: Date;
  endDate: Date;
  goodGradeThreshold: number;
  borderlineGradeThreshold: number;
  batchForm: FormGroup;
  submitted: Boolean = false;
  dateIsError: Boolean = false;
  trainerIsError: Boolean = false;
  myDate: Date;

  constructor(
    private batchservice: BatchService) {
    this.trainingTypes = ['Revature', 'Corporate', 'University', 'Other'];
  }

  // populates form modal if updating batch and not creating new
  setValues() {
    console.log(this.createOrUpdate);
    this.trainingName = this.createOrUpdate.trainingName;
    this.trainingType = this.createOrUpdate.trainingType;
    this.skillType = this.createOrUpdate.skillType;
    this.location = this.createOrUpdate.location;
    this.trainer = this.createOrUpdate.trainer;
    this.coTrainer = this.createOrUpdate.coTrainer;

    // handle start and end dates
    const d = new Date(this.createOrUpdate.startDate);
    this.startDate = d;
    this.endDate = this.createOrUpdate.endDate;

    // handle grades
    this.goodGradeThreshold = this.createOrUpdate.goodGrade;
    this.borderlineGradeThreshold = this.createOrUpdate.passingGrade;
  }

  ngOnInit() {
    console.log('generated');
    // generate all the skilltypes
    this.batchservice.getAllSkillTypes().subscribe(results => {
      this.skillTypes = results;
    });
    // generate all the locations
    this.batchservice.getAllLocations().subscribe(locs => {
      this.locationOptions = locs;
    });
    // generate all the trainers
    this.batchservice.getAllTrainers().subscribe(t => {
      this.trainers = t;
    });
  }

  // prepopulates the batch info if existing batch is passed through the parent
  ngOnChanges() {
    if (this.createOrUpdate != null) {
      this.setValues();
    }
  }

  // resets the form info to default values
  resetForm() {
    console.log('inside resetForm');
    this.trainingName = null;
    this.trainingType = undefined;
    (<HTMLFormElement>document.getElementById('formId')).reset();
    this.skillType = undefined;
    this.trainer = undefined;
    this.coTrainer = undefined;
    this.location = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.goodGradeThreshold = undefined;
    this.borderlineGradeThreshold = undefined;
    this.closeEvent.next('closed');
    this.createOrUpdate = null;
  }

  // creates a brand new batch with form inputs
  createBatch(): void {
    console.log(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold));

    // account for time zone differences
    const sdate = new Date(this.startDate);
    sdate.setMinutes(sdate.getMinutes() + sdate.getTimezoneOffset());
    this.startDate = sdate;
    const edate = new Date(this.endDate);
    edate.setMinutes(edate.getMinutes() + edate.getTimezoneOffset());
    this.endDate = edate;

    // sends post request with batch to back-end
    this.batchservice.postBatch(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold)).subscribe(result => {
        console.log('created');
        this.someEvent.next('created');
        this.resetForm();
      });
  }

  // updates the batch using form inputs
  updateBatch(): void {
    // set dates and account for time zone difference
    const sdate = new Date(this.startDate);
    sdate.setMinutes(sdate.getMinutes() + sdate.getTimezoneOffset());
    this.startDate = sdate;
    const edate = new Date(this.endDate);
    edate.setMinutes(edate.getMinutes() + edate.getTimezoneOffset());
    this.endDate = edate;

    // make updated batch
    const batch = new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold);
    batch.batchId = this.createOrUpdate.batchId;

    // update batch in backend
    this.batchservice.putBatch(batch).subscribe(result => {
      console.log('updated');
      this.someEvent.next('created');
      this.resetForm();
    });
  }

  // sets minimal passing grade
  setMinGrade(): void {
    this.borderlineGradeThreshold = this.goodGradeThreshold;
  }

  // sets maximum grade
  lowerMinGrade(): void {
    if (this.borderlineGradeThreshold > this.goodGradeThreshold) {
      this.borderlineGradeThreshold = this.goodGradeThreshold;
    }
  }

  // handles error checking for batch form when creating new batch
  checkDates(id: string): void {
    if (this.startDate >= this.endDate && this.trainer === this.coTrainer) {
      this.dateIsError = true;
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (this.startDate >= this.endDate) {
      this.dateIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (this.trainer === this.coTrainer) {
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    }

    if (this.startDate < this.endDate && (this.trainer !== this.coTrainer)) {
      this.createBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  // handles error checking for batch when updating current batch
  checkDates2(id: string): void {
    if (this.startDate >= this.endDate && this.trainer === this.coTrainer) {
      this.dateIsError = true;
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (this.startDate >= this.endDate) {
      this.dateIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (this.trainer === this.coTrainer) {
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    }

    if (this.startDate < this.endDate && (this.trainer !== this.coTrainer)) {
      this.updateBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  // setter methods
  setTrainingType(option: string) {
    this.trainingType = option;
  }

  setSkillType(option: string) {
    this.skillType = option;
  }

  setLocation(option: number) {
    this.location = option;
  }

  setTrainer(option: string) {
    this.trainer = option;
  }

  // closes error modal
  closeModal() {
    document.getElementById('checkBatchModalDate').className = 'hidden';
    this.dateIsError = false;
    this.trainerIsError = false;
  }
}

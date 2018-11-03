import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormGroup } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BLocation } from '../type/location';

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit, OnChanges {
  @Input() createOrUpdate: Batch;
  @Output() someEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();

  currBatch: Batch;
  batchFormName: '';
  trainingName: string = null;
  trainingType: string = null;
  trainingTypes: string[];
  skillType: string = null;
  skillTypes: string[];
  location: string = null;
  // needs to be a location type
  locationOptions: string[];
  trainer: string = null;
  // needs to be a user type
  trainers: string[];
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
    this.trainers = ['Patrick Walsh', 'Dan Pickles', 'Ravi Singh'];
    this.skillTypes = ['Java', 'Spark', '.NET', 'PEGA'];
    this.locationOptions = ['Virginia', 'New York', 'Texas'];
    this.trainingTypes = ['Revature', 'Corporate', 'University', 'Other'];
  }

  setValues() {
    console.log(this.createOrUpdate);
    this.trainingName = this.createOrUpdate.trainingName;
    this.trainingType = this.createOrUpdate.trainingType;
    this.skillType = this.createOrUpdate.skillType;
    this.location = 'New York';
    // this.location = this.createOrUpdate.location;
    this.trainer = this.createOrUpdate.trainer;
    this.coTrainer = this.createOrUpdate.coTrainer;

    const d = new Date(this.createOrUpdate.startDate);
    this.startDate = d;
    console.log(this.startDate);
    console.log('start date: ' + d);
    this.endDate = this.createOrUpdate.endDate;

    this.goodGradeThreshold = this.createOrUpdate.goodGrade;
    this.borderlineGradeThreshold = this.createOrUpdate.passingGrade;
  }
  ngOnInit() {
    console.log('generated');
    // generate all the skilltypes
    // this.batchservice.getAllSkillTypes().subscribe( results => {
    //   console.log(results);
    //   this.skillTypes = results;
    // });
    // this.batchservice.getAllLocations().subscribe( locs => {
    //   this.locationOptions = locs;
    // });
    // console.log(this.skillTypes);
  }

  ngOnChanges() {
    if (this.createOrUpdate != null) {
      this.setValues();
    }
  }
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
  createBatch(): void {
    console.log(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold));

    const sdate = new Date(this.startDate);
    sdate.setMinutes(sdate.getMinutes() + sdate.getTimezoneOffset());
    this.startDate = sdate;
    const edate = new Date(this.endDate);
    edate.setMinutes(edate.getMinutes() + edate.getTimezoneOffset());
    this.endDate = edate;
    this.batchservice.postBatch(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold)).subscribe(result => {
        console.log('created');
        this.someEvent.next('created');
        this.resetForm();
      });
  }

  updateBatch(): void {
    // set dates
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
      console.log('created');
      this.someEvent.next('created');
      this.resetForm();
    });
  }

  setMinGrade(): void {
    this.borderlineGradeThreshold = this.goodGradeThreshold;
  }

  lowerMinGrade(): void {
    if (this.borderlineGradeThreshold > this.goodGradeThreshold) {
      this.borderlineGradeThreshold = this.goodGradeThreshold;
    }
  }

  checkDates(id: string): void {
    if (this.startDate >= this.endDate && this.trainer === this.coTrainer) {
      this.dateIsError = true;
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    } else if (this.startDate >= this.endDate) {
      this.dateIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    } else if (this.trainer === this.coTrainer) {
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    }

    if (this.startDate < this.endDate && (this.trainer !== this.coTrainer)) {
      console.log('this is fine');
      this.createBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  checkDates2(id: string): void {
    if (this.startDate >= this.endDate && this.trainer === this.coTrainer) {
      this.dateIsError = true;
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    } else if (this.startDate >= this.endDate) {
      this.dateIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    } else if (this.trainer === this.coTrainer) {
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      console.log('this is not fine');
      return;
    }

    if (this.startDate < this.endDate && (this.trainer !== this.coTrainer)) {
      console.log('this is fine');
      this.updateBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  setTrainingType(option: string) {
    this.trainingType = option;
  }

  setSkillType(option: string) {
    this.skillType = option;
  }

  setLocation(option: string) {
    this.location = option;
  }

  setTrainer(option: string) {
    this.trainer = option;
  }

  closeModal() {
    document.getElementById('checkBatchModalDate').className = 'hidden';
    this.dateIsError = false;
    this.trainerIsError = false;
  }
}

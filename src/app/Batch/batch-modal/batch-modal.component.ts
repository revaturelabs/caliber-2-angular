import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormGroup } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { BLocation } from '../type/location';
import { ServiceError } from 'src/app/error-handling/types/service-error';
import { ErrorService } from 'src/app/error-handling/services/error.service';


  /**
  * The batch modal component is the child component of the batch view component.
  *It handles the modal used to create and update batches.
  *This component also handles form validation from the user.
  * @author Anthony Jin, Juan Trejo
  */
@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit, OnChanges {

  /**
   * grabs value from parent component
   */
  @Input() createOrUpdate: Batch;

  /**
   * modal event emmitters
   */
  @Output() someEvent = new EventEmitter<string>();
  @Output() closeEvent = new EventEmitter<string>();

  currBatch: Batch;
  batchFormName: '';
  trainingName: string = null;
  trainingType: string = null;
  trainingTypes: string[] = ['Revature', 'Corporate', 'University', 'Other'];
  skillType: string = null;
  skillTypes: string[];
  location: string = null;
  locationId: number;
  locationOptions: BLocation[];
  trainer: string = null;
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
    private batchservice: BatchService,
    private errorService: ErrorService) {
  }

  /**
   * populates form modal if updating batch and not creating new
   */
  setValues() {
    console.log(this.createOrUpdate);
    this.trainingName = this.createOrUpdate.trainingName;
    this.trainingType = this.createOrUpdate.trainingType;
    this.skillType = this.createOrUpdate.skillType;
    this.location = this.createOrUpdate.location;
    this.locationId = this.createOrUpdate.locationId;
    this.trainer = this.createOrUpdate.trainer;
    this.coTrainer = this.createOrUpdate.coTrainer;

    // handle start and end dates
    const d = new Date(this.createOrUpdate.startDate);
    this.startDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    const d2 = new Date(this.createOrUpdate.endDate);
    this.endDate = new Date(d2.getTime() + (d2.getTimezoneOffset() * 60000));

    // handle grades
    this.goodGradeThreshold = this.createOrUpdate.goodGrade;
    this.borderlineGradeThreshold = this.createOrUpdate.passingGrade;
  }

  ngOnInit() {
    console.log('generated');
    // generate all the skilltypes
    this.batchservice.getAllSkillTypes().subscribe(results => {
      this.skillTypes = results;
    }, error => {
      const serviceName = 'Skill Type Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    }
    );
    // generate all the locations
    this.batchservice.getAllLocations().subscribe(locs => {
      this.locationOptions = locs;
    }, error => {
      const serviceName = 'Location Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
    // generate all the trainers
    this.batchservice.getAllTrainers().subscribe(t => {
      this.trainers = t;
    }, error => {
      const serviceName = 'Trainer Service ';
      const errorMessage = 'Failed to make connection!';
      this.errorService.setError(serviceName, errorMessage);
    });
  }

  /**
   * prepopulates the batch info if existing batch is passed through the parent
   */
  ngOnChanges() {
    if (this.createOrUpdate != null) {
      console.log('change detected');
      this.setValues();
    }
  }

  /**
   * resets the form info to default values
   */
  resetForm() {
    console.log('inside resetForm');
    this.trainingName = null;
    this.trainingType = undefined;
    (<HTMLFormElement>document.getElementById('formId')).reset();
    this.skillType = undefined;
    this.trainer = undefined;
    this.coTrainer = undefined;
    this.location = undefined;
    this.locationId = undefined;
    this.startDate = undefined;
    this.endDate = undefined;
    this.goodGradeThreshold = undefined;
    this.borderlineGradeThreshold = undefined;
    this.closeEvent.next('closed');
    this.createOrUpdate = null;
  }

  /**
   * creates a brand new batch with form inputs
   */
  createBatch(): void {
    console.log(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.locationId, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold));

    // account for time zone differences
    const d = new Date(this.startDate);
    this.startDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    const d2 = new Date(this.endDate);
    this.endDate = new Date(d2.getTime() + (d2.getTimezoneOffset() * 60000));

    // sends post request with batch to back-end
    this.batchservice.postBatch(new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.locationId, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold)).subscribe(result => {
        console.log('created');
        this.someEvent.next('created');
        this.resetForm();
      });
  }

  /**
   * updates the batch using form inputs
   */
  updateBatch(): void {
    // set dates and account for time zone difference
    const d = new Date(this.startDate);
    this.startDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    const d2 = new Date(this.endDate);
    this.endDate = new Date(d2.getTime() + (d2.getTimezoneOffset() * 60000));

    // make updated batch
    const batch = new Batch(this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.locationId, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold);
    batch.batchId = this.createOrUpdate.batchId;

    // update batch in backend
    this.batchservice.putBatch(batch).subscribe(result => {
      console.log('updated');
      this.someEvent.next('created');
      this.resetForm();
    });
  }

  /**
   * sets minimal passing grade
   */
  setMinGrade(): void {
    this.borderlineGradeThreshold = this.goodGradeThreshold;
  }

  /**
   * sets maximum grade
   */
  lowerMinGrade(): void {
    if (this.borderlineGradeThreshold > this.goodGradeThreshold) {
      this.borderlineGradeThreshold = this.goodGradeThreshold;
    }
  }

  /**
   * handles error checking for batch form when creating new batch
   */
  checkDates(): void {
    const d = new Date(this.startDate);
    this.startDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
    const d2 = new Date(this.endDate);
    this.endDate = new Date(d2.getTime() + (d2.getTimezoneOffset() * 60000));
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
    } else  {
      this.createBatch();
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  /**
   *  handles error checking for batch when updating current batch
   */
  checkDates2(): void {
    const d = new Date(this.startDate);
    d.setHours(0, 0, 0, 0);
    const d2 = new Date(this.endDate);
    d2.setHours(0, 0, 0, 0);
    console.log(d + '|' + d2);
    if (d >= d2 && this.trainer === this.coTrainer) {
      console.log(1);
      this.dateIsError = true;
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (d >= d2) {
      console.log(2);
      this.dateIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else if (this.trainer === this.coTrainer) {
      console.log(3);
      this.trainerIsError = true;
      document.getElementById('checkBatchModalDate').className = 'show';
      return;
    } else {
      console.log(5);
      this.updateBatch();
      console.log(6);
      const elem = document.getElementById('closeBtn');
      const evt = new MouseEvent('click', { bubbles: true });
      elem.dispatchEvent(evt);
    }
  }

  /**
   * set training type
   * @param option trainingType
   */
  setTrainingType(option: string) {
    this.trainingType = option;
  }

  /**
   * set skilltype
   * @param option skilltype
   */
  setSkillType(option: string) {
    this.skillType = option;
  }

  /**
   * set location
   * @param option location
   */
  setLocation(option: number) {
    this.locationId = option;
  }

  /**
   * set trainer
   * @param option trainer
   */
  setTrainer(option: string) {
    this.trainer = option;
  }

  /**
   *  closes error modal
   */
  closeModal() {
    document.getElementById('checkBatchModalDate').className = 'hidden';
    this.dateIsError = false;
    this.trainerIsError = false;
  }
}

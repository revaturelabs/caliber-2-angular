import { Component, OnInit } from '@angular/core';
import { BatchService } from '../batch.service';
import { FormsModule } from '@angular/forms';
import { Batch } from '../type/batch';
import { Trainer } from '../type/trainer';

@Component({
  selector: 'app-batch-modal',
  templateUrl: './batch-modal.component.html',
  styleUrls: ['./batch-modal.component.css']
})
export class BatchModalComponent implements OnInit {

  batchFormName: '';
  trainingName: string;
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

  constructor(private batchservice: BatchService) {
    this.trainers = ['Patrick Walsh', 'Dan Pickles', 'Ravi Singh'];
    // this.trainers = [
    //   new Trainer(1, 'Patrick Walsh', 'Lead Trainer', 'patrick@revature.com',
    //   'ROLE_VP'),
    //   new Trainer(2, 'Dan Pickles', 'Lead Trainer', 'pjw6193@hotmail.com',
    //   'ROLE_VP'),
    //   new Trainer(3, 'Ravi Singh', 'Vice Preseident of Technology',
    //   'ravi.cto@revature.com', 'ROLE_VP')
    // ];
  }

  ngOnInit() {
    console.log('generated');
    // generate all the skilltypes
    this.batchservice.getAllSkillTypes().subscribe( results => {
      console.log(results);
      this.skillTypes = results;
    });
    console.log(this.skillTypes);
  }

  // Method to get all training types
  createBatch(): void {
    this.batchservice.postBatch(new Batch(1, this.trainingName, this.trainingType,
      this.skillType, this.trainer, this.coTrainer, this.location, this.startDate,
      this.endDate, this.goodGradeThreshold, this.borderlineGradeThreshold)).subscribe(result => {
        console.log('created');
      });
  }
  // Method: setMinGrade
  setMinGrade(): void {
    this.borderlineGradeThreshold = this.goodGradeThreshold;
  }

  lowerMinGrade(): void {
    if (this.borderlineGradeThreshold > this.goodGradeThreshold) {
      this.borderlineGradeThreshold = this.goodGradeThreshold;
    }
  }

  checkDates(): void {
    if (this.startDate < this.endDate) {
      console.log('this is fine');
      this.createBatch();
    } else {
      console.log('this is not fine');
    }
  }

}

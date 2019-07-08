import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from '../../Models/qanote';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';
import { Category } from 'src/app/Assess-Batch/Models/Category';

@Component({
  selector: 'app-individual-qcresults-table',
  templateUrl: './individual-qcresults-table.component.html',
  styleUrls: ['./individual-qcresults-table.component.css']
})
export class IndividualQCResultsTableComponent implements OnInit {
  qcData: QANote[];
  categoryDataStore: Category[] = [];
  assessmentDataStore: Assessment[] = [];
  categoryForWeek: Category[] = [];
  categoryId: number[] = [];
  batchAssessmentDataStore: Assessment[] = [];
  week: number;
  batch: Batch;
  message: String;
  overallFeedback: number;
  overallFeedbackString: String;
  trainee;
  public weekSelected: boolean;



  constructor(private reportService: ReportService) {
    if (!this.qcData) {
      this.qcData = [];
    }
   }

  ngOnInit() {}

  /*
  *Function called by the reports component to let this know to udate itself
  *Grabs the QA notes and filters them into a two dimensional array based on the week
  */
  update() {
    this.weekSelected = this.reportService.week > 0;

    this.qcData = this.reportService.getQANoteDataStore();
    this.categoryDataStore = this.reportService.getCategoryDataStore();
    this.assessmentDataStore = this.reportService.getAssessmentDataStore();
    this.trainee = this.reportService.getTrainee();

    this.determineCategoryForWeek();
    this.determineBatchAverage();
    this.determineOverallString();

    if (this.qcData === undefined || this.qcData.length === 0) {
      this.reportService.getAllQANotes().subscribe((qcNotes: QANote[]) => {
        this.qcData = qcNotes;
        this.categoryDataStore = this.reportService.getCategoryDataStore();
        this.assessmentDataStore = this.reportService.getAssessmentDataStore();
        this.trainee = this.reportService.getTrainee();

        this.determineCategoryForWeek();
        this.determineBatchAverage();
        this.determineOverallString();
      });
    } else {
      this.qcData = this.reportService.getQANoteDataStore();
      this.categoryDataStore = this.reportService.getCategoryDataStore();
      this.assessmentDataStore = this.reportService.getAssessmentDataStore();
      this.trainee = this.reportService.getTrainee();

      this.determineCategoryForWeek();
      this.determineBatchAverage();
      this.determineOverallString();
    }
    console.log(this.categoryForWeek);
    console.log(this.overallFeedback);
    console.log(this.determineOverallString);
    console.log(this.trainee);
    console.log(this.qcData);
  }

  determineCategoryForWeek() {
    this.categoryForWeek = [];
    this.categoryId = [];
    for (let i = 0; i < this.assessmentDataStore.length; i++) {
      if (this.qcData[0].batchId === this.assessmentDataStore[i].batchId) {
        if (this.qcData[0].week === this.assessmentDataStore[i].weekNumber) {
          if (this.categoryId.find(x => x === this.assessmentDataStore[i].assessmentCategory) === undefined) {
            this.categoryId.push(this.assessmentDataStore[i].assessmentCategory);
          }
        }
      }
    }
    for (let i = 0; i < this.categoryId.length; i++) {
      console.log(this.categoryId[i]);
      for (let j = 0; j < this.categoryDataStore.length; j++) {
        if (this.categoryId[i] === this.categoryDataStore[j].categoryId) {
          if (this.categoryForWeek.includes(this.categoryDataStore[j]) === false) {
          this.categoryForWeek.push(this.categoryDataStore[j]);
          console.log(this.categoryDataStore[j]);
          }
        }
      }
    }
  }

  determineBatchAverage() {
    let numberOfPeople = 0;
    this.overallFeedback = 0;
    for (let i = 0; i < this.qcData.length; i++) {
      switch (this.qcData[i].qcStatus) {
        case 'Superstar':
          this.overallFeedback = this.overallFeedback + 4;
          numberOfPeople += 1;
          break;
        case 'Good':
            this.overallFeedback = this.overallFeedback + 3;
          numberOfPeople += 1;
          break;
        case 'Average':
            this.overallFeedback = this.overallFeedback + 2;
          numberOfPeople += 1;
          break;
        case 'Poor':
            this.overallFeedback = this.overallFeedback + 1;
          numberOfPeople += 1;
          break;
        default:
          break;
      }
    }
    console.log('Raw Overall: ' + this.overallFeedback);
    this.overallFeedback = this.overallFeedback / numberOfPeople;
    console.log('Raw Average Overall: ' + this.overallFeedback);
    this.overallFeedback = Math.round(this.overallFeedback);
    console.log(this.overallFeedback);
  }

  determineOverallString() {
    switch (this.overallFeedback) {
      case 1: {
        this.overallFeedbackString = 'Poor';
        break;
      }
      case 2: {
        this.overallFeedbackString = 'Average';
        break;
      }
      case 3: {
        this.overallFeedbackString = 'Good';
        break;
      }
      case 4: {
        this.overallFeedbackString = 'Superstar';
        break;
      }
      default: {
        this.overallFeedbackString = 'No data';
        break;
      }
    }
  }
}

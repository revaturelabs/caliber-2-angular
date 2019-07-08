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
  qcData : QANote[];
  categoryDataStore : Category[] = [];
  assessmentDataStore : Assessment[]= [];
  categoryForWeek : Category[] = [];
  categoryId : number[] = [];
  batchAssessmentDataStore : Assessment[] =[];
  week : number;
  batch : Batch;
  message : String;
  overallNote : QANote;
  trainees;
  public weekSelected : boolean = false;



  constructor(private reportService : ReportService) {
    if (!this.qcData){
      this.qcData=[];
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

    this.determineCategoryForWeek();

    if (this.qcData == undefined || this.qcData.length === 0){
      this.reportService.getAllQANotes().subscribe((qcNotes : QANote[])=>{
        this.qcData = qcNotes;

        this.categoryDataStore = this.reportService.getCategoryDataStore();
        this.assessmentDataStore = this.reportService.getAssessmentDataStore();
        this.determineCategoryForWeek();
      });
      
    }
    else {
      this.qcData = this.reportService.getQANoteDataStore();
      this.categoryDataStore = this.reportService.getCategoryDataStore();
      this.assessmentDataStore = this.reportService.getAssessmentDataStore();
      this.determineCategoryForWeek();
    }
    console.log(this.categoryForWeek);
  }

  determineCategoryForWeek(){
    for (let i = 0; i < this.assessmentDataStore.length; i++){
      if (this.qcData[0].batchId == this.assessmentDataStore[i].batchId && this.qcData[0].week == this.assessmentDataStore[i].weekNumber){
        if (this.categoryId.find(x => x == this.assessmentDataStore[i].assessmentCategory) === undefined){
          this.categoryId.push(this.assessmentDataStore[i].assessmentCategory);
        }
      }
    }
    for (let i = 0; i < this.categoryId.length; i++){
      for (let j = 0; j < this.categoryDataStore.length; j++){
        if (this.categoryId[i] == this.categoryDataStore[j].categoryId){
          this.categoryForWeek.push(this.categoryDataStore[j]);
        }
      }
    }
  }
}

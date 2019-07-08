import { Component, OnInit } from '@angular/core';
import { Batch } from '../../models/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { HomeService } from '../../service/home.service';
import { LastQualityAuditService } from '../../services/last-quality-audit.service';
// import { LastQualityAuditService } from '../../services/last-quality-audit.service';

@Component({
  selector: 'app-last-quality-audit-table',
  templateUrl: './last-quality-audit-table.component.html',
  styleUrls: ['./last-quality-audit-table.component.css']
})

export class LastQualityAuditTableComponent implements OnInit {
  statuses: string[];
  batchDataStore: Batch[];
  poorArray: number[];
  averageArray: number[];
  goodArray: number[];
  starArray: number[];
  overallStatusArray: String[];
  private qaNoteDataStore: QANote[][];
  constructor(private homeService: HomeService, private lastQualityAudit: LastQualityAuditService) {
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
    // this.lastQualityAudit.getBatches().subscribe(data => {
    //   this.batches = data;
    // });
   }

  ngOnInit() {
  }

  updateBatches(state, city) {
    console.log(state + ' ' + city);
  }
  update() {
    this.batchDataStore = this.homeService.getBatchesDataStore();
    this.qaNoteDataStore = this.homeService.getQANotesDataStore();
    console.log(this.qaNoteDataStore);

    this.poorArray = [];
    this.averageArray = [];
    this.goodArray = [];
    this.starArray = [];
    this.overallStatusArray = [];

    let week: number;
    let index: number = 0;
    this.qaNoteDataStore.forEach(
      (qaArray)=>{
        week = 0;
        qaArray.forEach(
          (qaNote)=>{
            if(qaNote.week > week){
              week = qaNote.week;
            }
          });
        this.poorArray.push(0);
        this.averageArray.push(0);
        this.goodArray.push(0);
        this.starArray.push(0);

        qaArray.forEach(
          (qaNote)=>{
            if(qaNote.week === week && qaNote.traineeId>0){
              switch(qaNote.qcStatus){
                case 'Poor': this.poorArray[index] +=1; break;
                case 'Average': this.averageArray[index] +=1; break;
                case 'Good': this.goodArray[index] +=1; break;
                case 'Superstar': this.starArray[index] +=1; break;
                // case 'Undefined': undefinedArray[index] +=1; break;
              }
            }
            if (qaNote.week === week && qaNote.traineeId === 0) {
              console.log(qaNote.qcStatus);
              this.overallStatusArray[index] = qaNote.qcStatus;
            }
        });
        index++;
  });
  // console.log(this.goodArray);
  // console.log(this.starArray);
  console.log(this.overallStatusArray);
}




}

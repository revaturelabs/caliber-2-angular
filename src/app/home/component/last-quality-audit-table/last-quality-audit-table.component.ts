import { Component, OnInit } from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";
import {QcNote} from "../../../domain/model/qc-note.dto";
import {HomeService} from "../../../services/home.service";

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
  statusColorArray: string[];
  overallStatusArray: String[];
  private qaNoteDataStore: QcNote[][];
  constructor(private homeService: HomeService) {
    this.statuses = ['Poor', 'Average', 'Good', 'Superstar', 'Overall Batch Status'];
  }

  ngOnInit() {
  }


  update() {
    this.batchDataStore = this.homeService.getBatchesDataStore();
    this.qaNoteDataStore = this.homeService.getQANotesDataStore();

    this.poorArray = [];
    this.averageArray = [];
    this.goodArray = [];
    this.starArray = [];
    this.overallStatusArray = [];
    this.statusColorArray = [];

    const batchIdLead: number[] = [];
    this.batchDataStore.forEach(
      (batch) => {
        batchIdLead.push(batch.batchId);
      }
    )
    const batchIdFollow: number[] = [];


    let week: number;
    let index = 0;
    // debugger;
    console.log(this.qaNoteDataStore);
    this.qaNoteDataStore.forEach(
      (qaArray) => {
        week = 0;
        qaArray.forEach(
          (qaNote) => {
            if (qaNote.week > week) {
              week = qaNote.week;
            }
          });
        batchIdFollow.push(qaArray[0].batchId);
        this.poorArray.push(0);
        this.averageArray.push(0);
        this.goodArray.push(0);
        this.starArray.push(0);

        qaArray.forEach(
          (qaNote) => {
            if (qaNote.week === week && qaNote.traineeId > 0) {
              switch (qaNote.qcStatus) {
                case 'Poor': this.poorArray[index] += 1; break;
                case 'Average': this.averageArray[index] += 1; break;
                case 'Good': this.goodArray[index] += 1; break;
                case 'Superstar': this.starArray[index] += 1; break;
                // case 'Undefined': undefinedArray[index] +=1; break;
              }
            }
            if (qaNote.week === week && qaNote.traineeId === 0) {
              let color;
              if (qaNote.qcStatus === 'Undefined') {
                this.overallStatusArray[index] = 'N/A';
              } else {
                this.overallStatusArray[index] = qaNote.qcStatus;
              }
              // this.statusColorArray.push('');
              switch (qaNote.qcStatus) {
                case 'Undefined': color = 'orange'; break;
                case 'Poor': color = 'red'; break;
                case 'Average': color = 'yellow'; break;
                case 'Good': color = 'green'; break;
                case 'Superstar': color = 'blue'; break;
              }
              this.statusColorArray[index] = color;
            }
          });
        index++;
      });

    let batchIdLeader: number[] = [];

    for (let i = 0; i < batchIdLead.length; i++) {
      if (batchIdFollow.includes(batchIdLead[i])) {
        batchIdLeader.push(batchIdLead[i]);
      }
    }

    batchIdLeader.forEach((element, ctIndex) => {
      if (ctIndex < batchIdFollow.length && element !== batchIdFollow[ctIndex]) {
        let i: number = 0;
        let temp: number;
        let tempWeek: number;
        let poorArrayTemp: number;
        let averageArrayTemp: number;
        let goodArrayTemp: number;
        let starArrayTemp: number;
        let overallStatusArrayTemp: String;
        let colorArrayTemp: string;
        for (i = 0; i < batchIdFollow.length; i++) {
          if (batchIdFollow[i] == element) {
            temp = batchIdFollow[i];
            //tempWeek = this.chartWeekReference[i];
            poorArrayTemp = this.poorArray[i];
            averageArrayTemp = this.averageArray[i];
            goodArrayTemp = this.goodArray[i];
            starArrayTemp = this.starArray[i];
            overallStatusArrayTemp = this.overallStatusArray[i];
            colorArrayTemp = this.statusColorArray[i];

            batchIdFollow[i] = batchIdFollow[ctIndex];
            //this.chartWeekReference[i] = this.chartWeekReference[ctIndex];
            this.poorArray[i] = this.poorArray[ctIndex];
            this.averageArray[i] = this.averageArray[ctIndex];
            this.goodArray[i] = this.goodArray[ctIndex];
            this.starArray[i] = this.starArray[ctIndex];
            this.overallStatusArray[i] = this.overallStatusArray[ctIndex];
            this.statusColorArray[i] = this.statusColorArray[ctIndex];


            batchIdFollow[ctIndex] = temp;
            //this.chartWeekReference[ctIndex] = tempWeek;
            this.poorArray[ctIndex] = poorArrayTemp;
            this.averageArray[ctIndex] = averageArrayTemp;
            this.goodArray[ctIndex] = goodArrayTemp;
            this.starArray[ctIndex] = starArrayTemp;
            this.overallStatusArray[ctIndex] = overallStatusArrayTemp;

            // let color: string;
            // switch (overallStatusArrayTemp) {
            //   case 'Undefined': color = 'orange'; break;
            //   case 'Poor': color = 'red'; break;
            //   case 'Average': color = 'yellow'; break;
            //   case 'Good': color = 'green'; break;
            //   case 'Superstar': color = 'blue'; break;
            // }
            this.statusColorArray[ctIndex] = colorArrayTemp;
          }
        }
      }
    });
  }

}

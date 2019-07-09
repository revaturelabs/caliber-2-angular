import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HomeService } from '../../service/home.service';
import { Location } from '../../models/location';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-last-quality-audit-graph',
  templateUrl: './last-quality-audit-graph.component.html',
  styleUrls: ['./last-quality-audit-graph.component.css']
})
export class LastQualityAuditGraphComponent implements OnInit {
  private locationDataStore: Location[];
  private batchDataStore: Batch[];
  private qaNoteDataStore: QANote[][];


  public barChartOptions: ChartOptions = {
    tooltips: {
      mode: 'label',
      // Note: setting mode to label displays all existing labels in a dataset at once. Without this,
      // individual data points will display their own label independently.
      itemSort: function(a, b) { return b.datasetIndex - a.datasetIndex; },
      callbacks: {
        // Callback function could go here, to say, dynamically generate a label.
      }
    },
    responsive: true,
    scales : {
      yAxes: [{
        scaleLabel: {
        display: true,
        // labelString: 'Average'
      },
        ticks: {
          // max : 100,
           min : 0,
          // stepSize: 20,
          padding: 0,
          backdropPaddingX: 0,
          display: true,
        }
      }]
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public readonly superstarBackgroundColor = 'rgba(57, 63, 239, 0.3)';
  public readonly goodBackgroundColor = 'rgba(24, 173, 24, 0.3)';
  public readonly averageBackgroundColor = 'rgba(249, 233, 0, 0.3)';
  public readonly poorBackgroundColor = 'rgba(234, 40, 37, 0.3)';

  public readonly superstarHoverColor = 'rgba(57, 63, 239, .35)';
  public readonly goodHoverColor = 'rgba(24, 173, 24, .35)';
  public readonly averageHoverColor = 'rgba(249, 233, 0, .35)';
  public readonly poorHoverColor = 'rgba(234, 40, 37, .35)';

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A'}
  ];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  update() {
    this.locationDataStore = this.homeService.getLocationsDataStore();
    this.batchDataStore = this.homeService.getBatchesDataStore();
    this.qaNoteDataStore = this.homeService.getQANotesDataStore();

    this.barChartLabels = [];
    const batchIdLead: number[] = [];
    this.batchDataStore.forEach(
      (batch) => {
      this.barChartLabels.push(
      batch.trainer + ' ' + new Date(Number.parseInt(batch.startDate.toString(), 0)).toISOString().substring(0, 9));
      batchIdLead.push(batch.batchId);
    });

    const batchIdFollow: number[] = [];
    const poorArray: number[] = [];
    const averageArray: number[] = [];
    const goodArray: number[] = [];
    const starArray: number[] = [];
    // const undefinedArray: number[] = [];
    const borderWidth: number[] = [];
    let week: number;
    let index = 0;

    this.qaNoteDataStore.forEach(
      (qaArray) => {
        if(qaArray.length > 0) {
        week = 0;
        qaArray.forEach(
          (qaNote) => {
            if (qaNote.week > week) {
              week = qaNote.week;
            }
          });

        batchIdFollow.push(qaArray[0].batchId);
        poorArray.push(0);
        averageArray.push(0);
        goodArray.push(0);
        starArray.push(0);
        // undefinedArray.push(0);
        borderWidth.push(2);

        qaArray.forEach(
          (qaNote) => {
            if (qaNote.week === week && qaNote.traineeId > 0) {
              switch (qaNote.qcStatus) {
                case 'Poor': poorArray[index] += 1; break;
                case 'Average': averageArray[index] += 1; break;
                case 'Good': goodArray[index] += 1; break;
                case 'Superstar': starArray[index] += 1; break;
              }
            }
          });
        index++;
        }
      });  

    let batchIdLeader: number[] = [];

    for(let i = 0; i< batchIdLead.length; i++){
      if(batchIdFollow.includes(batchIdLead[i])){
        batchIdLeader.push(batchIdLead[i]);
      }
    }

    batchIdLeader.forEach((element, ctIndex) => {
      if(ctIndex < batchIdFollow.length && element !== batchIdFollow[ctIndex]){
        let i: number = 0;
        let temp: number;
        let poorArrayTemp: number;
        let averageArrayTemp: number;
        let goodArrayTemp: number;
        let starArrayTemp: number;
        for(i = 0; i < batchIdFollow.length; i++){
          if(batchIdFollow[i] == element){
            temp = batchIdFollow[i];
            poorArrayTemp = poorArray[i];
            averageArrayTemp = averageArray[i];
            goodArrayTemp = goodArray[i];
            starArrayTemp = starArray[i];

            batchIdFollow[i] = batchIdFollow[ctIndex];
            poorArray[i] = poorArray[ctIndex];
            averageArray[i] = averageArray[ctIndex];
            goodArray[i] = goodArray[ctIndex];
            starArray[i] = starArray[ctIndex];

            batchIdFollow[ctIndex] = temp;
            poorArray[ctIndex] = poorArrayTemp;
            averageArray[ctIndex] = averageArrayTemp;
            goodArray[ctIndex] = goodArrayTemp;
            starArray[ctIndex] = starArrayTemp;
          }
        }
      }
    });

    this.barChartData = [
      { data: poorArray,      label: 'Poor',        borderWidth: borderWidth,
      stack: 'a', backgroundColor: this.poorBackgroundColor,      borderColor: this.poorHoverColor,
      hoverBackgroundColor: this.poorHoverColor,      hoverBorderColor: this.poorHoverColor, },
      { data: averageArray,   label: 'Average',     borderWidth: borderWidth,
      stack: 'a', backgroundColor: this.averageBackgroundColor,   borderColor: this.averageHoverColor,
      hoverBackgroundColor: this.averageHoverColor,   hoverBorderColor: this.averageHoverColor, },
      { data: goodArray,      label: 'Good',        borderWidth: borderWidth,
      stack: 'a', backgroundColor: this.goodBackgroundColor,      borderColor: this.goodHoverColor,
      hoverBackgroundColor: this.goodHoverColor,      hoverBorderColor: this.goodHoverColor, },
      { data: starArray,      label: 'Superstar',   borderWidth: borderWidth,
      stack: 'a', backgroundColor: this.superstarBackgroundColor, borderColor: this.superstarHoverColor,
      hoverBackgroundColor: this.superstarHoverColor, hoverBorderColor: this.superstarHoverColor, },
      // { data: undefinedArray, label: 'unidentified',borderWidth: borderWidth,
      // stack: 'a', backgroundColor: 'rgba(114, 164, 194, .5)',    borderColor: 'rgba(114, 164, 194, .5)',
      // hoverBackgroundColor: 'rgba(114, 164, 194, .5)',hoverBorderColor: 'rgba(114, 164, 194, .5)'},
    ];
  }
}

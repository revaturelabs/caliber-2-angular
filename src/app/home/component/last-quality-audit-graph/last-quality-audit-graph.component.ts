import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-last-quality-audit-graph',
  templateUrl: './last-quality-audit-graph.component.html',
  styleUrls: ['./last-quality-audit-graph.component.css']
})
export class LastQualityAuditGraphComponent implements OnInit {
  private locationDataStore;
  private batchDataStore;
  private qaNoteDataStore;


  public barChartOptions: ChartOptions = {
    tooltips: {
      mode: 'label', //Note: setting mode to label displays all existing labels in a dataset at once. Without this, individual data points will display their own label independently.
      callbacks: {
        //Callback function could go here, to say, dynamically generate a label.
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
  public barChartColors: Array<any> = [
    { 
      backgroundColor: 'rgba(114, 164, 194, .5)',
      borderColor: 'rgba(114, 164, 194, 1)',
      pointBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointBorderColor: 'rgba(252, 180, 20, 1)',
      pointHoverBackgroundColor: 'rgba(252, 180, 20, .6)',
      pointHoverBorderColor: 'rgba(252, 180, 20, 1)',
    }];
    // public readonly defaultBorderColor2 = 'rgba(252, 180, 20, 1)';

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Series A'}
  ];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
  }

  update(){
    this.locationDataStore = this.homeService.getLocationsDataStore();
    this.batchDataStore = this.homeService.getBatchesDataStore();
    this.qaNoteDataStore = this.homeService.getQANotesDataStore();

    console.log("In Graph");
    console.log(this.locationDataStore);
    console.log(this.batchDataStore);
    console.log(this.qaNoteDataStore);
  }

}

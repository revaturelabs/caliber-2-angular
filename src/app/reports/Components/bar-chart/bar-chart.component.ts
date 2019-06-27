import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {


  private chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    }
  ];
  
  private chartDatasets: Array<any> = [
    { 
      data: [ 12,2,1 ],
      borderColor: "#3cba9f",
      fill: false,
      backgroundColor: this.chartColors
    },
    { 
      data: [ 14,5,1],
      borderColor: "#ffcc00",
      fill: false,
      backgroundColor: this.chartColors
    },
  ];
  
  private chartLabels: Array<any> = [ 'test', 'test'];


  private chart = [];
  
  constructor() { }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() { this.createChart() }
  
  public addDataSet(data : number, label : string, 
    backColor : string, hoverColor : string) : void
  {
    this.chartDatasets[0]["data"].push(data);
    this.chartLabels.push(label);
    this.chartDatasets[0]["backgroundColor"].push(backColor);
    //this.chartColors[0]["hoverBackgroundColor"].push(hoverColor);
  }

  public clearChart() : void {

    this.chartColors = [
      {
        backgroundColor: [ ]
      }
    ];
    this.chartDatasets = [
      { 
        data: [ ],
        borderColor: '#F7464A',
        fill: false,
        backgroundColor: []
      },
      { 
        data: [ ],
        borderColor: '#F7464A',
        fill: false,
        backgroundColor: []
      },
    ];
    this.chartLabels = [ ];

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: this.chartDatasets
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  createChart() {

    
    //this.clearChart();
   // this.addDataSet(123, 'TestData', '#da70d6', '#da70d6');
    //this.addDataSet(1243, 'TestData4', '#da70d6', '#da70d6');

  }
}

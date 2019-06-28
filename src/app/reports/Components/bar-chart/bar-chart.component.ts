import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public readonly defaultBackgroundColor = 'rgba(114, 164, 194, .5)';
  public readonly defaultBorderColor = 'rgba(114, 164, 194, 1)';
  public readonly defaultBackgroundColor2 = 'rgba(252, 180, 20, .6)';
  public readonly defaultBorderColor2 = 'rgba(252, 180, 20, 1)';

  private defaultBorderWidth = 3;
  private defaultMinimumYAxis = 40;
  private defaultMaxYAxis = 100;
  private defaultStepSize = 20;

  private chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    }
  ];

  private chartDatasets: Array<any> = [
    {
      data: [12, 8, 9],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
    {
      data: [12, 8, 9],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
  ];

  private chartLabels: Array<any> = ['test', 'test'];
  private chart = [];

  constructor() { }

  ngOnInit() {

  }

  public addDataPoint(data: number, pairWithDataset = 0, label: string, backColor = this.defaultBackgroundColor,
    borderColor = this.defaultBorderColor, borderWidth = this.defaultBorderWidth): void {

    let collision = false;
    for (let i = 0; i < this.chartDatasets.length; i++) {
      if (!this.chartDatasets[i]["data"][pairWithDataset]) { //This occurs if an empty spot is found in the data sets at this particular pair.
        collision = true;
        this.chartDatasets[i]["data"][pairWithDataset] = data;
        this.chartDatasets[i]["backgroundColor"].push(backColor);
        this.chartDatasets[i]["borderColor"] = borderColor;
        this.chartDatasets[i]["borderWidth"] = borderWidth;
        this.chartDatasets[i]["label"] = label;
        break;
      }
    }

    if (!collision) { //This occurs when there was no empty spot, and so the maximum category points has to be increased.
      this.incrementMaximumCategoryPoints();
      let index = this.chartDatasets.length - 1;

      this.chartDatasets[index]["data"][pairWithDataset] = data;
      this.chartDatasets[index]["backgroundColor"].push(backColor);
      this.chartDatasets[index]["borderColor"] = borderColor;
      this.chartDatasets[index]["borderWidth"] = borderWidth;
      this.chartDatasets[index]["label"] = label;
    }
  }

  public renameDataset(index: number, label: string) {
    this.chartLabels[index] = label;
  }

  public addDataset(label: string) {
    this.chartLabels.push(label);
  }

  public initializeChart(chartType = 'bar', stepSize = this.defaultStepSize,
    minimumYAxis = this.defaultMinimumYAxis, maximumYAxis = this.defaultMaxYAxis): void {

    //Emptying any existing colors
    this.chartColors = [
      {
        backgroundColor: []
      }
    ];

    //Empty labels
    this.chartLabels = [];

    //Empty any existing datasets.
    this.chartDatasets = [];

    //Creating an empty chart object:
    this.chart = new Chart('canvas', {
      type: chartType,
      data: {
        labels: this.chartLabels,
        datasets: this.chartDatasets
      },
      options: {
        title: {
          display: true,
          text: "Sample title"
        },
        tooltips: {
          mode: 'label', //Note: setting mode to label displays all existing labels in a dataset at once. Without this, individual data points will display their own label independently.
          callbacks: {
            //Callback function could go here, to say, dynamically generate a label.
          }
        },
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Average'
            },
            ticks: {
              suggestedMin: minimumYAxis,
              suggestedmax: maximumYAxis,
              stepSize: stepSize
            }
          }],
        }
      }
    });
  }
  
  private incrementMaximumCategoryPoints() {
    //Creating an empty dataset:
    this.chartDatasets.push({
      data: [],
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      fill: false,
      backgroundColor: [],
      label: ''
    })
  }

}

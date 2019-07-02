/*
To utilize this chart, consider running these methods in order:
  Initialize the chart, you can choose whether the chart will render as a bar chart, or line chart by putting 'bar' or 'line' as
  the first parameter.

initializeChart();

  Next add a dataset to contain the data points you will add.

addDataset('Category 1');

  Finally, add as many data points as you want by calling addDataPoint() like below multiple times. 
  
  The first parameter is the data being added. The second parameter is the name of that data point. The third parameter is the 
  dataset this datapoint will be added to. Since we added a dataset just before, there is only 1. The index for datasets begin 
  at 0, so 'Category 1' will be dataset with the index of 0. There are other values you can specify for more customization like 
  the background color and outline color, but these have a default value and can be omitted.

addDataPoint(70, 'Trainee Score', 0);
*/

import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-line-chart',
  templateUrl: './bar-line-chart.component.html',
  styleUrls: ['./bar-line-chart.component.css']
})
export class BarLineChartComponent implements OnInit {
  public readonly defaultBackgroundColor = 'rgba(114, 164, 194, .5)';
  public readonly defaultBorderColor = 'rgba(114, 164, 194, 1)';
  public readonly defaultBackgroundColor2 = 'rgba(252, 180, 20, .6)';
  public readonly defaultBorderColor2 = 'rgba(252, 180, 20, 1)';

  private defaultBorderWidth = 3;
  private defaultMinimumYAxis = 40;
  private defaultMaxYAxis = 100;
  private defaultStepSize = 20;

  private titleDisplay = false;
  private title = "Sample Title";

  private legendDisplay = false;

  private chartColors: Array<any> = [
    {
      backgroundColor: [ this.defaultBackgroundColor, this.defaultBackgroundColor2 ]
    }
  ];

  private chartDatasets: Array<any> = [
    {
      data: [55, 85],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
    {
      data: [75, 95],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
  ];

  @ViewChild('barLineChart') chartRef: ElementRef;
  private chartLabels: Array<any> = ['test', 'test'];
  private chart = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    //this.generateChart('bar',"Sample Title",false, 40, 100, 20); //Sample chart (Junk data)
    this.cd.detectChanges();
  }

  public addDataPoint(data: number, label: string, pairWithDataset = 0, backColor = this.defaultBackgroundColor,
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

  public initializeChart(chartType = 'bar', chartTitle = this.title, legendDisplay = this.legendDisplay,  stepSize = this.defaultStepSize,
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

    this.generateChart(chartType, chartTitle, legendDisplay, minimumYAxis, maximumYAxis, stepSize);
  }

  private generateChart(chartType : string, chartTitle: string, legendDisplay: boolean, minimumYAxis : number, maximumYAxis : number, stepSize: number){
  //Creating an empty chart object:
  const ctx = this.chartRef.nativeElement.getContext('2d');
  
  this.chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: this.chartLabels,
        datasets: this.chartDatasets
      },
      options: {
        title: {
          display: chartTitle ? true : false,
          text: chartTitle
        },
        tooltips: {
          mode: 'label', //Note: setting mode to label displays all existing labels in a dataset at once. Without this, individual data points will display their own label independently.
          callbacks: {
            //Callback function could go here, to say, dynamically generate a label.
          }
        },
        legend: {
          display: legendDisplay
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

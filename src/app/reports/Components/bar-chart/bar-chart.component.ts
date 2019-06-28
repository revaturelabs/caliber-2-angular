import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  /*
  var mainColor = {

                backgroundColor : 'rgba(114, 164, 194, .5)',

                pointBackgroundColor : 'rgba(114, 164, 194, .5)',

                borderColor : 'rgba(114, 164, 194, 1)',

                pointHoverBackgroundColor : 'rgba(114, 164, 194, .3)',

                pointHoverBorderColor : 'rgba(114, 164, 194, .3)',

                pointBorderColor : '#fff'

            };            var secondaryColor = {

                backgroundColor : 'rgba(252, 180, 20, .6)',

                pointBackgroundColor : 'rgba(252, 180, 20, .6)',

                borderColor : 'rgba(252, 180, 20, 1)',

                pointHoverBackgroundColor : 'rgba(252, 180, 20, .3)',

                pointHoverBorderColor : 'rgba(252, 180, 20, .3)',

                pointBorderColor : '#fff'

            };
            */
  private defaultBackgroundColor = 'rgba(114, 164, 194, .5)';
  private defaultBorderColor = 'rgba(114, 164, 194, 1)';

  private defaultBackgroundColor2 = 'rgba(252, 180, 20, .6)';
  private defaultBorderColor2 = 'rgba(252, 180, 20, 1)';

  private defaultBorderWidth = 3;
  private defaultMinimumYAxis = 0; //40
  private defaultMaxYAxis = 100;
  private defaultStepSize = 20;

  private chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    }
  ];
  
  private chartDatasets: Array<any> = [
    { 
      data: [ 12,8,9],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
    { 
      data: [12,8,9],
      fill: false,
      backgroundColor: this.chartColors,
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      label: ''
    },
  ];
  
  private chartLabels: Array<any> = [ 'test', 'test'];
  private chart = [];
  
  constructor() { }

  ngOnInit() {
    
  }
  
  ngAfterViewInit() 
  { 
    this.createChart() 
  }
  
  public addDataPoint(data : number, pairWithDataset = 0, label : string, backColor = this.defaultBackgroundColor, 
    borderColor = this.defaultBorderColor, borderWidth = this.defaultBorderWidth) : void
  {
    
    let collision = false;
    for (let i = 0; i < this.chartDatasets.length; i++)
    {
      if (!this.chartDatasets[i]["data"][pairWithDataset])
      { //This occurs if an empty spot is found in the data sets at this particular pair.
        collision = true;
        this.chartDatasets[i]["data"][pairWithDataset] = data;
        this.chartDatasets[i]["backgroundColor"].push(backColor);
        this.chartDatasets[i]["borderColor"] = borderColor;
        this.chartDatasets[i]["borderWidth"] = borderWidth;
        this.chartDatasets[i]["label"] = label;
      }
    }

    if (!collision)
    { //This occurs when there was no empty spot, and so the maximum category points has to be increased.
      this.incrementMaximumCategoryPoints();
      let index = this.chartDatasets.length - 1;
      
      this.chartDatasets[index]["data"][pairWithDataset] = data;
      this.chartDatasets[index]["backgroundColor"].push(backColor);
      this.chartDatasets[index]["borderColor"] = borderColor;
      this.chartDatasets[index]["borderWidth"] = borderWidth;
      this.chartDatasets[index]["label"] = label;
    }
  }

  public addLabel(label : string)
  {
    this.chartLabels.push(label);
  }

  private renameDataset(index : number, label : string)
  {
    this.chartLabels[index] = label;
  }

  private addDataset(label : string)
  {
    this.addLabel(label);
  }

  private incrementMaximumCategoryPoints()
  {
    this.chartDatasets.push({
      data: [ ],
      borderColor: this.defaultBorderColor,
      borderWidth: this.defaultBorderWidth,
      fill: false,
      backgroundColor: [ ],
      label: ''
    })
  }

  public initializeChart(chartType = 'bar'): void {

    this.chartColors = [
      {
        backgroundColor: [ ]
      }
    ];
    this.chartLabels = [ ];
    this.chartDatasets = [ ];
    
    /*
    this.chart = new Chart('canvas', {
      type: chartType,
      series: ['Trainee', 'Batch', "third"],
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
*/
this.chart = new Chart('canvas', {
  type: chartType,
  data: {
    
  series: ['Trainee', 'Batch', "third"],
    labels: this.chartLabels,
    datasets: this.chartDatasets
  },
  options: {
    title: {
      display: true,
      text: "Sample title"
    },
    tooltips: {
      mode: 'label',
      callbacks:{
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
      yAxes: [ {scaleLabel : {
        display : true,
        labelString : 'Average'
      },
      ticks : {
        suggestedMin : this.defaultMinimumYAxis,
        suggestedmax : this.defaultMaxYAxis,
        stepSize : this.defaultStepSize
      }}],
    }
  }
});
  }

  createChart() {

    
    this.initializeChart('bar');
    this.addDataset("Projects");
    this.addDataset("Exam");
    this.addDataset("Other");
    this.addDataset("Verbal");
    this.addDataPoint(78, 0, 'Trainee');
    this.addDataPoint(92, 0, 'Batch', this.defaultBackgroundColor2, this.defaultBorderColor2);
    
   this.addDataPoint(75, 1, 'Trainee');
    this.addDataPoint(82, 1, 'Batch', this.defaultBackgroundColor2, this.defaultBorderColor2);
    
    this.addDataPoint(49, 2, 'Trainee');
   this.addDataPoint(59, 2, 'Batch', this.defaultBackgroundColor2, this.defaultBorderColor2);
    
    this.addDataPoint(88.5, 3, 'Trainee');
    this.addDataPoint(89.5, 3, 'Batch', this.defaultBackgroundColor2, this.defaultBorderColor2);

    // this.addDataPoint(11, 1 , 'Test1');
    // this.addDataPoint(10, 0, 'Test1');
    // this.addDataPoint(9, 1, 'Test1');
    // this.addDataPoint(8, 0, 'Test1');
    // this.addDataPoint(7, 1, 'Test1');
    // this.addDataPoint(6, 0, 'Test1');
    // this.addDataPoint(5, 1, 'Test1');
    // this.addDataPoint(4, 0, 'Test1');
    console.log(this.chartDatasets);
    console.log(this.chart);

  }

}

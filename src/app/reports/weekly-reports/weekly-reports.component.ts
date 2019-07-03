import { Component, OnInit, ViewChild } from '@angular/core';
import { BarLineChartComponent } from '../Components/bar-line-chart/bar-line-chart.component';

@Component({
  selector: 'app-weekly-reports',
  templateUrl: './weekly-reports.component.html',
  styleUrls: ['./weekly-reports.component.css']
})
export class WeeklyReportsComponent implements OnInit {

  constructor() {

  }
  ngOnInit() {

  }

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }

}

// @ViewChild (BarLineChartComponent) chart : BarLineChartComponent;

//   constructor() { }

//   ngOnInit() {
//     this.chart.initializeChart();
//     this.chart.addDataset('Category 1');
//     this.chart.addDataPoint(70, 'Trainee Score', 0);
//   }

//   ngAfterViewInit(){
//     console.log(this.chart);
   
//   }
// }

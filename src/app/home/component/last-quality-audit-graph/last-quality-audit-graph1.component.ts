import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HomeService } from '../../service/home.service';
import { Location } from '../../models/location';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { TraineeService } from 'src/app/Assess-Batch/Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { AssessmentService } from 'src/app/Assess-Batch/Services/assessment.service';
import { CategoryService } from 'src/app/Assess-Batch/Services/category.service';

@Component({
  selector: 'app-last-quality-audit-graph',
  templateUrl: './last-quality-audit-graph.component.html',
  styleUrls: ['./last-quality-audit-graph.component.css']
})

export class lastQualityAuditGraphRight implements OnInit
{
    barChartData: object[];
    labels;
    options;
    plugins;
    legend;
    chartType;

    private chart = 
    {
      'cursor':'default'
    }
  
    private chartPointer = 
    {
      'cursor':'pointer'
    }
  
    private chartDefault = 
    {
      'cursor':'default'
    }

    public barChartOptions: ChartOptions = {
        tooltips: {
          mode: 'label',
          // Note: setting mode to label displays all existing labels in a dataset at once. Without this,
          // individual data points will display their own label independently.
          itemSort: function(a, b) { return b.datasetIndex - a.datasetIndex; },
          callbacks: {
            
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

    ngOnInit(): void {
        
    }



}
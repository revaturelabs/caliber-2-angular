import { Component, OnInit, Input } from '@angular/core';
import { ReportOutput } from '../../Models/report-output';
import { Grade } from 'src/app/User/user/types/trainee';
import { ReportService } from '../../Services/report.service';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';

@Component({
  selector: 'app-tabular-trainee-average-list',
  templateUrl: './tabular-trainee-average-list.component.html',
  styleUrls: ['./tabular-trainee-average-list.component.css']
})
export class TabularTraineeAverageListComponent implements OnInit {
  gradesDataStore : Grade[] =null;
  assessmentsDataStore : Assessment[] = null;


  constructor(private reportService : ReportService) { }

  ngOnInit() {
  }

  updateDataPull(){
    console.log("I work!");
    this.gradesDataStore = this.reportService.getGradeDataStore();
    this.assessmentsDataStore = this.reportService.getAssessmentDataStore();
    console.log("Grades:");
    console.log(this.gradesDataStore);
    console.log("Assessments:");
    console.log(this.assessmentsDataStore);

  }

}

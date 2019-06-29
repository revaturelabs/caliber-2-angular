import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment-breakdown',
  templateUrl: './assessment-breakdown.component.html',
  styleUrls: ['./assessment-breakdown.component.css']
})
export class AssessmentBreakdownComponent implements OnInit {
  public tableCol1 = "Project";
  public tableCol2 = "Exam"
  public tableCol3 = "Verbal"
  public tableCol4 = "Other"
  public traineeProject = "91.00";
  public traineeExam = "84.89";
  public traineeOther = "73.00";
  public traineeVerbal = "91.43";
  public batchProject = "91.92";
  public batchExam = "81.81";
  public batchOther = "58.92";
  public batchVerbal = "89.45";


  constructor() { }

  ngOnInit() {
  }

  public onDownloadClick(e: any) : void {

  }
}

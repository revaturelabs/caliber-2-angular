import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Batch } from 'src/app/Batch/type/batch';
import { BatchService } from 'src/app/Batch/batch.service'
import { environment } from 'src/environments/environment';
import { MissingGrade } from '../../models/missingGrade';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service';

/**
 * sets headers for recieving JSON objects
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-missing-grades-list',
  templateUrl: './missing-grades-list.component.html',
  styleUrls: ['./missing-grades-list.component.css']
})

export class MissingGradesListComponent implements OnInit {

  postUrl : string = 'http://localhost:10000/assessment/all/grade/missingGrades';
  
  currBatches : Array<any>;
  missingGrades : Array<MissingGrade>;

  constructor(private http: HttpClient, private batchService : BatchService, private assessmentService : AssessBatchGradeService){ }

  ngOnInit() {
    
    this.batchService.getBatches().subscribe(data => {
      this.currBatches = data;
    }, error => console.log('Error:' + error), () => this.getMissingGradesFromActiveBatches());
  }

  getMissingGradesFromActiveBatches()  {
    this.assessmentService.addMissingGrade(this.currBatches).subscribe(MissingGrade => this.missingGrades = MissingGrade, error => console.log('Error:' + error), () => console.log(this.missingGrades[0].batchId));
  }
}

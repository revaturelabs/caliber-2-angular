import { Injectable, EventEmitter } from '@angular/core';
import { Batch } from '../../Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { traineeAssessment } from '../../User/user/types/trainee'


@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {

  url = 'http://localhost:9097';
  gradesAllURL = '/all/assessment/all';
  gradesByIdURL = '/all/assessment/batch/';
  allAssessments: traineeAssessment[] = [];
  assessments = new EventEmitter<traineeAssessment[]>();

  constructor(private http: HttpClient) { }

  getAssessmentsByBatchId(id: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.gradesByIdURL + id);
  }

  getAllGrades(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.gradesAllURL);
  }

  storeAssessments(entry: traineeAssessment[]) {
    this.allAssessments = entry;
    console.log(this.allAssessments);
  }

  returnAssessments(): traineeAssessment[] {
    return this.allAssessments;
  }


  
}
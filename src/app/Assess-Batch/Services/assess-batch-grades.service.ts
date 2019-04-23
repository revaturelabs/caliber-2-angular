import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { traineeAssessment, Grade } from '../../User/user/types/trainee'


@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {
  url = 'http://localhost:9090';
  gradesByIdURL = '/all/grade/batch/';
  gradeAll = '/all/grade/all';
  assessmentsByIdURL = '/all/assessment/batch/';

  allAssessments: traineeAssessment[] = [];
  allGrades: Grade[] = [];
  assessments = new EventEmitter<traineeAssessment[]>();
  grades = new EventEmitter<Grade[]>();


  constructor(private http: HttpClient) { }
  getAssessmentsByBatchId(id: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.assessmentsByIdURL + id);
  }
  getAssessmentsByBatchIdAndWeekNum(id: number, week: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.assessmentsByIdURL + id + '?week=' + week);
  }
  getGradesByBatchId(id: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesByIdURL + id);
  }
  storeAssessments(entry: traineeAssessment[]) {
    this.allAssessments = entry;
    console.log(this.allAssessments);
  }
  returnAssessments(): traineeAssessment[] {
    return this.allAssessments;
  }
  storeGrades(entry: Grade[]) {
    this.allGrades = entry;
    console.log(this.allGrades);
  }
  returnGrades(): Grade[] {
    return this.allGrades;
  }
  
}


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
  avgGrade = '/all/grade/average?assessment=';
  batchGrade = '/all/grade/average?batch=';
  batchAvgGrade = '&week='

  url2 = 'http://localhost:9090/all/grade/average?batch=';
 
  allAssessments: traineeAssessment[] = [];
  allGrades: Grade[] = [];
  assessments = new EventEmitter<traineeAssessment[]>();
  grades = new EventEmitter<Grade[]>();


  constructor(private http: HttpClient) { }

  getAvgGradeByAssessmentId(id: number): Observable<number> {
    return this.http.get<number>(this.url + this.avgGrade + id);
  }

  getBatchAvgGradeByBatchIdAndWeek(batchId: number, weekId: number): Observable<number> {
    return this.http.get<number>(this.url2 + batchId + '&week=' + weekId);
  }

  getAssessmentsByBatchId(id: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.assessmentsByIdURL + id);
  }
  getAssessmentsByBatchIdAndWeekNum(id: number, week: number): Observable<traineeAssessment[]> {
    return this.http.get<traineeAssessment[]>(this.url + this.assessmentsByIdURL + id + '?week=' + week);
  }
  getGradesByBatchId(id: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesByIdURL + id);
  }

  getGradesByBatchIdAndWeekNum(id: number, week: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesByIdURL + id + '?week=' + week);
  }

  storeAssessments(entry: traineeAssessment[]) {
    this.allAssessments = entry;
  }
  returnAssessments(): traineeAssessment[] {
    return this.allAssessments;
  }
  storeGrades(entry: Grade[]) {
    this.allGrades = entry;
  }
  returnGrades(): Grade[] {
    return this.allGrades;
  }

}

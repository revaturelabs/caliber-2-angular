import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { traineeAssessment, Grade, Category } from '../../User/user/types/trainee';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {
  url = 'http://localhost:9097';
  catUrl = '/all/category/';
  gradesByBatchIdURL = '/all/grade/batch/';
  gradesById = '/all/grade/';
  gradeAll = '/all/grade/all';
  assessmentsByIdURL = '/all/assessment/batch/';
  postUrl = '/all/grade/create';
  avgGrade = '/all/grade/average?assessment=';
  batchGrade = '/all/grade/average?batch=';
  batchAvgGrade = '&week='

  url2 = 'http://localhost:9097/all/grade/average?batch=';
 
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

  getCategoryByCategoryId(id: number):  Observable<Category> {
    return this.http.get<Category>(this.url + this.catUrl + id);
  }

  getGradeById(id: number): Observable<Grade> {
    return this.http.get<Grade>(this.url + this.gradesById + id);
  }

  getGradesByBatchId(id: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesByBatchIdURL + id);
  }

  getGradesByBatchIdAndWeekNum(id: number, week: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesByBatchIdURL + id + '?week=' + week);
  }

  updateGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(this.url + '/all/grade/update', grade, httpOptions);
  }

  postGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.url+this.postUrl, grade, httpOptions);
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

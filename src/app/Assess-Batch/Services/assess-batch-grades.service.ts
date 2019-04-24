import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { traineeAssessment, Grade, Category } from '../../User/user/types/trainee';

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {
  url = 'http://localhost:9090';
  catUrl = '/all/category/';
  gradesByBatchIdURL = '/all/grade/batch/';
  gradesById = '/all/grade/';
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

  storeAssessments(entry: traineeAssessment[]) {
    this.allAssessments = entry;
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

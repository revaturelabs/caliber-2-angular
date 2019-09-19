import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators'
import {Assessment} from "../../domain/model/assessment.dto";
import {Grade} from "../../domain/model/grade.dto";
import {Category} from "../../domain/model/category.dto";
import {MissingGrade} from "../../domain/dto/missing-grades.dto";

const httpOptions = {headers: new HttpHeaders ({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {
  url = environment.serverRootURL + '/assessment';
  catUrl = environment.serverRootURL + '/category/';
  gradesByBatchIdURL = '/all/grade/batch/';
  gradesById = '/all/grade/';
  gradeAll = '/all/grade/all';
  assessmentsByIdURL = '/all/assessment/batch/';
  postUrl = '/all/grade/create';
  avgGrade = '/all/grade/average?assessment=';
  batchGrade = '/all/grade/average?batch=';
  batchAvgGrade = '&week='
  missingGrades = '/all/grade/missingGrades';

  url2 = this.url + '/all/grade/average?batch=';

  allAssessments: Assessment[] = [];
  allGrades: Grade[] = [];
  assessments = new EventEmitter<Assessment[]>();
  grades = new EventEmitter<Grade[]>();

  constructor(private http: HttpClient) { }

  getAllGradesByAssessmentId(assessmentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.url}/all/grade/assessment/${assessmentId}`);
  }

  getAvgGradeByAssessmentId(id: number): Observable<number> {
    return this.http.get<number>(this.url + this.avgGrade + id);
  }

  getBatchAvgGradeByBatchIdAndWeek(batchId: number, weekId: number): Observable<number> {
    return this.http.get<number>(this.url2 + batchId + '&week=' + weekId);
  }

  getAssessmentsByBatchId(id: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.url + this.assessmentsByIdURL + id);
  }
  getAssessmentsByBatchIdAndWeekNum(id: number, week: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.url + this.assessmentsByIdURL + id + '?week=' + week);
  }

  getCategoryByCategoryId(id: number):  Observable<Category> {
    return this.http.get<Category>(this.catUrl + id);
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

  storeAssessments(entry: Assessment[]) {
    this.allAssessments = entry;
  }
  returnAssessments(): Assessment[] {
    return this.allAssessments;
  }
  storeGrades(entry: Grade[]) {
    this.allGrades = entry;
  }
  returnGrades(): Grade[] {
    return this.allGrades;
  }

  addMissingGrade(currBatches : Array<any>) : Observable<Array<MissingGrade>> {
    return this.http.post<Array<MissingGrade>>(this.url + this.missingGrades, currBatches).pipe(catchError(this.handleError));
  }

  public handleError(error : HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}

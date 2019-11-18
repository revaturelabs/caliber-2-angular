import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Assessment} from "../../domain/model/assessment.dto";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }
  url = environment.serverRootURL + '/assessment';
  createUrl = this.url + "/all/assessment/create";
  updateUrl = this.url + "/all/assessment/update";
  getUrl = this.url + "/all/assessment/";
  deleteUrl = this.url + "/all/assessment/delete/";
  batchUrl = this.getUrl + 'batch/';
  // batch/2050?week=2

  assessment: Assessment;
  currentAssessment = new EventEmitter<Assessment>();
  currentAssessmentId = new EventEmitter<number>();
  currentCategoryId = new EventEmitter<number>();
  assessmentId: number;
  categoryId: number;
  // private assessment: Assessment = {
  //   assessmentId : 100000000000000000,
  //   rawScore: 100,
  //   assessmentTitle: null,
  //   assessmentType: "Verbal",
  //   weekNumber: 7,
  //   batchId: 2100,
  //   assessmentCategory: 2

  // }

  /**
   *
   * @param assessment
   */
  createCategories(assessment: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(this.url, assessment);
  }
  /**
   *
   * @param assessment
   *
   */

  createAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(this.createUrl, assessment);
  }
  deleteAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.request<Assessment>('delete', this.deleteUrl + assessment.assessmentId, { body: assessment });
  }
  updateAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(this.updateUrl, assessment);
  }
  getAssessment(assessmentId: number): Observable<Assessment> {
    return this.http.get<Assessment>(this.getUrl + assessmentId, httpOptions);
  }
  getAssessmentByBatch(batchId: number, week: number): Observable<Assessment[]> {
    if(week > 0 && batchId > 0){
      return this.http.get<Assessment[]>(this.batchUrl + batchId + "?week=" + week, httpOptions);
    }
  }


  getCurrentAssessment(entry: Assessment) {
    this.assessment = entry;
  }
  getCurrentAssessmentId(entry: number) {
    this.assessmentId = entry
  }
  getCurrentCategoryId(entry: number) {
    this.categoryId = entry;
  }

}

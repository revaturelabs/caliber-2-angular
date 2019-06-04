import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Assessment } from '../Models/Assesment';
import { environment } from 'src/environments/environment';



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
    console.log("our delete url is :" + this.deleteUrl + assessment.assessmentId);
    return this.http.request<Assessment>('delete', this.deleteUrl + assessment.assessmentId, { body: assessment });
  }
  updateAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(this.updateUrl, assessment);
  }
  getAssessment(assessmentId: number): Observable<Assessment> {
    return this.http.get<Assessment>(this.getUrl + assessmentId);
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

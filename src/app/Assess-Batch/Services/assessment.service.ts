import { Injectable } from '@angular/core';
import { Observable } from'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Assessment } from '../Models/Assesment';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:9097/all/assessment/create";

  private assessment: Assessment = {
    assessmentId : 100000000000000000,
    rawScore: 100,
    assessmentTitle: null,
    assessmentType: "Verbal",
    weekNumber: 7,
    batchId: 2100,
    assessmentCategory: 2

  }

/**
 * 
 * @param assessment 
 */
  createCategories(assessment: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(this.url, assessment);
  }
}

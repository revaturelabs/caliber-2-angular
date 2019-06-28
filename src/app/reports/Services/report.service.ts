import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Batch } from 'src/app/Batch/type/batch';
import { traineeAssessment, Grade } from 'src/app/Batch/type/trainee';
import { Assessment } from 'src/app/Assess-Batch/Models/Assesment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // url = environment.serverRootURL;
  url = 'http://localhost:10000';
  batchesYearURL = '/vp/batch/';
  batchAllURL = 'batchAllURL';
  yearsURL = '/qa/batch/valid-years';
  gradesAllURL = '/assessment/all/grade/all';
  assessmentsAllURL : string = '/assessment/all/assessment/all';
  selectedYear: number;
  constructor(private http: HttpClient) { }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  getBatchesByYear(year : number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url +'/batch' + this.batchesYearURL + year, httpOptions);
  }

  getAllAssessments():Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.url + this.assessmentsAllURL, httpOptions)
  }

  getAllGrades():Observable<Grade[]> {
    return this.http.get<Grade[]>(this.url + this.gradesAllURL, httpOptions)
  }
}

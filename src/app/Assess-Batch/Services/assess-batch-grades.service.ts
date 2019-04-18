import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessBatchGradeService {

  url = 'http://localhost:9097';
  gradesAllURL = '/all/assessment/all';
  gradesByIdURL = '/all/assessment/batch/';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;

  constructor(private http: HttpClient) { }

  getGradesById(id: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.gradesByIdURL + id);
  }

  getAllAssessments(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.gradesAllURL);
  }

  
}
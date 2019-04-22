import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessBatchService {

  url = 'http://localhost:9095';
  Url2= 'http://localhost:9085/all/trainee/update';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;
  yearParam = '/vp/batch/all?year=';
  quarterParam = '&quarter='

  constructor(private http: HttpClient) { }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  postComment (trainee): Observable<object> {
    return this.http.put<object>(this.Url2, trainee)
  }
  getBatchesByQuarter(year: number, quarter: string): Observable<Batch[]> {
    console.log("getBatchesByQuarter--->" + this.http.get<Batch[]>(this.url + this.yearParam + year + this.quarterParam + quarter));
    return this.http.get<Batch[]>(this.url + this.yearParam + year + this.quarterParam + quarter);
  }
  
}

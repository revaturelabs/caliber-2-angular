import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessBatchService {

  url = 'http://localhost:9095';
  Url2= 'http://localhost:9085/all/trainee/update';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  updateWeekURL = '/all/batch/update';
  yearParam = '/vp/batch/all?year=';
  quarterParam = '&quarter='
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getBatchesByQuarter(year: number, quarter: string): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.yearParam + year + this.quarterParam + quarter);
  }
  
  getAllYears(): Observable<number[]> {
    console.log("getAllYears---->" + this.http.get<number[]>(this.url + this.yearsURL ));
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  //HTTPRequest for adding a week -- using a PUT request
  addWeek(updateBatch: Batch) {
    console.log("add week")
    console.log(updateBatch);
    this.http.put(this.url + this.updateWeekURL, updateBatch, this.httpOptions).subscribe((ourBatch) => {
      console.log(ourBatch);
    });
  }

  postComment (trainee): Observable<object> { 
    return this.http.put<object>(this.Url2, trainee );
  }
}

import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessBatchService {

  url = 'http://localhost:9095';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  updateWeekURL = '/all/batch/update';
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

  getAllYears(): Observable<number[]> {
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

  
}
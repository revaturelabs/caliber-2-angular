import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessBatchService {

  url = 'http://localhost:9095';
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

  getBahesByYear(year: number): Observable<Batch[]> {
    console.log("getBatchesByYear--->" + this.http.get<Batch[]>(this.url + this.batchesYearURL + year ));
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getBatchesByQuarter(year: number, quarter: string): Observable<Batch[]> {
    console.log("getBatchesByQuarter--->" + this.http.get<Batch[]>(this.url + this.yearParam + year + this.quarterParam + quarter));
    return this.http.get<Batch[]>(this.url + this.yearParam + year + this.quarterParam + quarter);
  }
  


  
  getAllYears(): Observable<number[]> {
    console.log("getAllYears---->" + this.http.get<number[]>(this.url + this.yearsURL ));
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  //HTTPRequest for adding a week -- using a PUT request
  addWeek(updateBatch: Batch) {
    this.http.post(this.url + this.updateWeekURL, updateBatch);
  }

  
}

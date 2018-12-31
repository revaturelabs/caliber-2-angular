import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  url = 'http://localhost:9095';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;

  constructor(private http: HttpClient) { }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  
}

import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
// http://localhost:9095/ environment.serverRootURL
  url = environment.serverRootURL;
  batchAllURL = '/batch/vp/batch/all';
  batchesYearURL = '/batch/vp/batch/';
  yearsURL = '/batch/all/batch/valid_years';
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

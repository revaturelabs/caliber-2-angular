import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from './type/batch';
import { BLocation } from './type/location';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BatchService {


  url = 'http://localhost:9095';

  constructor(private http: HttpClient) { }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/vp/batch/all', { headers: new HttpHeaders({'Content-Type': 'application/json'}), });
  }

  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(this.url + 'all/batch/' + batch.batchId);
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/vp/batch/' + year);
  }

  postBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.url + '/all/batch/create', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + '/all/batch/update', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  deleteBatch(batchId: number): Observable<Batch> {
    return this.http.delete<any>(this.url + '/all/batch/delete/' + batchId);
  }

  getAllSkillTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/types/skill/all');
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + '/valid_years');
  }

  getAllLocations(): Observable<BLocation[]> {
    return this.http.get<BLocation[]>('http://localhost:8040/all/location/all');
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from './type/batch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BatchService {


  url = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/batch', { headers: new HttpHeaders({'Content-Type': 'application/json'}), });
  }

  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(this.url + '/batch/id' + batch.batchId);
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/batch/year/' + year);
  }

  postBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.url + '/batch', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + '/batch/', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  deleteBatch(batch: Batch): Observable<Batch> {
    return this.http.delete<Batch>(this.url + '/batch/' + batch.batchId);
  }

  getAllSkillTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.url + '/types/skill/all');
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + '/batch/valid_years');
  }
}

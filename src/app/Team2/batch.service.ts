import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from './type/batch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BatchService {


  url = '';

  test = 'boyaka';
  constructor(private http: HttpClient) { }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/batch/');
  }

  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(this.url + '/batch/' + batch.batchId);
  }

  postBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.url + '/batch/', batch, {headers: new HttpHeaders({'Content-Type': 'application/json/'})});
  }

  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + '/batch/', batch, {headers: new HttpHeaders({'Content-Type': 'application/json/'})});
  }

  deleteBatch(batch: Batch): Observable<Batch> {
    return this.http.delete<Batch>(this.url + '/batch/' + batch.batchId);
  }
}

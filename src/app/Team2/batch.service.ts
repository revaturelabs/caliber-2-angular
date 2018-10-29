import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from './type/batch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { text } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})

export class BatchService {


  url = 'http://dev-caliber.revature.tech';

  test = 'boyaka';
  constructor(private http: HttpClient) { }

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + '/vp/batch/all/current', { headers: new HttpHeaders({'Content-Type': 'application/json'}) });
  }

  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(this.url + '/batch/' + batch.batchId);
  }

  postBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.url + '/all/batch/create', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + '/batch/', batch, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  deleteBatch(batch: Batch): Observable<Batch> {
    return this.http.delete<Batch>(this.url + '/batch/' + batch.batchId);
  }
}

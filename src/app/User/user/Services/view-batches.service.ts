import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ViewBatchesService {

  /**
   * @ignore
   */
  constructor(private http: HttpClient) { }

  url = 'http://localhost:9085/vp/batch/all/';
  getBatches(): Observable<Array<Trainee>> {
    return this.http.get<Trainee[]>(this.url, httpOptions);
  }
}

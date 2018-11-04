import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainee } from '../types/trainee';
import { catchError, map, tap } from 'rxjs/operators';
import { userInfo } from 'os';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TraineesService {

  trainees: Observable<Trainee[]>;
  url = 'http://localhost:9085/all/trainee?batch=';
  updateUrl = 'http://localhost:9085/all/trainee/update';
  createUrl = 'http://localhost:9085/all/trainee/create';
  deleteUrl = 'http://localhost:9085/all/trainee/delete/';

  constructor(protected http: HttpClient) { }

  getTrainees(batchId: Number):  Observable<Trainee[]> {
    this.trainees =  this.http.get<Trainee[]>(this.url + batchId, httpOptions).
      pipe(
        catchError(data => {
          this.trainees = this.http.get<Trainee[]>(this.url + batchId, httpOptions);
          return this.trainees;
        })
      );
    return this.trainees;
  }
  updateTrainee(t: Trainee): Observable<Trainee> {
    console.log(t);
    return this.http.put<Trainee>(this.updateUrl, t, httpOptions);
  }
  createTrainee(t: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(this.createUrl, t, httpOptions);
  }
  deleteTrainee(id: Number): Observable<void> {
    return this.http.delete<void>(this.deleteUrl + id);
  }
}

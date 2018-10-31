import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainee } from '../types/trainee';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ViewAllTraineesService {

  trainees: Observable<Trainee[]>;

  url = 'http://localhost:9085/all/trainee?batch=2200';
  // url = 'https://dev-caliber.revature.tech/vp/batch/all/';

  constructor(private http: HttpClient) { }

  getTrainees(batchId: Number):  Observable<Trainee[]> {
    this.trainees =  this.http.get<Trainee[]>(this.url, httpOptions).
      pipe(
        catchError(data => {
          this.trainees = this.http.get<Trainee[]>(this.url, httpOptions);
          return this.trainees;
        })
      );
    return this.trainees;
  }
}

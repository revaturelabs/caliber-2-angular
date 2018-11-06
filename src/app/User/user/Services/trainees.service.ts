import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainee } from '../types/trainee';
import { catchError, map, tap } from 'rxjs/operators';
import { userInfo } from 'os';
import { ErrorService } from 'src/app/error-handling/services/error.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const getUrl = 'http://localhost:9085/all/trainee?batch=';
const updateUrl = 'http://localhost:9085/all/trainee/update';
const createUrl = 'http://localhost:9085/all/trainee/create';
const deleteUrl = 'http://localhost:9085/all/trainee/delete/';

@Injectable({
  providedIn: 'root'
})
export class TraineesService {

  /**
   *
   * @param http Object which will allow us to send REST requests to our endpoints
   */
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  /**
   * Sends a get request to retrieve all of the trainees having to do with a specific batch id
   * @param batchId The id representing the batch to get all of the trainees from
   */
  getTrainees(batchId: Number):  Observable<Trainee[]> {
    let trainees: Observable<Trainee[]>;
    trainees =  this.http.get<Trainee[]>(getUrl + batchId, httpOptions).
      pipe(
        catchError((issue, data) => {
          if (issue instanceof HttpErrorResponse) {
            const err = issue as HttpErrorResponse;
            this.errorService.setError('TraineesService',
            `Issue finding trainees. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
          }
          return data;
        })
      );
    return trainees;
  }
  updateTrainee(t: Trainee): Observable<Trainee> {
    console.log(t);
    return this.http.put<Trainee>(updateUrl, t, httpOptions).
      pipe(
        catchError((issue, data) => {
          if (issue instanceof HttpErrorResponse) {
            const err = issue as HttpErrorResponse;
            this.errorService.setError('TraineesService',
            `Issue updating trainee ${t.name}. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
          }
          return data;
        })
      );
  }
  createTrainee(t: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(createUrl, t, httpOptions).
      pipe(
        catchError((issue, data) => {
          if (issue instanceof HttpErrorResponse) {
            const err = issue as HttpErrorResponse;
            this.errorService.setError('TraineesService',
            `Issue creating trainee ${t.name}. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
          }
          return data;
        })
      );
  }
  deleteTrainee(id: Number): Observable<void> {
    return this.http.delete<void>(deleteUrl + id).
      pipe(
        catchError((issue, data) => {
          if (issue instanceof HttpErrorResponse) {
            const err = issue as HttpErrorResponse;
            this.errorService.setError('TraineesService',
            `Issue deleting trainee. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
          }
          return data;
        })
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainee } from '../types/trainee';
import { catchError, map, tap } from 'rxjs/operators';
import { userInfo } from 'os';

/**
 * sets the Http headers
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class TraineesService {

  getUrl = 'http://localhost:9085/all/trainee?batch=';
  updateUrl = 'http://localhost:9085/all/trainee/update';
  createUrl = 'http://localhost:9085/all/trainee/create';
  deleteUrl = 'http://localhost:9085/all/trainee/delete/';

  /**
   *
   * @param http Object which will allow us to send REST requests to our endpoints
   */
  constructor(private http: HttpClient) { }

  /**
   * Sends a get request to retrieve all of the trainees having to do with a specific batch id
   * @param batchId The id representing the batch to get all of the trainees from
   */
  getTrainees(batchId: Number):  Observable<Trainee[]> {
    let trainees: Observable<Trainee[]>;
    trainees =  this.http.get<Trainee[]>(this.getUrl + batchId, httpOptions).
      pipe(
        catchError(data => {
          trainees = this.http.get<Trainee[]>(this.getUrl + batchId, httpOptions);
          return trainees;
        })
      );
    return trainees;
  }
  /**
   * uses an http put method to update trainee
   * @param t the trainee that is being used to update
   */
  updateTrainee(t: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(this.updateUrl, t, httpOptions);
  }

  /**
   * uses an http post method to create trainee
   * @param t the trainee that is being used to create
   */
  createTrainee(t: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(this.createUrl, t, httpOptions);
  }
  
  /**
   * uses an http delete method to delete trainee
   * @param t the trainee that is being used to delete
   */
  deleteTrainee(id: Number): Observable<void> {
    return this.http.delete<void>(this.deleteUrl + id);
  }
}

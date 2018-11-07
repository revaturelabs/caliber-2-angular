import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';
import { ErrorService } from 'src/app/error-handling/services/error.service';

/**
 * sets the Http headers
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * The url for getting all trainees by the batch id from the user service
 */
const getUrl = 'http://localhost:9085/all/trainee?batch=';

/**
 * The url to update a trainee in the user service
 */
const updateUrl = 'http://localhost:9085/all/trainee/update';

/**
 * The url to create a trainee in the user service
 */
const createUrl = 'http://localhost:9085/all/trainee/create';

/**
 * The url to delete a trainee by their id in the user service
 */
const deleteUrl = 'http://localhost:9085/all/trainee/delete/';

/**
 * @ignore
 */
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
    return this.http.get<Trainee[]>(getUrl + batchId, httpOptions);
  }
  /**
   * uses an http put method to update trainee
   * @param t the trainee that is being used to update
   */
  updateTrainee(t: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(updateUrl, t, httpOptions);
  }

  /**
   * uses an http post method to create trainee
   * @param t the trainee that is being used to create
   */
  createTrainee(t: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(createUrl, t, httpOptions);
  }

  /**
   * uses an http delete method to delete trainee
   * @param t the trainee that is being used to delete
   */
  deleteTrainee(id: Number): Observable<void> {
    return this.http.delete<void>(deleteUrl + id);
  }
}

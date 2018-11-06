import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';
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
    return this.http.get<Trainee[]>(getUrl + batchId, httpOptions);
  }

  updateTrainee(t: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(updateUrl, t, httpOptions);
  }

  createTrainee(t: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(createUrl, t, httpOptions);
  }

  deleteTrainee(id: Number): Observable<void> {
    return this.http.delete<void>(deleteUrl + id);
  }
}

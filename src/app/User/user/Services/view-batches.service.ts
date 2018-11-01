import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';
import { HttpHeaders, HttpClient } from '@angular/common/http';

/**
 * sets headers for recieving JSON objects
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
/**
 * handles getting current batches
 */
export class ViewBatchesService {

  /**
   * @param http injects an Http Client into the service
   * constructor for the service
   */
  constructor(private http: HttpClient) { }

  /**
   * @ignore
   */
  url = 'http://localhost:9085/vp/batch/all/';
  /**
   * gets batches from the batch controller usng a rest call
   */
  getBatches(): Observable<Array<Trainee>> {
    /**
     * returns the list of batches
     */
    return this.http.get<Trainee[]>(this.url, httpOptions);
  }
}

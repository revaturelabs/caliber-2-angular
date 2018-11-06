import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { Batch } from 'src/app/Batch/type/batch';

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
  constructor(private http: HttpClient, private errorService: ErrorService) { }

  /**
   * @ignore
   */
  url = 'http://localhost:9095/vp/batch/all/';
  /**
   * gets batches from the batch controller usng a rest call
   */
  getBatches(): Observable<Array<Batch>> {
    /**
     * returns the list of batches
     */
    return this.http.get<Batch[]>(this.url, httpOptions);
  }
}

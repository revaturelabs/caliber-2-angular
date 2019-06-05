import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Batch } from './type/batch';
import { BLocation } from './type/location';
import { Trainer } from './type/trainer';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/**
 * sets headers for recieving JSON objects
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



/**
* The url for getting current batches from the batch microservice
*/
const currentBatchUrl = environment.serverRootURL + '/batch/vp/batch/all/current';


/**

The batch service handles all of the http client methods used to send and recieve data from the back-end.
 @author Anthony Jin, Juan Trejo, Will Bennet

 */
@Injectable({
  providedIn: 'root'
})

export class BatchService {


  url = environment.serverRootURL + '/batch';
  batchAllURL = '/vp/batch/all';
  allBatchURL = '/all/batch/';
  batchesYearURL = '/vp/batch/';
  batchCreateURL = '/all/batch/create';
  batchUpdateURL = '/all/batch/update';
  batchDeleteURL = '/all/batch/delete/';
  skillTypesAllURL = environment.serverRootURL + '/skill/types/skill/all';
  locationsAllURL = environment.serverRootURL + '/location/all/location/all';
  trainersAllURL = environment.serverRootURL + '/user/all/trainer/all';
  batchAllYearsURL = '/all/batch/valid_years';
  traineeCountURL = environment.serverRootURL + '/user/all/trainee/count/';

  constructor(private http: HttpClient) { }

  /**
   * get all the batches from batch service */
  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchAllURL, httpOptions);
  }


  /**
   * get specific batch from batch service
   * @param batch specific batch to be obtained from backend
   */
  getBatch(batch: Batch): Observable<Batch> {
    return this.http.get<Batch>(this.url + this.allBatchURL + batch.batchId);
  }

  /**
   *  get all batches by specified year from batch service
   * @param year year that all batches should be retrieved from
   *
   */
  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }


  /**
   * creates new batch in batch service
   * @param batch batch to be created
   */
  postBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(this.url + this.batchCreateURL, batch, httpOptions);
  }

  /**
   * updates specified batch in batch service
   * @param batch batch to be updated
   */
  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + this.batchUpdateURL, batch, httpOptions);
  }


  /**
   * deletes specified batch from batch service
   * @param batchId batchid of batch to be deleted
   */
  deleteBatch(batchId: number): Observable<Batch> {
    return this.http.delete<any>(this.url + this.batchDeleteURL + batchId);
  }


  /**
   * gets all the skill types from skill type service
   */
  getAllSkillTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.skillTypesAllURL);
  }


  /**
   * get all starting years from batch service
   */
  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.batchAllYearsURL);
  }

  /**
   * get all locations from location service
   */
  getAllLocations(): Observable<BLocation[]> {
    return this.http.get<BLocation[]>(this.locationsAllURL);
  }

  /**
   * get all trainers from user service
   */
  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.trainersAllURL);
  }

  /**
   * get all trainee counts for batches in a year
   * @param batches list of batch ids which need trainee counts returned
   */
  getTraineeCount(batches: number[]): Observable<number[][]> {
    return this.http.post<number[][]>(this.traineeCountURL, batches);
  }

  /**
   * gets all the current batches from the batch microservice
   */
  getBatches(): Observable<Array<Batch>> {
    return this.http.get<Batch[]>(currentBatchUrl, httpOptions);
  }

}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trainer } from '../types/trainer';
import { Observable } from 'rxjs';

/**
 * sets the Http headers
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * The root user service url
 */
const userUrl = environment.serverRootURL + '/user';

/**
 * The url for getting all trainers
 */
const getAllUrl = userUrl + '/trainers';

/**
 * The url to disable a trainer in the user service
 */
const disableUrl =  userUrl + '/trainers/:';

/**
 * The url to add a trainer to the user service
 */
const addURL = userUrl + '/trainers';

/**
 * The url to update a trainer in the user service
 */
const editURL = userUrl + '/trainers/:';



@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private roles: String[] = ['ROLE_VP',
                     'ROLE_PANEL',
                    'ROLE_QC',
                    'ROLE_TRAINER',
                    'ROLE_STAGING',
                    'ROLE_INACTIVE'];

  constructor(private http: HttpClient) { }

   /**
   * Sends a get request to retrieve all of the trainers
   */
  getAllTrainers(): Observable<Trainer[]> {
    console.log(getAllUrl);
    return this.http.get<Trainer[]>(getAllUrl);
  }

  /**
   * Sends a put request to set a trainer's state to inactive
   */
  disableTrainer(t: Trainer): Observable<Trainer> {
    const URL = disableUrl + t.trainerId;
    return this.http.put<Trainer>(URL, t, httpOptions);
  }

  /**
   * Sends a post request to add a trainer to the database
   */
  addTrainer(tr: Trainer): Observable<Trainer> {
    // We are returning an Observable
    // Use generics to specify the return type of the post method.
    return this.http.post<Trainer>(addURL, tr, httpOptions);
  }

  /**
   * Sends a put request to update a trainer
   */
  editTrainer(tr: Trainer): Observable<Trainer> {
    const URL = editURL + tr.trainerId;
    return this.http.put<Trainer>(URL, tr, httpOptions);
  }

}

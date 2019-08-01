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
const userUrl = environment.serverRootURL + '/user/';

// The url for getting all trainers
const getAllUrl = userUrl + '/all/trainer/all';

/**
 * The url to update a trainee in the user service
 */
const disableUrl =  userUrl + '/all/trainer/disable';

@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  constructor(private http: HttpClient) { }

   /**
   * Sends a get request to retrieve all of the trainers
   */
  getAllTrainers(): Observable<Trainer[]> {
    console.log(getAllUrl);
    return this.http.get<Trainer[]>(getAllUrl);
  }

  disableTrainer(t: Trainer): Observable<Trainer> {
    console.log(disableUrl);
    console.log(t);
    return this.http.put<Trainer>(disableUrl, t, httpOptions);
  }
}

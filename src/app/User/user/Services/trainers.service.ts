import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trainer } from '../types/trainer';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

/**
 * The root user service url
 */
const userUrl = environment.serverRootURL + '/user';

//The url for getting all trainers
const getAllUrl = userUrl + '/trainers';


// /**
//  * The url for getting all trainees by the batch id from the user service
//  */
// const getUrl = userUrl + '/all/trainee?batch=';

@Injectable({
  providedIn: 'root'
})

export class TrainersService {

  constructor(private http:HttpClient) { }

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(getAllUrl);
  }

  addTrainer(trainer:Trainer)
  {
    return this.http.post(getAllUrl, trainer, httpOptions);
  }

}

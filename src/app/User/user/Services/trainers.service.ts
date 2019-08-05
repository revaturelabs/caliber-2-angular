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

//The url for disable trainer
const disableUrl = userUrl + '/trainers/';

//The url for edit trainer
const editUrl = userUrl + '/trainers/';

//The url for add trainer
const addUrl = userUrl + '/trainers/';

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
   * Sends a patch request to set a trainer's state to inactive
   */
  disableTrainer(trainer: Trainer): Observable<Trainer> {
    const URL = disableUrl + trainer.trainerId;
    return this.http.patch<Trainer>(URL, trainer, httpOptions);
  }

  /**
   * Sends a post request to add a trainer to the database
   */
  addTrainer(trainer: Trainer): Observable<Trainer> {
    // We are returning an Observable
    // Use generics to specify the return type of the post method.
    return this.http.post<Trainer>(addUrl, trainer, httpOptions);
  }

  /**
   * Sends a put request to update a trainer
   */
  editTrainer(trainer: Trainer): Observable<Trainer> {
    const URL = editUrl + trainer.trainerId;
    return this.http.put<Trainer>(URL, trainer, httpOptions);
  }

}

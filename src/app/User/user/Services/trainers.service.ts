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

//The url for getting all trainers
const getAllUrl = userUrl + '/all/trainer/all';

const addURL = userUrl + '/all/trainer/add';

const editURL = userUrl + '/all/trainer/edit';



@Injectable({
  providedIn: 'root'
})
export class TrainersService {

  private roles:String[] = ["ROLE_VP",
                     "ROLE_PANEL",
                    "ROLE_QC",
                    "ROLE_TRAINER",
                    "ROLE_STAGING",
                    "ROLE_INACTIVE"];

  constructor(private http:HttpClient) { }

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(getAllUrl);
  }

  addTrainer(tr: Trainer): Observable<Trainer> {
    //We are returning an Observable
    //Use generics to specify the return type of the post method.
    return this.http.post<Trainer>(addURL, tr, httpOptions);
  }
  editTrainer(tr: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(editURL, tr, httpOptions);
  }

}

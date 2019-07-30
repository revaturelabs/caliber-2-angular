import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Trainer } from '../types/trainer';
import { Observable } from 'rxjs';
/**
 * The root user service url
 */
const userUrl = environment.serverRootURL + '/user';

//The url for getting all trainers
const getAllUrl = userUrl + '/all/trainer/all';

const addURL = userUrl + 'all/trainer/add';

const editURL = userUrl + 'all/trainer/edit';



// /**
//  * The url for getting all trainees by the batch id from the user service
//  */
// const getUrl = userUrl + '/all/trainee?batch=';

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

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TraineeForm } from './user/TraineeForm';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:9085/all/trainee/create';

  constructor(private http: HttpClient) { }

  postForm(traineeForm: TraineeForm): Observable<TraineeForm> {
    return this.http.post<TraineeForm>(this.url, traineeForm, httpOptions);
  }
}

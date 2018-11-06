import { Injectable } from '@angular/core';
import { TraineesService } from '../Services/trainees.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Trainee } from '../types/trainee';

@Injectable({
  providedIn: 'root'
})
export class MockTraineeService  {

  traineeObservable = new Subject<Trainee>();
  trainee: Trainee;

  constructor(http: HttpClient) {
    // super(http);
  }

  postForm(t: Trainee): Observable<Trainee> {
    this.trainee = t;
    return this.traineeObservable.asObservable();
  }

  // simulates the server responding
  pushObservable() {
    this.traineeObservable.next(this.trainee);
  }
}

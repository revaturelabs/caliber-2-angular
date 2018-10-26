import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Trainee } from '../types/trainee';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ViewAllTraineesService {

  url = 'http://dev-caliber.revature.tech/all/trainee?batch=2200';

  constructor(private http: HttpClient) { }

  getTrainees(batchId: Number):  Observable<Trainee[]> {
    return this.http.get<Trainee[]>(this.url, httpOptions);
  }
}

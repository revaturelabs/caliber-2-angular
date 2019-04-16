import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trainee } from 'src/app/Batch/type/trainee';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:9090';
 traineeBatchIdURL = '/all/trainee?batch=';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years';
  ourTrainees: Trainee[] = [];

  getTraineesByBatchId(id: number): Observable<Trainee[]> {
     return this.http.get<Trainee[]>(this.url + this.traineeBatchIdURL + id);
  }

  storeTrainees(entry: Trainee[]) {
    console.log("did we store anything");
    this.ourTrainees = entry;
    console.log(this.ourTrainees);
  }

  returnTrainees(): Trainee[] {
    return this.ourTrainees;
  }



}

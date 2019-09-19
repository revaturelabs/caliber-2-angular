import { Injectable, EventEmitter } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {Trainee} from "../../domain/model/trainee.dto";

@Injectable({
  providedIn: "root"
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  url = environment.serverRootURL + "/user";
  traineeBatchIdURL = "/all/trainee?batch=";
  batchesYearURL = "/vp/batch/";
  yearsURL = "/all/batch/valid_years";
  ourTrainees: Trainee[] = [];
  trainees = new EventEmitter<Trainee[]>();

  getTraineesByBatchId(id: number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(this.url + this.traineeBatchIdURL + id);
  }

  storeTrainees(entry: Trainee[]) {
    this.ourTrainees = entry;
  }

  returnTrainees(): Trainee[] {
    return this.ourTrainees;
  }
}

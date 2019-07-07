import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch';

@Injectable({
  providedIn: 'root'
})
export class LastQualityAuditService {
  url = environment.serverRootURL;

  batchesAllURL = '/batch/vp/batch/all';
  batchesCurrentURL = '/batch/vp/batch/all/current';
  yearsURL = '/qa/batch/valid-years';
  gradesAllURL = '/assessment/all/grade/batch/';
  gradesTotalAverageURL = '/assessment/all/grade/all';
  gradesByTraineeURL = '/assessment/all/grade/trainee/';
  qaNotesAllURL = '/qa/audit/notes/all/';
  qaNotesURL = '/qa/audit/notes/';
  categoryAllURL = '/category/all/active';
  assessmentsAllURL = '/assessment/all/assessment/batch/';
  locationsAllURL = '/location/all/location/all';

  locations: Location[];

  constructor(private http: HttpClient) { }

  // This method gets all batches
  // getBatches() {
  //   return this.http.get<Batch[]>(this.url + this.batchesAllURL);
  // }

  // This method is for getting all current batches.
  getBatches() {
    return this.http.get<Batch[]>(this.url + this.batchesCurrentURL)
  }

  getStateLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url + this.locationsAllURL);
  }
}

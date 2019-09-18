import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Batch} from "../Batch/type/batch";
import {Assessment} from "../Assess-Batch/Models/Assesment";
import {Trainee} from "../Batch/type/trainee";

@Injectable()
export class AssessBatchService {

  constructor(
    private http: HttpClient
  ) { }

  getValidYears(): Observable<number[]> {
    return this.http.get<number[]>(environment.api.validYears);
  }

  getAllBatchesByYearAndQuarter(year: number, quarter: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.allByYearAndQuarter(year, quarter));
  }

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(environment.api.user.trainees.inBatch(batchId));
  }

  createAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.post<Assessment>(environment.api.assessments.create, assessment);
  }

  updateAssessment(assessment: Assessment): Observable<Assessment> {
    return this.http.put<Assessment>(environment.api.assessments.update, assessment);
  }

  deleteAssessment(assessment: Assessment): Observable<Assessment> {
    // HttpClient does not expose a body argument via delete
    return this.http.request<Assessment>('delete', environment.api.assessments.delete(assessment.assessmentId), {body: assessment});
  }
}

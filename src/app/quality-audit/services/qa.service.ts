import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../Assess-Batch/Models/Category";
import {environment} from "../../../environments/environment";
import {QcNote} from "../../Audit/types/note";
import {Trainee} from "../../Batch/type/trainee";

@Injectable({
  providedIn: 'root'
})
export class QaService {

  constructor(
    private http: HttpClient
  ) { }

  getQcTraineeNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.http.get<QcNote[]>(environment.api.qa.qcTraineeNotesByBatchAndWeek(batchId, week));
  }

  getQcBatchNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote> {
    return this.http.get<QcNote>(environment.api.qa.qcBatchNotesByBatchAndWeek(batchId, week));
  }

  getCategoriesByBatchAndWeek(batchId: number, week: number): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.byBatchAndWeek(batchId, week));
  }

  getTraineesByBatch(batchId: number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(environment.api.user.trainees.inBatch(batchId));
  }

  upsertQcTraineeNote(qcNote: QcNote): Observable<QcNote> {
    return this.http.post<QcNote>(environment.api.qa.traineeNotes, qcNote);
  }

  upsertQcBatchNote(qcNote: QcNote): Observable<QcNote> {
    return this.http.post<QcNote>(environment.api.qa.batchNotes, qcNote);
  }

}

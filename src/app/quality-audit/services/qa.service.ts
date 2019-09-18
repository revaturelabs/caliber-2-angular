import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../Assess-Batch/Models/Category";
import {environment} from "../../../environments/environment";
import {QcNote} from "../../Audit/types/note";
import {Trainee} from "../../Batch/type/trainee";
import {Tag} from "../../Audit/types/Tag";

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

  getCategoriesByBatchAndWeek(batchId: number, week: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.api.category.byBatchAndWeek(batchId, week));
  }

  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.category.active);
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

  saveWeeklyQcCategory(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(environment.api.qa.createCategory, tag);
  }

  removeWeeklyQcCategory(tag: Tag): Observable<void> {
    return this.http.delete<void>(environment.api.qa.deleteCategory(tag.id));
  }

}

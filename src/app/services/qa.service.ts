import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {QcNote} from "../domain/model/qc-note.dto";
import {QcCategory} from "../domain/model/qc-category.dto";
import {Category} from "../domain/model/category.dto";
import {Trainee} from "../domain/model/trainee.dto";
import {Note} from "../domain/model/assessment-note.dto";


@Injectable()
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

  getCategoriesByBatchAndWeek(batchId: number, week: number): Observable<QcCategory[]> {
    return this.http.get<QcCategory[]>(environment.api.categories.byBatchAndWeek(batchId, week));
  }

  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.active);
  }

  saveWeeklyQcCategory(tag: QcCategory): Observable<QcCategory> {
    return this.http.post<QcCategory>(environment.api.qa.createCategory, tag);
  }

  removeWeeklyQcCategory(tag: QcCategory): Observable<void> {
    return this.http.delete<void>(environment.api.qa.deleteCategory(tag.id));
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

  upsertNote(note: Note): Observable<Note> {
    return this.http.put<Note>(environment.api.assessments.upsert, note);
  }

}

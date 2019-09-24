import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {QcNote} from "../domain/model/qc-note.dto";
import {QcCategory} from "../domain/model/qc-category.dto";
import {Category} from "../domain/model/category.dto";
import {Trainee} from "../domain/model/trainee.dto";
import {Note} from "../domain/model/assessment-note.dto";
import {CategoryService} from "./subvertical/category/category.service";
import {QaCategoryService} from "./subvertical/quality-audit/qa-category.service";
import {AssessmentNotesService} from "./subvertical/assessment/assessment-notes.service";
import {QaNotesService} from "./subvertical/quality-audit/qa-notes.service";
import {TraineeService} from "./subvertical/user/trainee.service";


@Injectable()
export class QaService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private qcCategoryService: QaCategoryService,
    private assessmentNotesService: AssessmentNotesService,
    private qcNotesService: QaNotesService,
    private traineeService: TraineeService
  ) { }

  getQcTraineeNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.qcNotesService.getQcTraineeNotesByBatchAndWeek(batchId, week);
  }

  getQcBatchNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote> {
    return this.qcNotesService.getQcBatchNotesByBatchAndWeek(batchId, week);
  }

  getCategoriesByBatchAndWeek(batchId: number, week: number): Observable<QcCategory[]> {
    return this.qcCategoryService.getCategoriesByBatchAndWeek(batchId, week);
  }

  getActiveCategories(): Observable<Category[]> {
    return this.categoryService.getActiveCategories();
  }

  saveWeeklyQcCategory(tag: QcCategory): Observable<QcCategory> {
    return this.qcCategoryService.saveWeeklyQcCategory(tag);
  }

  removeWeeklyQcCategory(tag: QcCategory): Observable<void> {
    return this.qcCategoryService.removeWeeklyQcCategory(tag);
  }

  getTraineesByBatch(batchId: number): Observable<Trainee[]> {
    return this.traineeService.getTraineesByBatchId(batchId);
  }

  upsertQcTraineeNote(qcNote: QcNote): Observable<QcNote> {
    return this.qcNotesService.upsertQcTraineeNote(qcNote);
  }

  upsertQcBatchNote(qcNote: QcNote): Observable<QcNote> {
    return this.qcNotesService.upsertQcBatchNote(qcNote);
  }

  upsertNote(note: Note): Observable<Note> {
    return this.assessmentNotesService.upsertNote(note);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Assessment} from "../domain/model/assessment.dto";
import {Batch} from "../domain/model/batch.dto";
import {Trainee} from "../domain/model/trainee.dto";
import {Note} from "../domain/model/assessment-note.dto";
import {Grade} from "../domain/model/grade.dto";
import {Category} from "../domain/model/category.dto";
import {WeeklyAssociateNotes} from "../domain/dto/weekly-associate-notes.dto";

@Injectable()
export class AssessBatchService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   *  Used freduently
   */
  public getQuarterFromDate(date: Date): number {
    const month = date.getMonth();
    if (month >= 0 && month < 3) {
      return 1;
    } else if (month >=3 && month < 6) {
      return 2;
    } else if (month >= 6 && month < 9) {
      return 3;
    } else if (month >= 9 && month < 12) {
      return 4;
    }
  }

  /**
   *  Categories
   */

  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.active);
  }

  getCategoryByCategoryId(categoryId: number): Observable<Category> {
    return this.http.get<Category>(environment.api.categories.byId(categoryId));
  }

  /**
   * Batches
   */

  getValidYears(): Observable<number[]> {
    return this.http.get<number[]>(environment.api.validYears);
  }

  getBatchesByYearAndQuarter(year: number, quarter: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.allByYearAndQuarter(year, quarter));
  }

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(environment.api.user.trainees.inBatch(batchId));
  }

  /**
   * Assessments
   */
  getAssessmentsByBatchIdAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(environment.api.assessments.allByBatchIdAndWeek(batchId, week));
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

  /**
   * Assessment Notes
   */
  upsertNote(note: Note): Observable<Note> {
    return this.http.put<Note>(environment.api.assessments.upsert, note);
  }

  getNoteMapByBatchIdAndWeek(batchId: number, week: number): Observable<WeeklyAssociateNotes> {
    return this.http.get<WeeklyAssociateNotes>(environment.api.assessments.notes.byBatchAndWeek(batchId, week));
  }

  /**
   * Assessment Grades
   */
  getGradesByBatchIdAndWeek(batchId: number, week: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.api.assessments.grades.byBatchAndWeek(batchId, week));
  }

  upsertGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(environment.api.assessments.grades.upsert, grade);
  }
}

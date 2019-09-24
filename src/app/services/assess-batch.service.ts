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
import {CategoryService} from "./subvertical/category/category.service";
import {AssessmentNotesService} from "./subvertical/assessment/assessment-notes.service";
import {AssessmentService} from "./subvertical/assessment/assessment.service";
import {AssessmentGradeService} from "./subvertical/assessment/assessment-grade.service";
import {TraineeService} from "./subvertical/user/trainee.service";
import {ChronoService} from "./subvertical/util/chrono.service";
import {BatchService} from "./subvertical/batch/batch.service";

@Injectable()
export class AssessBatchService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService,
    private assessmentNotesService: AssessmentNotesService,
    private assessmentService: AssessmentService,
    private assessmentGradeService: AssessmentGradeService,
    private traineeService: TraineeService,
    private chronoService: ChronoService,
    private batchService: BatchService
  ) { }

  /**
   *  Used frequently
   */
  public getQuarterFromDate(date: Date): number {
    return this.chronoService.getQuarterFromDate(date);
  }

  /**
   *  Categories
   */

  getActiveCategories(): Observable<Category[]> {
    return this.categoryService.getActiveCategories();
  }

  getCategoryByCategoryId(categoryId: number): Observable<Category> {
    return this.categoryService.getCategoriesById(categoryId);
  }

  /**
   * Batches
   */

  getValidYears(): Observable<number[]> {
    return this.chronoService.getValidYears();
  }

  getBatchesByYearAndQuarter(year: number, quarter: number): Observable<Batch[]> {
    return this.batchService.getBatchesByYearAndQuarter(year, quarter);
  }

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.traineeService.getTraineesByBatchId(batchId);
  }

  /**
   * Assessments
   */
  getAssessmentsByBatchIdAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchIdAndWeek(batchId, week);
  }

  createAssessment(assessment: Assessment): Observable<Assessment> {
    return this.assessmentService.createAssessment(assessment);
  }

  updateAssessment(assessment: Assessment): Observable<Assessment> {
    return this.assessmentService.updateAssessment(assessment);
  }

  deleteAssessment(assessment: Assessment): Observable<Assessment> {
    return this.assessmentService.deleteAssessment(assessment);
  }

  /**
   * Assessment Notes
   */
  upsertNote(note: Note): Observable<Note> {
    return this.assessmentNotesService.upsertNote(note);
  }

  getNoteMapByBatchIdAndWeek(batchId: number, week: number): Observable<WeeklyAssociateNotes> {
    return this.assessmentNotesService.getNoteMapByBatchIdAndWeek(batchId, week);
  }

  /**
   * Assessment Grades
   */
  getGradesByBatchIdAndWeek(batchId: number, week: number): Observable<Grade[]> {
    return this.assessmentGradeService.getGradesByBatchIdAndWeek(batchId, week);
  }

  upsertGrade(grade: Grade): Observable<Grade> {
    return this.assessmentGradeService.upsertGrade(grade);
  }
}

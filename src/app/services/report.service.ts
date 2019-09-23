import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChronoService} from "./subvertical/util/chrono.service";
import {CategoryService} from "./subvertical/category/category.service";
import {Category} from "../domain/model/category.dto";
import {BatchService} from "./subvertical/batch/batch.service";
import {Batch} from "../domain/model/batch.dto";
import {Grade} from "../domain/model/grade.dto";
import {AssessmentGradeService} from "./subvertical/assessment/assessment-grade.service";
import {Assessment} from "../domain/model/assessment.dto";
import {AssessmentService} from "./subvertical/assessment/assessment.service";
import {QcNote} from "../domain/model/qc-note.dto";
import {QaNotesService} from "./subvertical/quality-audit/qa-notes.service";
import {Trainee} from "../domain/model/trainee.dto";

@Injectable()
export class ReportService {

  batch: Batch;
  week: number;
  trainee: Trainee;
  averageGradeScore: number;
  gradesDataStore: Grade[];
  qaNoteDataStore: QcNote[];
  traineeDataStore: Trainee[];
  categoryDataStore: Category[];
  assessmentsDataStore: Assessment[];
  batchAssessmentsDataStore: Assessment[];
  gradesOfBatchDataStore: Grade[];
  gradesOfTraineeDataStore: Grade[];

  //for Tech Radar Last Minute Changes
  cacheGradeStore: Grade[];
  cacheCategoryStore: Category[];
  cacheTraineeStore: Trainee[];
  cacheAssessmentStore: Assessment[];

  constructor(
    private http: HttpClient,
    private chronoService: ChronoService,
    private categoryService: CategoryService,
    private batchService: BatchService,
    private assessmentGradeService: AssessmentGradeService,
    private assessmentService: AssessmentService,
    private qcNoteService: QaNotesService
  ) {}

  getAllYears(): Observable<number[]> {
    return this.chronoService.getValidYears();
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryService.getAllCategories();
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.batchService.getBatchesByYear(year);
  }

  getAllGradesForTotalAverage(): Observable<Grade[]> {
    return this.assessmentGradeService.getAllGrades();
  }

  getGradesByBatchAndWeek(batchId: number, week: number): Observable<Grade[]> {
    if (week === 0) {
      return this.assessmentGradeService.getGradesByBatchId(batchId);
    }
    return this.assessmentGradeService.getGradesByBatchIdAndWeek(batchId, week);
  }

  getGradesByBatchId(batchId: number): Observable<Grade[]> {
    return this.assessmentGradeService.getGradesByBatchId(batchId);
  }

  getAllTraineeGrades(): Observable<Grade[]> {
    if (this.trainee && this.trainee.traineeId) {
      return this.getGradesByTrainee(this.trainee.traineeId);
    }
  }

  getAllQaNotes(): Observable<QcNote[]> {
    if (this.batch) {
      if (this.batch.batchId) {
        if (this.week > 0) {
          return this.qcNoteService.getAllQcNotesByBatchAndWeek(this.batch.batchId, this.week);
        } else {
          return this.qcNoteService.getAllQcNotesByBatch(this.batch.batchId)
        }
      }
    }
  }

  getGradesByTrainee(traineeId: number): Observable<Grade[]> {
    return this.assessmentGradeService.getGradesByTrainee(traineeId)
  }

  getAllAssessmentsByBatchAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchIdAndWeek(batchId, week);
  }

  getAllAssessmentsByBatch(batchId: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchId(batchId);
  }

  getAllQcNotesByBatch(batchId: number): Observable<QcNote[]> {
    return this.qcNoteService.getAllQcNotesByBatch(batchId);
  }

  getAllQcNotesByBatchAndWeek(batchId: number, week: number): Observable<QcNote[]> {
    return this.qcNoteService.getAllQcNotesByBatchAndWeek(batchId, week);
  }

  getQcBatchNoteByBatchAndWeek(batchId: number, week: number): Observable<QcNote> {
    return this.qcNoteService.getOverallQcNoteByBatchAndWeek(batchId, week);
  }

  setGradesOfBatchDataStore(gradesOfBatchDataStore: Grade[]) {
    this.gradesOfBatchDataStore = gradesOfBatchDataStore;
  }

  getGradesOfBatchDataStore(): Grade[] {
    return this.gradesOfBatchDataStore;
  }

  setGradeDataStore(gradesDataStore: Grade[]) {
    this.gradesDataStore = gradesDataStore;
  }

  setQANoteDataStore(qaNoteDataStore: QcNote[]) {
    this.qaNoteDataStore = qaNoteDataStore;
  }

  setTraineeDataStore(traineeDataStore: Trainee[]) {
    this.traineeDataStore = traineeDataStore;
  }

  setCategoryDataStore(categoryDataStore: Category[]) {
    this.categoryDataStore = categoryDataStore;
  }

  setAssessmentDataStore(assessmentDataStore: Assessment[]) {
    this.assessmentsDataStore = assessmentDataStore;
  }

  setBatchAssessmentDataStore(batchAssessmentsDataStore: Assessment[]) {
    this.batchAssessmentsDataStore = batchAssessmentsDataStore;
  }

  setGradesOfTraineeDataStore(gradesOfTraineeDataStore: Grade[]) {
    this.gradesOfTraineeDataStore = gradesOfTraineeDataStore;
  }

  determineWeek(week: number): String {
    if (week > 0) {
      return '?week=' + week;
    }
    return '';
  }

  setAverageGradeScore(averageGradeScore: number) {
    this.averageGradeScore = averageGradeScore;
  }

  setBatch(batch: Batch) {
    this.batch = batch;
  }

  setCacheGradeStore(cacheGradeStore : Grade[]){
    this.cacheGradeStore = cacheGradeStore;
  }

  setCacheCategoryStore(cacheCategoryStore: Category[]){
    this.cacheCategoryStore = cacheCategoryStore;
  }

  setCacheTraineeStore(cacheTraineeStore: Trainee[]){
    this.cacheTraineeStore = cacheTraineeStore;
  }

  setCacheAssessmentStore(cacheAssessmentStore: Assessment[]){
    this.cacheAssessmentStore = cacheAssessmentStore;
  }

  getCacheGradeStore(): Grade[]{
    return this.cacheGradeStore;
  }

  getCacheCategoryStore(): Category[]{
    return this.cacheCategoryStore;
  }

  getCacheTraineeStore(): Trainee[]{
    return this.cacheTraineeStore
  }

  getCacheAssessmentStore(): Assessment[]{
    return this.cacheAssessmentStore
  }

  getBatch() {
    return this.batch;
  }

  setWeek(week) {
    this.week = week;
  }

  getWeek(): number {
    return this.week;
  }

  setTrainee(trainee) {
    this.trainee = trainee;
  }

  getTrainee() {
    return this.trainee;
  }

  getGradeDataStore(): Grade[] {
    return this.gradesDataStore;
  }

  getQANoteDataStore(): QcNote[] {
    return this.qaNoteDataStore;
  }

  getTraineeDataStore(): Trainee[] {
    return this.traineeDataStore;
  }

  getCategoryDataStore(): Category[] {
    return this.categoryDataStore;
  }

  getAssessmentDataStore(): Assessment[] {
    return this.assessmentsDataStore;
  }

  getBatchAssessmentDataStore(): Assessment[] {
    return this.batchAssessmentsDataStore;
  }

  getGradesOfTraineeDataStore() {
    return this.gradesOfTraineeDataStore;
  }

  getAverageGradeScore() {
    return this.averageGradeScore;
  }
}

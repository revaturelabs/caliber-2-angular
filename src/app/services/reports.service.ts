import {Injectable} from "@angular/core";
import {ChronoService} from "./subvertical/util/chrono.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Batch} from "../domain/model/batch.dto";
import {BatchService} from "./subvertical/batch/batch.service";
import {Trainee} from "../domain/model/trainee.dto";
import {TraineeService} from "./subvertical/user/trainee.service";
import {Assessment} from "../domain/model/assessment.dto";
import {AssessmentService} from "./subvertical/assessment/assessment.service";
import {Grade} from "../domain/model/grade.dto";
import {AssessmentGradeService} from "./subvertical/assessment/assessment-grade.service";
import {BatchGradeDto} from "../domain/dto/batch-grade.dto";
import {GradeComparisonDto} from "../domain/dto/grade-comparison.dto";
import {Benchmark} from "../domain/dto/benchmark.dto";
import {QcNote} from "../domain/model/qc-note.dto";
import {QaNotesService} from "./subvertical/quality-audit/qa-notes.service";
import {SpiderGraphDto} from "../domain/dto/spider-graph.dto";

@Injectable()
export class ReportsService {

  private batchGradeComparisonSubject$: BehaviorSubject<BatchGradeDto[]> = new BehaviorSubject<BatchGradeDto[]>(undefined);
  private traineeGradeComparisonSubject$: BehaviorSubject<GradeComparisonDto> = new BehaviorSubject<GradeComparisonDto>(undefined);
  private spiderGraphDtoSubject$: BehaviorSubject<SpiderGraphDto[]> = new BehaviorSubject<SpiderGraphDto[]>(undefined);
  private weeklyBatchGradesComparisonSubject$: BehaviorSubject<GradeComparisonDto> = new BehaviorSubject<GradeComparisonDto>(undefined);

  private batchGradeComparison$: Observable<BatchGradeDto[]> = this.batchGradeComparisonSubject$.asObservable();
  private traineeGradeComparison$: Observable<GradeComparisonDto> = this.traineeGradeComparisonSubject$.asObservable();
  private spiderGraphDto$: Observable<SpiderGraphDto[]> = this.spiderGraphDtoSubject$.asObservable();
  private weeklyBatchGradesComparison$: Observable<GradeComparisonDto> = this.weeklyBatchGradesComparisonSubject$.asObservable();

  constructor(
    private chronoService: ChronoService,
    private batchService: BatchService,
    private traineeService: TraineeService,
    private assessmentService: AssessmentService,
    private gradesService: AssessmentGradeService,
    private qaNotesService: QaNotesService
  ) {}

  getAllYears(): Observable<number[]> {
    return this.chronoService.getValidYears();
  }

  getCurrentYear(): number {
    return this.chronoService.getCurrentYear();
  }

  /**
   * Batches Related
   */
  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.batchService.getBatchesByYear(year);
  }

  getBenchmarkForBatch(batchId: number): Observable<Benchmark> {
    return this.gradesService.getBenchmarksForBatch(batchId);
  }

  /**
   * Trainee Related
   */

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.traineeService.getTraineesByBatchId(batchId);
  }

  /**
   * Assessment Related
   */
  getAllAssessmentsByBatchId(batchId: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchId(batchId);
  }

  getAllAssessmentsByBatchIdAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.assessmentService.getAssessmentsByBatchIdAndWeek(batchId, week);
  }

  /**
   * Grades Related
   */
  getGradesByBatchId(batchId: number): Observable<Grade[]> {
    return this.gradesService.getGradesByBatchId(batchId);
  }

  getGradesByBatchIdAndWeek(batchId: number, week: number): Observable<Grade[]> {
    return this.gradesService.getGradesByBatchIdAndWeek(batchId, week);
  }

  /**
   * Reports Related
   */
  getGradeReportForBatch(batchId: number): Observable<BatchGradeDto[]> {
    return this.gradesService.getGradeReportForBatch(batchId);
  }

  getGradeReportForBatchOnWeek(batchId: number, week: number): Observable<BatchGradeDto[]> {
    return this.gradesService.getGradeReportForBatchByWeek(batchId, week);
  }

  getIndividualGradeComparison(traineeId: number): Observable<GradeComparisonDto> {
    return this.gradesService.getIndividualGradeComparison(traineeId);
  }

  getIndividualGradeComparisonOnWeek(traineeId: number, week: number): Observable<GradeComparisonDto> {
    return this.gradesService.getIndividualGradeComparisonForWeek(traineeId, week);
  }

  getSpiderGraphDataForBatch(batchId: number): Observable<SpiderGraphDto[]> {
    return this.gradesService.getSpiderGraphData(batchId);
  }

  getSpiderGraphDataForBatchAndTrainee(batchId: number, traineeId: number): Observable<SpiderGraphDto[]> {
    return this.gradesService.getSpiderGraphDataForTrainee(batchId, traineeId);
  }

  /**
   * QC Note Related
   */
  getIndividualQcNotesByBatchId(batchId: number): Observable<QcNote[]> {
    return this.qaNotesService.getAllQcNotesByBatch(batchId);
  }

  getAllBatchQcNotes(batchId: number): Observable<QcNote[]> {
    return this.qaNotesService.getAllQcBatchNotesForBatch(batchId);
  }

  /**
   * To Reduce number of required network requests
   */
  setBatchGradeComparison(batchId: number | undefined) {
    if (batchId === undefined) {
      this.batchGradeComparisonSubject$.next(undefined);
      return;
    }
    this.getGradeReportForBatch(batchId).subscribe(
      data => this.batchGradeComparisonSubject$.next(data)
    );
  }

  setBatchGradeComparisonForWeek(batchId: number, week: number) {
    this.getGradeReportForBatchOnWeek(batchId, week).subscribe(
      data => this.batchGradeComparisonSubject$.next(data)
    )
  }

  setTraineeToCompareGrades(traineeId: number | undefined) {
    if (traineeId === undefined) {
      this.traineeGradeComparisonSubject$.next(undefined);
      return;
    }
    this.getIndividualGradeComparison(traineeId).subscribe(
      data => this.traineeGradeComparisonSubject$.next(data)
    );
  }

  setTraineeToCompareGradesOnWeek(traineeId: number, week: number) {
    this.getIndividualGradeComparisonOnWeek(traineeId, week).subscribe(
      data => this.traineeGradeComparisonSubject$.next(data)
    );
  }

  setSpiderGraphData(batchId: number) {
    this.getSpiderGraphDataForBatch(batchId).subscribe(
      data => this.spiderGraphDtoSubject$.next(data)
    );
  }

  setSpiderGraphDataWithTrainee(batchId: number, traineeId: number) {
    this.getSpiderGraphDataForBatchAndTrainee(batchId, traineeId).subscribe(
      data => this.spiderGraphDtoSubject$.next(data)
    )
  }

  setBatchGradesToCompareForWeeklyAssessmentBreakdownComponent(batchId: number, week: number) {
    if (week === 0) {
      this.weeklyBatchGradesComparisonSubject$.next(undefined);
      return;
    }
    this.gradesService.getBatchScoresWeeklyAssessmentBreakdown(batchId, week).subscribe(
      data => this.weeklyBatchGradesComparisonSubject$.next(data)
    )
  }

  getTraineeGradeComparison(): Observable<GradeComparisonDto> {
    return this.traineeGradeComparison$;
  }

  getBatchGradeComparison(): Observable<BatchGradeDto[]> {
    return this.batchGradeComparison$;
  }

  getSpiderGraphData(): Observable<SpiderGraphDto[]> {
    return this.spiderGraphDto$;
  }

  getBatchGradesToCompareForWeeklyAssessmentBreakdownComponent(): Observable<GradeComparisonDto> {
    return this.weeklyBatchGradesComparison$;
  }
}

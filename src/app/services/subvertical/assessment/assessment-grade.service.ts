import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../../../domain/model/grade.dto";
import {environment} from "../../../../environments/environment";
import {GradeExport} from "../../../domain/dto/grade-export.dto";
import {Batch} from "../../../domain/model/batch.dto";
import {MissingGrade} from "../../../domain/dto/missing-grades.dto";
import {BatchGradeDto} from "../../../domain/dto/batch-grade.dto";
import {GradeComparisonDto} from "../../../domain/dto/grade-comparison.dto";
import {Benchmark} from "../../../domain/dto/benchmark.dto";
import {SpiderGraphDto} from "../../../domain/dto/spider-graph.dto";

@Injectable()
export class AssessmentGradeService {

  constructor(
    private http: HttpClient
  ) {}

  getGradesByBatchIdAndWeek(batchId: number, week: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.api.assessments.grades.byBatchAndWeek(batchId, week));
  }

  getGradesByBatchId(batchId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.api.assessments.grades.byBatch(batchId));
  }

  getGradesByTrainee(traineeId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.api.assessments.grades.byTrainee(traineeId));
  }

  upsertGrade(grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(environment.api.assessments.grades.upsert, grade);
  }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(environment.api.assessments.grades.all);
  }

  importGrades(gradesJson: GradeExport) {

  }

  addMissingGrades(batches: Batch[]): Observable<MissingGrade[]> {
    return this.http.post<MissingGrade[]>(environment.api.assessments.grades.missing, batches);
  }

  getBenchmarksForBatch(batchId: number): Observable<Benchmark> {
    return this.http.get<Benchmark>(environment.api.batches.benchmark(batchId));
  }

  getGradeReportForBatch(batchId: number): Observable<BatchGradeDto[]> {
    return this.http.get<BatchGradeDto[]>(environment.api.reports.overallBatchGradeComparison(batchId));
  }

  getGradeReportForBatchByWeek(batchId: number, week: number): Observable<BatchGradeDto[]> {
    return this.http.get<BatchGradeDto[]>(environment.api.reports.overallBatchGradeComparisonByWeek(batchId, week));
  }

  getIndividualGradeComparison(traineeId: number): Observable<GradeComparisonDto> {
    return this.http.get<GradeComparisonDto>(environment.api.reports.individualGradesComparedToRestOfBatch(traineeId));
  }

  getIndividualGradeComparisonForWeek(traineeId: number, week: number): Observable<GradeComparisonDto> {
    return this.http.get<GradeComparisonDto>(environment.api.reports.individualGradesComparedToRestOfBatchOnWeek(traineeId, week));
  }

  getSpiderGraphData(batchId: number): Observable<SpiderGraphDto[]> {
    return this.http.get<SpiderGraphDto[]>(environment.api.reports.spiderGraphData(batchId));
  }

  getSpiderGraphDataForTrainee(batchId: number, week: number): Observable<SpiderGraphDto[]> {
    return this.http.get<SpiderGraphDto[]>(environment.api.reports.spiderGraphDataForTrainee(batchId, week));
  }

  getBatchScoresWeeklyAssessmentBreakdown(batchId: number, week: number): Observable<GradeComparisonDto> {
    return this.http.get<GradeComparisonDto>(environment.api.reports.weeklyAssessmentBreakdown(batchId, week));
  }
}

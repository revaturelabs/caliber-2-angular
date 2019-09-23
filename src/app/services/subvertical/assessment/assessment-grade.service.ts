import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grade} from "../../../domain/model/grade.dto";
import {environment} from "../../../../environments/environment";
import {GradeExport} from "../../../domain/dto/grade-export.dto";
import {Batch} from "../../../domain/model/batch.dto";
import {MissingGrade} from "../../../domain/dto/missing-grades.dto";

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

}

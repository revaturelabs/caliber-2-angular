import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assessment} from "../../../domain/model/assessment.dto";
import {environment} from "../../../../environments/environment";
import {Trainee} from "../../../domain/model/trainee.dto";
import {Batch} from "../../../domain/model/batch.dto";
import {WeekName} from "../../../domain/model/week-name.dto";

@Injectable()
export class AssessmentService {

  constructor(
    private http: HttpClient
  ) {}

  getAssessmentsByBatchIdAndWeek(batchId: number, week: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(environment.api.assessments.allByBatchIdAndWeek(batchId, week));
  }

  getAssessmentsByBatchId(batchId: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(environment.api.assessments.allByBatchId(batchId));
  }

  getAssessmentsByWeek(week: number): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(environment.api.assessments.allByWeek(week));
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

  upsertComment(trainee: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(environment.api.user.trainees.upsertComment, trainee);
  }

  upsertWeekName(weekName: WeekName): Observable<WeekName> {
    return this.http.put<WeekName>(environment.api.assessments.weekNames.upsert, weekName);
  }

  getWeekNamesByBatchId(batchId: number): Observable<WeekName[]> {
    return this.http.get<WeekName[]>(environment.api.assessments.weekNames.byBatchId(batchId));
  }
}

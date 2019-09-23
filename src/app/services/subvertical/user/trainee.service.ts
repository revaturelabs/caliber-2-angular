import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trainee} from "../../../domain/model/trainee.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class TraineeService {

  constructor(
    private http: HttpClient
  ) {}

  getTraineesByBatchId(batchId: number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(environment.api.user.trainees.inBatch(batchId));
  }

  createTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.post<Trainee>(environment.api.user.trainees.create, trainee);
  }

  updateTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(environment.api.user.trainees.update, trainee);
  }

  deleteTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.delete<Trainee>(environment.api.user.trainees.delete(trainee.traineeId));
  }
}

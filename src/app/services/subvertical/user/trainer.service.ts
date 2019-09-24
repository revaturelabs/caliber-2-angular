import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Trainer} from "../../../domain/model/trainer.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class TrainerService {

  constructor(
    private http: HttpClient
  ) {}

  getAllTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(environment.api.user.trainers.all);
  }

  editTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.put<Trainer>(environment.api.user.trainers.update(trainer.trainerId), trainer);
  }

  disableTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.patch<Trainer>(environment.api.user.trainers.update(trainer.trainerId), trainer);
  }

  addTrainer(trainer: Trainer): Observable<Trainer> {
    return this.http.post<Trainer>(environment.api.user.trainers.all, trainer);
  }
}

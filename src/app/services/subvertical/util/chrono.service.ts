import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Batch} from "../../../domain/model/batch.dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ChronoService {

  constructor(
    private http: HttpClient
  ) {}

  public readonly quarters: number[] = [1, 2, 3, 4];

  public getQuarterFromDate(): number {
    const month = new Date().getMonth();
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

  addWeekAndReturn(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(environment.api.batches.updateAndReturn, batch);
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getValidYears(): Observable<number[]> {
    return this.http.get<number[]>(environment.api.validYears);
  }
}

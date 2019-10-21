import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WeekName} from "../../../domain/model/week-name.dto";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class QaWeekNameService {

  constructor(
    private http: HttpClient
  ) {}

  upsertWeekName(weekName: WeekName): Observable<WeekName> {
    return this.http.put<WeekName>(environment.api.qa.weekNames.upsert, weekName);
  }

  getByBatchId(batchId: number): Observable<WeekName[]> {
    return this.http.get<WeekName[]>(environment.api.qa.weekNames.byBatchId(batchId));
  }
}

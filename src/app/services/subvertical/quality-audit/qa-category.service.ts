import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QcCategory} from "../../../domain/model/qc-category.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class QaCategoryService {

  constructor(
    private http: HttpClient
  ) {}

  getCategoriesByBatchAndWeek(batchId: number, week: number): Observable<QcCategory[]> {
    return this.http.get<QcCategory[]>(environment.api.qa.categories.byBatchAndWeek(batchId, week));
  }

  saveWeeklyQcCategory(tag: QcCategory): Observable<QcCategory> {
    return this.http.post<QcCategory>(environment.api.qa.categories.create, tag);
  }

  removeWeeklyQcCategory(tag: QcCategory): Observable<void> {
    return this.http.delete<void>(environment.api.qa.categories.delete(tag.id));
  }
}

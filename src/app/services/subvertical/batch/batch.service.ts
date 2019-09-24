import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Batch} from "../../../domain/model/batch.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class BatchService {

  constructor(
    private http: HttpClient
  ) {}

  getAllBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.all);
  }

  getAllCurrentBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.current)
  }

  getBatchById(batchId: number): Observable<Batch> {
    return this.http.get<Batch>(environment.api.batches.byId(batchId));
  }

  getBatchesByYearAndQuarter(year: number, quarter: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.allByYearAndQuarter(year, quarter));
  }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(environment.api.batches.allByYear(year));
  }

  getTraineeCountByBatchIds(batchIds: number[]): Observable<number[][]> {
    return this.http.post<number[][]>(environment.api.user.trainees.countInBatches(batchIds), batchIds);
  }

  getTraineeCountByBatchId(batchId: number): Observable<number> {
    return this.http.get<number>(environment.api.user.trainees.countByBatchId(batchId));
  }

  deleteBatch(batchId: number): Observable<Batch> {
    return this.http.delete<Batch>(environment.api.batches.deleteById(batchId));
  }

  createBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(environment.api.batches.create, batch);
  }

  updateBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(environment.api.batches.updateAndReturn, batch);
  }
}

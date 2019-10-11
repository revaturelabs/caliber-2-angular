import {Component, OnInit} from '@angular/core';
import {ManageBatchService} from "../../../services/manage-batch.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {distinctUntilChanged} from "rxjs/operators";
import {Batch} from "../../../domain/model/batch.dto";
import {BatchModalService} from "../../services/batch-modal.service";

@Component({
  selector: 'app-manage-batch-container',
  templateUrl: './manage-batch-container.component.html',
  styleUrls: ['./manage-batch-container.component.css']
})
export class ManageBatchContainerComponent implements OnInit {

  years: number[];
  selectedYear: number = this.manageBatchService.getCurrentYear();
  batchesThisYear$: Observable<Batch[]>;

  private selectedYear$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private lastUpdatedBatch$: Observable<Batch>;

  constructor(
    private manageBatchService: ManageBatchService,
    private batchModalService: BatchModalService,
  ) { }

  ngOnInit() {
    this.lastUpdatedBatch$ = this.batchModalService.updatedBatchSubject.asObservable();
    this.manageBatchService.getAllYears().toPromise().then(
      data => this.years = data
    );

    combineLatest(this.selectedYear$.asObservable(), this.lastUpdatedBatch$).pipe(distinctUntilChanged()).subscribe(
      ([year, batch]) => {
        if (year > 0 || batch) {
          this.batchesThisYear$ = this.manageBatchService.getBatchesByYear(year);
        }
      }
    );

    this.batchModalService.getLastDeletedBatch().subscribe(
      data => {
        if (data) {
          this.batchesThisYear$ = this.manageBatchService.getBatchesByYear(this.selectedYear);
        }
      }
    )
  }

  selectYear(year: number) {
    this.selectedYear = year;
    this.selectedYear$.next(year);
  }

  handleBatchCreate(batch: Batch) {
    this.batchesThisYear$ = this.manageBatchService.getBatchesByYear(batch.startDate.getFullYear());
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChronoService} from "../../../services/subvertical/util/chrono.service";
import {Observable} from "rxjs";
import {Batch} from "../../../domain/model/batch.dto";
import {ImportDialogService} from "../../../shared/services/import-dialog.service";

@Component({
  selector: 'app-manage-batch-toolbar',
  templateUrl: './manage-batch-toolbar.component.html',
  styleUrls: ['./manage-batch-toolbar.component.css']
})
export class ManageBatchToolbarComponent implements OnInit {

  @Input("years") years: number[];
  @Input("year") year: number;

  @Output("onYearSelect") onYearSelect: EventEmitter<number> = new EventEmitter<number>(true);
  @Output('onBatchCreate') onBatchCreate$: EventEmitter<Batch> = new EventEmitter<Batch>(true);

  constructor(
    private importDialogService: ImportDialogService
  ) { }

  ngOnInit() {

  }

  selectYear(year: number) {
    this.onYearSelect.emit(year);
  }

  handleCreatedBatch(batch: Batch) {
    this.onBatchCreate$.emit(batch);
  }

  showBatchImportDialog() {
    this.importDialogService.openImportBatchModal();
  }

}

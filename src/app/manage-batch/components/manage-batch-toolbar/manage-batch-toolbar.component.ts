import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChronoService} from "../../../services/subvertical/util/chrono.service";
import {Observable} from "rxjs";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-manage-batch-toolbar',
  templateUrl: './manage-batch-toolbar.component.html',
  styleUrls: ['./manage-batch-toolbar.component.css']
})
export class ManageBatchToolbarComponent implements OnInit {

  @Input("years") years: number[];
  @Input("year") year: number;

  @Output("onYearSelect") onYearSelect: EventEmitter<number> = new EventEmitter<number>(true);

  private lastUpdatedBatch$: Observable<Batch>;

  constructor(

  ) { }

  ngOnInit() {

  }

  selectYear(year: number) {
    this.onYearSelect.emit(year);
  }

}

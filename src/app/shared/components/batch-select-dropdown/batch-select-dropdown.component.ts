import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-batch-select-dropdown',
  templateUrl: './batch-select-dropdown.component.html',
  styleUrls: ['./batch-select-dropdown.component.css']
})
export class BatchSelectDropdownComponent implements OnInit, OnChanges {

  @Input('batches') batches: Batch[];
  @Output('onBatchSelect') onBatchSelect: EventEmitter<Batch> = new EventEmitter<Batch>(true);
  selectedBatch: Batch = undefined;

  searchForm: FormGroup = this.generateSearchForm();
  results: SearchResult[] = [];
  private formattedBatchList: SearchResult[] = this.formatBatchList();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // Only need to change dropdown list when value changes
    this.results = this.formatBatchList();
    this.searchForm.get("query").valueChanges.subscribe(
      (data: string) => {
        // Handle truthy string (filtered)
        if (data) {
          this.results = this.formattedBatchList.filter(batch => batch.output.startsWith(data));
          // Handle no results
          if (this.results.length === 0) {
            this.results.push({batchId: -1, output: "No results found"});
          }
        } else {
          // Handle falsy string (no search query)
          this.results = this.formatBatchList();
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'batches') {
        this.batches = change.currentValue;
        this.formattedBatchList = this.formatBatchList();
        this.results = this.formattedBatchList;
      }
    }
  }



  private generateSearchForm(): FormGroup {
    return this.fb.group({
      "query": ""
    })
  }

  private formatBatchList(): SearchResult[] {
    return this.batches && this.batches.map(batch => {
      return {
        batchId: batch.batchId,
        output: this.formatBatch(batch)
      }
    })
  }

  formatBatch(batch: Batch): string {
    if (batch !== undefined) {
      const dateString: string = new Date(batch.startDate).toLocaleDateString("en-US");
      return `${batch.trainer} - ${batch.skillType} - ${dateString}`;
    }
  }

  selectBatch(batchId: number) {
    this.selectedBatch = this.batches.find(batch => batch.batchId === batchId);
    this.onBatchSelect.emit(this.selectedBatch);
  }

}

interface SearchResult {
  batchId: number;
  output: string;
}

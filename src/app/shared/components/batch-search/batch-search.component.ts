import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Batch} from "../../../Batch/type/batch";

@Component({
  selector: 'app-batch-search',
  templateUrl: './batch-search.component.html',
  styleUrls: ['./batch-search.component.css']
})
export class BatchSearchComponent implements OnInit, OnChanges {

  @Input('batches') batches: Batch[];

  searchForm: FormGroup = this.generateSearchForm();
  readonly input: string[] = ["Hello", "Helo", "Helllo", "Hey"];
  results: string[] = [""];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchForm.get("query").valueChanges.subscribe(
      (data: string) => {
        this.results = [""];
        this.formatBatchList().forEach(element => {
          if (element.startsWith(data)) {
            this.results.push(element);
          }
        })
      }
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let prop in changes) {
      const change = changes[prop];
      if (prop === 'batches') {
        this.batches = change.currentValue;
      }
    }
  }



  private generateSearchForm(): FormGroup {
    return this.fb.group({
      "query": ""
    })
  }

  private formatBatchList(): string[] {
    if (this.batches && this.batches.length > 0) {
      return this.batches.map(batch => {
        return this.formatBatch(batch);
      })
    } else {
      return ["No results found"];
    }
  }

  formatBatch(batch: Batch): string {
    if (batch !== undefined) {
      const dateString: string = new Date(batch.startDate).toLocaleDateString("en-US");
      return `${batch.trainer} - ${batch.skillType} - ${dateString}`;
    }
  }

}

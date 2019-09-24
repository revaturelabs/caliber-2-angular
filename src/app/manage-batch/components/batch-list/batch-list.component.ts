import {Component, Input, OnInit} from '@angular/core';
import {Batch} from "../../../domain/model/batch.dto";

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.css']
})
export class BatchListComponent implements OnInit {

  @Input("batches") batches: Batch[];

  constructor() { }

  ngOnInit() {
  }

}

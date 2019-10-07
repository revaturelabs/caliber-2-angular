import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-import-batch-button',
  templateUrl: './import-batch-button.component.html',
  styleUrls: ['./import-batch-button.component.css']
})
export class ImportBatchButtonComponent implements OnInit {

  @Output('onShowImportBatchDialog') onShowImportBatchDialog: EventEmitter<boolean> = new EventEmitter<boolean>(true);

  constructor() { }

  ngOnInit() {
  }

  showImportBatchDialog() {
    this.onShowImportBatchDialog.emit(true);
  }

}

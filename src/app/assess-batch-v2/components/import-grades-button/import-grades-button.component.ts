import {Component, Input, OnInit} from '@angular/core';
import {ImportGradesDialogService} from "../../../shared/services/import-grades-dialog.service";

@Component({
  selector: 'app-import-grades-button',
  templateUrl: './import-grades-button.component.html',
  styleUrls: ['./import-grades-button.component.css']
})
export class ImportGradesButtonComponent implements OnInit {

  @Input("week") week: number;
  @Input("batchId") batchId: number;

  constructor(
    private importGradesDialogService: ImportGradesDialogService
  ) { }

  ngOnInit() {
  }

  openImportGradesDialog() {
    this.importGradesDialogService.openModal(this.week);
  }

}

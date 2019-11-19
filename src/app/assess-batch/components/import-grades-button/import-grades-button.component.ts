import {Component, Input, OnInit} from '@angular/core';
import {ImportDialogService} from "../../../shared/services/import-dialog.service";

@Component({
  selector: 'app-import-grades-button',
  templateUrl: './import-grades-button.component.html',
  styleUrls: ['./import-grades-button.component.css']
})
export class ImportGradesButtonComponent implements OnInit {

  @Input("week") week: number;
  @Input("batchId") batchId: number;

  constructor(
    private importGradesDialogService: ImportDialogService
  ) { }

  ngOnInit() {
  }

  openImportGradesDialog() {
    this.importGradesDialogService.openImportGradesModal(this.week);
  }

}

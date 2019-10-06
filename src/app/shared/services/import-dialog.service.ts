import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ImportGradesDialogComponent} from "../components/import-grades-dialog/import-grades-dialog.component";
import {ImportBatchDialogComponent} from "../components/import-batch-dialog/import-batch-dialog.component";

@Injectable()
export class ImportDialogService {

  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  openImportGradesModal(week: number) {
    const initialState = {
      week: week
    };
    this.modalRef = this.modalService.show(ImportGradesDialogComponent, {initialState, ignoreBackdropClick: true});
  }

  openImportBatchModal() {
    this.modalRef = this.modalService.show(ImportBatchDialogComponent, { ignoreBackdropClick: true });
    this.modalRef.content.lastExportedBatch$.asObservable().subscribe(
      data => {
        if (data) {
          console.log(data);
        }
      }
    )
  }
}

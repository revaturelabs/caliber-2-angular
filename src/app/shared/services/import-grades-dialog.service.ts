import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ImportGradesDialogComponent} from "../components/import-grades-dialog/import-grades-dialog.component";
import {SharedModule} from "../shared.module";

@Injectable({
  providedIn: SharedModule
})
export class ImportGradesDialogService {

  private modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  openModal(week: number) {
    const initialState = {
      week: week
    };
    this.modalRef = this.modalService.show(ImportGradesDialogComponent, {initialState, ignoreBackdropClick: true});

  }
}

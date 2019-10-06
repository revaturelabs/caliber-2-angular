import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap";
import {GradeExport} from "../../../domain/dto/grade-export.dto";
import {BatchExport} from "../../../domain/dto/batch-export.dto";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-import-batch-dialog',
  templateUrl: './import-batch-dialog.component.html',
  styleUrls: ['./import-batch-dialog.component.css']
})
export class ImportBatchDialogComponent implements OnInit {

  importBatchForm: FormGroup = this.generateForm();
  jsonValid: boolean = true;
  lastExportedBatch$: BehaviorSubject<BatchExport> = new BehaviorSubject<BatchExport>(undefined);

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  import() {
    try {
      const batchExport: BatchExport = <BatchExport>JSON.parse(this.importBatchForm.get("batchImportJSON").value);

      // Notify importService to do something with this batch export
      this.lastExportedBatch$.next(batchExport);
    } catch (e) {
      this.jsonValid = false;
    }
  }

  private generateForm(): FormGroup {
    return this.fb.group({
      "batchImportJSON": ["", Validators.required]
    })
  }
}

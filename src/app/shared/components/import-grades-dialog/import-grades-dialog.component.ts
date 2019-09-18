import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeExport} from "../../../domain/dto/grade-export.dto";

@Component({
  selector: 'app-import-grades-dialog',
  templateUrl: './import-grades-dialog.component.html',
  styleUrls: ['./import-grades-dialog.component.css']
})
export class ImportGradesDialogComponent implements OnInit {

  week: number;
  batchId: number;

  gradeForm: FormGroup;
  jsonValid: boolean = true;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.gradeForm = this.generateGradeForm();
  }

  import() {
    try {
      const gradeExport: GradeExport = <GradeExport>JSON.parse(this.gradeForm.get("gradesJson").value);;

      // Do something on the backend with this grade export
    } catch (e) {
      this.jsonValid = false;
    }
  }

  private generateGradeForm(): FormGroup {
    return this.fb.group({
      "gradesJson": ["", Validators.required]
    });
  }

}

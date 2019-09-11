import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeExport} from "../../dto/grade-export.dto";

@Component({
  selector: 'app-import-grades-dialog',
  templateUrl: './import-grades-dialog.component.html',
  styleUrls: ['./import-grades-dialog.component.css']
})
export class ImportGradesDialogComponent implements OnInit {

  week: number;

  gradeForm: FormGroup;
  jsonValid: boolean = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.gradeForm = this.generateGradeForm();
  }

  import() {
    try {
      const gradeJson: GradeExport = JSON.parse(this.gradeForm.get("gradesJson").value);
      console.log(gradeJson);
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

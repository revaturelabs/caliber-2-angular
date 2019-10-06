import {Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeExport} from "../../../domain/dto/grade-export.dto";
import {AssessmentGradeService} from "../../../services/subvertical/assessment/assessment-grade.service";

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
    private fb: FormBuilder,
    private assessmentGradeService: AssessmentGradeService
  ) { }

  ngOnInit() {
    this.gradeForm = this.generateGradeForm();
  }

  import() {
    try {
      const gradeExport: GradeExport = <GradeExport>JSON.parse(this.gradeForm.get("gradesJson").value);;

      // Do something on the backend with this grade export
      this.assessmentGradeService.importGrades(gradeExport);
    } catch (e) {
      this.jsonValid = false;
    }
  }

  close() {
    this.bsModalRef.hide();
  }

  private generateGradeForm(): FormGroup {
    return this.fb.group({
      "gradesJson": ["", Validators.required]
    });
  }

}

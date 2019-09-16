import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-assessment-result-spinner',
  templateUrl: './assessment-result-spinner.component.html',
  styleUrls: ['./assessment-result-spinner.component.css']
})
export class AssessmentResultSpinnerComponent implements OnInit {

  @Input("isSaving") isSaving: boolean;
  @Input("success") success: boolean;
  @Input("failure") failure: boolean;

  constructor() { }

  ngOnInit() {
  }

}

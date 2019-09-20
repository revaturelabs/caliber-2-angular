import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QcNote} from "../../../domain/model/qc-note.dto";


@Component({
  selector: 'app-qc-feedback',
  templateUrl: './qc-feedback.component.html',
  styleUrls: ['./qc-feedback.component.css']
})
export class QcFeedbackComponent implements OnInit {

  @Input("column") column: string;
  @Input('qcNote') qcNote: QcNote;
  @Input('isOverallFeedback') isOverallFeedback: boolean;
  @Output('onQcStatusSelect') qcStatusSelector: EventEmitter<QcNote> = new EventEmitter<QcNote>(true);
  shouldShowDropdown: boolean = false;
  private readonly baseClass: string = "fa fa-2x";

  constructor() {
  }

  ngOnInit() {
  }

  getDisplayClassForStatus(qcStatus: string): string {
    if (this.isOverallFeedback) {
      return `fa fa-3x ${this.getClassForStatus(qcStatus)}`;
    } else {
      return `fa fa-2x ${this.getClassForStatus(qcStatus)}`;
    }
  }

  getClassForStatus(qcStatus: string): string {
    if (qcStatus === undefined) {
      return `${this.baseClass} fa-question-circle`;
    }
    switch (qcStatus) {
      case "Undefined":
        return `${this.baseClass} fa-question-circle`;
      case "Poor":
        return `${this.baseClass} fa-frown`;
      case "Average":
        return `${this.baseClass} fa-meh`;
      case "Good":
        return `${this.baseClass} fa-smile`;
      case "Superstar":
        return `${this.baseClass} fa-star`
    }
  }

  getStatuses(): string[] {
    if (this.isOverallFeedback) {
      return ["Poor", "Average", "Good"];
    } else {
      return ["Undefined", "Poor", "Average", "Good", "Superstar"]
    }
  }

  showDropdown() {
    this.shouldShowDropdown = true;
  }

  hideDropdown() {
    this.shouldShowDropdown = false;
  }

  setQcStatus(status: string) {
    switch(this.column) {
      case "technical":
        this.setTechnicalStatus(status);
        break;
      case "soft":
        this.setSoftSkillStatus(status);
        break;
    }
  }

  setTechnicalStatus(status: string) {
    this.qcNote.technicalStatus = status;
    this.qcStatusSelector.emit(this.qcNote);
  }

  setSoftSkillStatus(status: string) {
    this.qcNote.softSkillStatus = status;
    this.qcStatusSelector.emit(this.qcNote);
  }
}

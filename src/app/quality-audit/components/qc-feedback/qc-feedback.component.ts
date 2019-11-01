import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QcNote} from "../../../domain/model/qc-note.dto";


@Component({
  selector: 'app-qc-feedback',
  templateUrl: './qc-feedback.component.html',
  styleUrls: ['./qc-feedback.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QcFeedbackComponent implements OnInit {

  @Input("column") column: string;
  @Input('qcNote') qcNote: QcNote;
  @Input('isOverallFeedback') isOverallFeedback: boolean;
  @Output('onQcStatusSelect') qcStatusSelector: EventEmitter<QcNote> = new EventEmitter<QcNote>(true);
  shouldShowDropdown: boolean = false;
  private readonly baseClass: string = "fa fa-2x qc-feedback ";

  constructor() {
  }

  ngOnInit() {
  }

  getDisplayClassForStatus(qcStatus: string): string {
    if (this.isOverallFeedback) {
      return `fa fa-3x qc-feedback ${this.getClassForStatus(qcStatus)}`;
    } else {
      return `fa fa-2x qc-feedback ${this.getClassForStatus(qcStatus)}`;
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

  hideDropdown(event: any) {
    event.preventDefault();
    event.cancelBubble = true;
    this.shouldShowDropdown = false;
  }

  toggleDropdown() {
    this.shouldShowDropdown = !this.shouldShowDropdown;
  }

  setQcStatus(status: string) {
    this.toggleDropdown();
    switch(this.column) {
      case "technical":
        this.setTechnicalStatus(status);
        break;
      case "soft":
        this.setSoftSkillStatus(status);
        break;
    }
    this.qcStatusSelector.emit(this.qcNote);
  }

  setTechnicalStatus(status: string) {
    this.qcNote.technicalStatus = status;
  }

  setSoftSkillStatus(status: string) {
    this.qcNote.softSkillStatus = status;
  }

  getQcStatus() {
    switch(this.column) {
      case "technical":
        return this.qcNote.technicalStatus;
      case "soft":
          return this.qcNote.softSkillStatus;
    }
  }
}

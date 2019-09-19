import { Component, OnInit, Input } from '@angular/core';
import {QcNote} from "../../../../domain/model/qc-note.dto";

@Component({
  selector: 'app-individual-qcresults-row',
  templateUrl: './individual-qcresults-row.component.html',
  styleUrls: ['./individual-qcresults-row.component.css']
})
export class IndividualQcresultsRowComponent implements OnInit {
  @Input() public qcNote : QcNote;

  constructor() { }

  ngOnInit() {
  }

}

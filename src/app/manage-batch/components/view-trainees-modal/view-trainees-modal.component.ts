import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Trainee} from "../../../domain/model/trainee.dto";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-view-trainees-modal',
  templateUrl: './view-trainees-modal.component.html',
  styleUrls: ['./view-trainees-modal.component.css']
})
export class ViewTraineesModalComponent implements OnInit {

  trainees$: Observable<Trainee>;
  title: string;
  trainer: string;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}

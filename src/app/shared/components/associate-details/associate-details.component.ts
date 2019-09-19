import {Component, Input, OnInit} from '@angular/core';
import {CommentDialogService} from "../../services/comment-dialog.service";
import {Trainee} from "../../../domain/model/trainee.dto";

@Component({
  selector: 'app-associate-details',
  templateUrl: './associate-details.component.html',
  styleUrls: ['./associate-details.component.css']
})
export class AssociateDetailsComponent implements OnInit {

  @Input("trainee") trainee: Trainee;

  show: boolean = false;

  constructor(
    private commentDialogService: CommentDialogService
  ) { }

  ngOnInit() {
  }

  showPen() {
    this.show = true;
  }

  hidePen() {
    this.show = false;
  }

  showAssociateFlagModal() {
    this.commentDialogService.openCommentDialog(this.trainee);
  }
}

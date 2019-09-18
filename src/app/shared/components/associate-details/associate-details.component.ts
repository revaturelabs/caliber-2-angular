import {Component, Input, OnInit} from '@angular/core';
import {Trainee} from "../../../Batch/type/trainee";
import {CommentDialogService} from "../../services/comment-dialog.service";

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

import {Component, Input, OnInit} from '@angular/core';
import {Trainee} from "../../../Batch/type/trainee";
import {BsModalRef} from "ngx-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {TraineeFlag} from "../../../User/user/types/trainee-flag";

@Component({
  selector: 'app-associate-flag-dialog',
  templateUrl: './associate-flag-dialog.component.html',
  styleUrls: ['./associate-flag-dialog.component.css']
})
export class AssociateFlagDialogComponent implements OnInit {

  @Input("trainee") trainee: Trainee;

  commentForm: FormGroup;
  commentComplete: boolean = false;
  confirm: boolean = false;

  readonly flags: string[] = ["RED", "GREEN", "TRAINER"];

  protected createComment$: BehaviorSubject<Trainee> = new BehaviorSubject<Trainee>(undefined);

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.commentForm = this.generateCommentForm();
    if (this.trainee.flagStatus && this.trainee.flagNotes) {
      this.commentForm.patchValue({
        flagStatus: this.trainee.flagStatus,
        comment: this.trainee.flagNotes
      })
    }
  }

  setFlag(flagType: string) {
    this.commentForm.get("flagStatus").setValue(flagType);
  }

  getFlag(): string {
    return this.commentForm.get("flagStatus").value;
  }

  completeComment() {
    this.commentComplete = true;
  }

  createComment() {
    const comment: string = this.commentForm.get("comment").value;
    const flag: string = this.commentForm.get("flagStatus").value;
    this.trainee.flagNotes = comment;
    this.trainee.flagStatus = TraineeFlag[flag];
    this.trainee.flagTimeStamp = new Date().toDateString();
    this.createComment$.next(this.trainee);
    this.bsModalRef.hide();
  }

  deleteComment() {
    this.trainee.flagNotes = "NONE";
    this.trainee.flagNotes = "";
    this.createComment$.next(this.trainee);
    this.bsModalRef.hide();
  }

  hasValues(): boolean {
    return Boolean(this.trainee.flagNotes) && Boolean(this.trainee.flagStatus);
  }

  haveUserConfirm() {
    this.confirm = true;
  }

  undoUserConfirmation() {
    this.confirm = false;
  }

  private generateCommentForm(): FormGroup {
    return this.fb.group({
      "flagStatus": ["", Validators.required],
      "comment": ["", Validators.compose([Validators.required, Validators.maxLength(4000), Validators.minLength(0)])]
    });
  }

}

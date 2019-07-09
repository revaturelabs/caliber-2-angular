import { Component, OnInit, ElementRef } from '@angular/core';
import { createElement } from '@angular/core/src/view/element';
import { Services } from '@angular/core/src/view';
import { AuditService } from '../../Services/audit.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
import { QcNote } from '../../types/note';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { element } from '@angular/core/src/render3/instructions';
import { timeout } from 'q';
import { Trainee } from 'src/app/Batch/type/trainee';
import { Tag } from '../../types/Tag';
@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  sortRandom: boolean = false;

  // Category Tags that have been added to a week by user
  categoryTags: Map<string, Tag> = this.auditService.categoryTags;


  // Active Category Tags retrieved from Category Service
  activeCategoryTags: Map<string, Tag> = new Map<string, Tag>();

  notes: QcNote[] = this.auditService.notes;
  order: string = "Randomly";
  isTyping: boolean;
  spinner: HTMLElement;
  checkMark: HTMLElement;
  errMark: HTMLElement;
  
  flagStatusVisual: string;
  hoverComment: string;
  isaddFlagClicked: boolean = false;
  selectedTrainee: Trainee;
  selectedTraineeIndex: number;
  selectedTraineeFlagNotesBeforeSelecting: string;
  selectedTraineeFlagStatusBeforeSelecting: string;

  // List of test categories
  categories = [
    {
      name: 'Java',
    },
    {
      name: 'MySQL'
    }
  ];

  constructor(private auditService: AuditService, private errorService: ErrorService) { }

  ngOnInit() {
    this.auditService.subsVar = this.auditService.
      invokeAssosciateFunction.subscribe(() => {
        this.getNotesByBatchByWeek();
        this.getCategoriesByBatchByWeek();
      });
    if (this.auditService.notes === undefined) {
      this.notes = null;
    } else {
      this.notes = this.auditService.notes;
    }

    this.getAllActiveCategories();
  }

  // Grab the active categories from the Category Service
  getAllActiveCategories(): void {
    this.auditService.getAllActiveCategories().subscribe(
      (activeTags: Tag[]) => {
        for (let i = 0; i < activeTags.length; i++) {
          let t: Tag = new Tag(activeTags[i].categoryId, activeTags[i].skillCategory, -1, -1);

          this.activeCategoryTags.set(t.skillCategory, t);
        }
      }
    );
  }

  addCategoryTag(tag: Tag) {
    if (!this.categoryTags.has(tag.skillCategory) && this.auditService.selectedBatch != undefined) {

      let t = new Tag(tag.categoryId,
        tag.skillCategory,
        this.auditService.selectedBatch.batchId,
        this.auditService.selectedWeek);

      if (tag.id === undefined) {
        this.auditService.sendCategory(t).subscribe(resultTag => {
          t.setId(resultTag.id);
        });
      }
      else{
        t.setId(tag.id);
      }
      this.categoryTags.set(tag.skillCategory, t);
    }
  }

  removeCategoryTag($event: any) {
    let tagName: string = $event.srcElement.previousSibling.data.trim();
    let id = this.categoryTags.get(tagName).id;
    this.auditService.deleteCategory(id).subscribe();
    this.categoryTags.delete(tagName);
  }

  //When you click week, it will reset button to default
  toggleNotesArray(): void {
    this.auditService.invokeAssosciateFunction.subscribe(() => {
      this.sortRandom = false;
      this.order = "Randomly";
    });
    if (this.sortRandom == true) {
      this.auditService.sortAlphabetically(this.notes);
      this.order = "Randomly";
    } else if (this.sortRandom == false) {
      this.notes.sort(() => Math.random() - 0.5);
      this.order = "Alphabetically";
    }
    this.sortRandom = !this.sortRandom;
  }
  
  getNote(NoteId: number) {
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].noteId == NoteId) {
        return this.notes[i];
      }
    }
  }
  onFlagSelected(selectedFlag: string) {
    this.selectedTrainee.flagStatus = selectedFlag;
    this.flagStatusVisual = "fa-" + this.selectedTrainee.flagStatus.toLowerCase();
  }

  showText(selectedNoteId: number) {
    this.hoverComment = this.getNote(selectedNoteId).trainee.flagNotes;
  }

  onFlagSubmit() {
    this.auditService.saveFlag(this.selectedTrainee).subscribe(data => {
      this.isaddFlagClicked = false;
    });
  }

  onFlagDelete(){
    this.selectedTrainee.flagNotes = "";
    this.selectedTrainee.flagStatus = "NONE";
    this.auditService.saveFlag(this.selectedTrainee).subscribe(data => {
    });
    this.isaddFlagClicked = false;
  }

  onFlagCancel() {
    this.selectedTrainee.flagStatus = this.selectedTraineeFlagStatusBeforeSelecting;
    this.selectedTrainee.flagNotes = this.selectedTraineeFlagNotesBeforeSelecting;
    this.isaddFlagClicked = false;
  }
  
  onAddFlagClicked(trainee: Trainee, index: number) {
    this.selectedTrainee = trainee;
    this.selectedTraineeFlagNotesBeforeSelecting = trainee.flagNotes;
    this.selectedTraineeFlagStatusBeforeSelecting = trainee.flagStatus;
    this.selectedTraineeIndex = index;
    if (this.selectedTrainee.flagStatus == null) {
      this.onFlagSelected('NONE');
    }
    this.flagStatusVisual = "fa-" + this.selectedTrainee.flagStatus.toLowerCase();
    this.isaddFlagClicked = false;
  }


  sortAlphabetically(notes: any) {
    notes.sort((a: { trainee: { name: number; }; }, b: { trainee: { name: number; }; }): any => {
      if (a.trainee.name > b.trainee.name) {
        return 1;
      }
      else {
        return -1;
      }
    });
  }

  getNotesByBatchByWeek() {
    this.notes = this.auditService.notes;
  }

  showSpinner(i: number) {
    //showSpinner is called when keystroke event occurs in a note
    //it displays a "loading" icon until noteOnBlur is called..
    //see noteOnBlur below
    this.spinner = document.getElementById('spinner' + i);
    this.spinner.style.display = "block";
    this.checkMark = document.getElementById('checkMark' + i);
    this.checkMark.style.display = "none";
    this.errMark = document.getElementById('errMark' + i);
    this.errMark.style.display = "none";
  }

  clearAllSavingIcon(i: number) {
    this.spinner = document.getElementById('spinner' + i);
    this.spinner.style.display = "none";
    this.checkMark = document.getElementById('checkMark' + i);
    this.checkMark.style.display = "none";
    this.errMark = document.getElementById('errMark' + i);
    this.errMark.style.display = "none";
  }

  getCategoriesByBatchByWeek() {
    let categories: Tag[] = this.auditService.categoriesByBatchByWeek;
    this.categoryTags.clear();
    for (let i = 0; i < categories.length; i++) {
      this.addCategoryTag(categories[i]);
    }
  }
  //noteOnBlur will save a note to the backend when an onBlur event happens.
  //if the function returns successfully, the check mark div will be displayed
  //if the function returns an error, the X mark div will be displayed.. 
  //these are displayed by setting the value of their ngIf variable to true
  noteOnBlur(selectedNoteId: number, secondRound: boolean, i: number): void {
    for (let note of this.notes) {
      if (note.noteId === selectedNoteId) {
        this.showSpinner(i);
        this.auditService.sendNote(note).subscribe(
          data => {
            if (this.isTyping == true) {
              this.spinner = document.getElementById('spinner' + i);
              this.spinner.style.display = "none";
              this.checkMark = document.getElementById('checkMark' + i);
              this.checkMark.style.display = "block";
              this.errMark = document.getElementById('errMark' + i);
              this.errMark.style.display = "none";
            } else {
              this.spinner = document.getElementById('spinner' + i);
              this.spinner.style.display = "none";
              this.checkMark = document.getElementById('checkMark' + i);
              this.checkMark.style.display = "none";
              this.errMark = document.getElementById('errMark' + i);
              this.errMark.style.display = "none";
            }

            this.isTyping = false;
          },
          issue => {
            const checkMark: HTMLElement = document.getElementById('checkMark' + i);
            checkMark.style.display = "none";
            const spinner: HTMLElement = document.getElementById('spinner' + i);
            spinner.style.display = "none";
            const errMark: HTMLElement = document.getElementById('errMark' + i);
            errMark.style.display = "block";
            if (issue instanceof HttpErrorResponse) {
              const err = issue as HttpErrorResponse;
              this.errorService.setError('AuditService',
                `Issue updating QcNote with noteId ${note.trainee.name}. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
            }
          }
        );
        break;
      }
    }
    //Get rid of all marks after few seconds
    setTimeout(() => { this.clearAllSavingIcon(i); }, 5000);
  }

  setScore(selection: string, selectedNoteId: number) {

    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].noteId === selectedNoteId) {
        this.notes[i].qcStatus = selection;
        this.auditService.sendNote(this.notes[i]).subscribe(
          data => {
            this.auditService.getOverallBatchNoteByWeek(this.auditService.selectedBatch['batchId'], this.auditService.selectedWeek);
          },
          issue => {
            if (issue instanceof HttpErrorResponse) {
              const err = issue as HttpErrorResponse;
              this.errorService.setError('AuditService',
                `Issue updating QcNote with noteId ${this.notes[i].trainee.name}. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
            }
          });
        break;
      }
    }
  }

}

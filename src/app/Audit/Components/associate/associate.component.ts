import { Component, OnInit } from '@angular/core';
import { createElement } from '@angular/core/src/view/element';
import { Services } from '@angular/core/src/view';
import { AuditService } from '../../Services/audit.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
import { QcNote } from '../../types/note';
import { ErrorService } from 'src/app/error-handling/services/error.service';
import { Tag } from '../../types/tag';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  sortRandom: boolean = false;

  categoryTags: Map<string, Tag> = new Map<string, Tag>([
    ['Java', new Tag(1, 'Java', 35, 45)],
    ['MySql', new Tag(2, 'MySql', 35, 45)]
  ]);


  activeCategoryTags: Object[];

  notes: QcNote[] = this.auditService.notes;
  order: string = "Randomly";


  // Unimplemented functions
  constructor(private auditService: AuditService, private errorService: ErrorService) { }

  ngOnInit() {
    this.auditService.subsVar = this.auditService.
      invokeAssosciateFunction.subscribe(() => {
        this.getNotesByBatchByWeek();
      });
    // this.sortAlphabetically(this.notes);
    if (this.auditService.notes === undefined) {
      this.notes = null;
    } else {
      this.notes = this.auditService.notes;
    }

    this.getAllActiveCategories();

  }

  getAllActiveCategories(): void {
    this.auditService.getAllActiveCategories().subscribe(
      (activeTags: Object[]) => {
        this.activeCategoryTags = activeTags;
      }
    );
  }

  addCategoryTag(tagInputText: string) {
    if (tagInputText != '') {
      this.categoryTags.set(tagInputText, new Tag(1, tagInputText, 35, 45));
    }
  }

  removeCategoryTag($event: any) {
    this.categoryTags.delete($event.srcElement.previousSibling.data.trim());
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

  // Cycle the Individual Feedback Status
  cycleFlag(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].trainee.flagStatus) {
          case 'NONE':
            newStatus = 'RED';
            break;
          case 'RED':
            newStatus = 'GREEN';
            break;
          case 'GREEN':
            newStatus = 'NONE';
            break;
        }
        console.log(newStatus);
        // Update the status
        this.notes[i].trainee.flagStatus = newStatus;
      }
    }
  }

  noteOnBlur(selectedNoteId: number, secondRound: boolean): void {
    for (let note of this.notes) {
      if (note.noteId === selectedNoteId) {
        console.log(note);
        this.auditService.sendNote(note).subscribe(
          data => {
          },
          issue => {
            if (issue instanceof HttpErrorResponse) {
              const err = issue as HttpErrorResponse;
              this.errorService.setError('AuditService',
                `Issue updating QcNote with noteId ${selectedNoteId}. Please contact system administrator: \n
            Status Code: ${err.status} \n
            Status Text: ${err.statusText} \n
            Error: ${err.message}`);
            }
          }
        );
        break;
      }
    }
  }

  setScore(selection: string, selectedNoteId: number) {

    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].noteId === selectedNoteId) {
        this.notes[i].qcStatus = selection;
        this.auditService.sendNote(this.notes[i]).subscribe(
          data => {
          },
          issue => {
            if (issue instanceof HttpErrorResponse) {
              const err = issue as HttpErrorResponse;
              this.errorService.setError('AuditService',
                `Issue updating QcNote with noteId ${selectedNoteId}. Please contact system administrator: \n
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

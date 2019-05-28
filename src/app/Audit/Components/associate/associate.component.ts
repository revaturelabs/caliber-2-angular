import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Assess-Batch/Services/note.service';
import { QcNote } from '../../types/note';
import { AuditService } from '../../Services/audit.service';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  sortRandom: boolean = false;
  notes: QcNote[] = this.auditService.notes;
  

  // List of test categories
  categories = [
    {
      name: 'Java',
    },
    {
      name: 'MySQL'
    }
  ];

  //List of test notes
  // notes = [
  //   {
  //     qcStatus: 'Undefined',
  //     noteId: 0,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Hajek, Alexander',
  //       flagNotes: '',
  //       flagStatus: 'NONE'
  //     }
  //   },
  //   {
  //     qcStatus: 'Superstar',
  //     noteId: 1,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Michels, Alex',
  //       flagNotes: '',
  //       flagStatus: 'RED'
  //     }
  //   },
  //   {
  //     qcStatus: 'Good',
  //     noteId: 2,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Smith, Carter',
  //       flagNotes: '',
  //       flagStatus: 'NONE'
  //     }
  //   },
  //   {
  //     qcStatus: 'Average',
  //     noteId: 3,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Erwin, Eric',
  //       flagNotes: '',
  //       flagStatus: 'RED'
  //     }
  //   },
  //   {
  //     qcStatus: 'Poor',
  //     noteId: 4,
  //     noteFlagInputActive: false,
  //     trainee: {
  //       name: 'Olney, Chris',
  //       flagNotes: '',
  //       flagStatus: 'NONE'
  //     }
  //   }
  // ];

  // Unimplemented functions
  constructor(public auditService: AuditService) { }
  ngOnInit() {
    
      this.auditService.subsVar = this.auditService.    
      invokeAssosciateFunction.subscribe(()=> {    
        this.getNotesByBatchByWeek();    
      });
    this.sortAlphabetically(this.notes);
    this.notes = this.auditService.notes;
  
}


  toggleNotesArray(): void {
    if (this.sortRandom == true) {
      this.sortAlphabetically(this.notes);
      document.getElementById("toggleNoteSort").innerText = "Sort Randomly";
    } else if (this.sortRandom == false) {
      this.notes.sort(() => Math.random() - 0.5);
      document.getElementById("toggleNoteSort").innerText = "Sort Alphabetically";
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

  // Cycle the flag notes popup
  // cycleFlagNotesInput(selectedNoteId: number, enable: boolean): void {

  //   // Loop through each note in notes until the target is found
  //   for (let i = 0; i < this.notes.length; i++) {

  //     // Find the clicked note
  //     if (this.notes[i].noteId === selectedNoteId) {

  //       console.log(selectedNoteId);

  //         // Enable or disable the notes box popup
  //         this.notes[i].noteFlagInputActive = enable;

  //     }
  //   }
  // }

  // Cycle the Individual Feedback Status
  cycleIF(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].qcStatus) {
          case 'Undefined':
            newStatus = 'Superstar';
            break;
          case 'Superstar':
            newStatus = 'Good';
            break;
          case 'Good':
            newStatus = 'Average';
            break;
          case 'Average':
            newStatus = 'Poor';
            break;
          case 'Poor':
            newStatus = 'Undefined';
            break;
        }

        // Update the status
        this.notes[i].qcStatus = newStatus;
      }
    }
  }

  // Disables the associated notes text area box for 1 second.
  noteOnBlur(selectedNoteId: number, secondRound: boolean): void {

    // The first call will recursivley call this function again to re-enable the input box after 1 second
    if (!secondRound) {
      $('#note-textarea-' + selectedNoteId).prop('disabled', true);
      setInterval(this.noteOnBlur, 1000, selectedNoteId, true);
    } else {
      $('#note-textarea-' + selectedNoteId).prop('disabled', false);
    }
  }
}

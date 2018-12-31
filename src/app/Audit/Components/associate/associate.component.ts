import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  // List of test categories
  categories = [
    {
      name: 'Java',
    },
    {
      name: 'MySQL'
    }
  ];

  // List of test notes
  notes = [
    {
      qcStatus: 'Undefined',
      noteId: 0,
      noteFlagInputActive: false,
      trainee: {
        name: 'Hajek, Alexander',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Superstar',
      noteId: 1,
      noteFlagInputActive: false,
      trainee: {
        name: 'Michels, Alex',
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Good',
      noteId: 2,
      noteFlagInputActive: false,
      trainee: {
        name: 'Smith, Carter',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Average',
      noteId: 3,
      noteFlagInputActive: false,
      trainee: {
        name: 'Erwin, Eric',
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Poor',
      noteId: 4,
      noteFlagInputActive: false,
      trainee: {
        name: 'Olney, Chris',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    }
  ];

  // Unimplemented functions
  constructor() { }
  ngOnInit() { }

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

        // Update the status
        this.notes[i].trainee.flagStatus = newStatus;
      }
    }
  }

  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedNoteId: number, enable: boolean): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {
        
          // Enable or disable the notes box popup
          this.notes[i].noteFlagInputActive = enable;
      }
    }
  }

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

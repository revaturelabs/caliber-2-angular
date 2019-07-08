import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from '../../Models/qanote';

@Component({
  selector: 'app-individual-qcresults-table',
  templateUrl: './individual-qcresults-table.component.html',
  styleUrls: ['./individual-qcresults-table.component.css']
})
export class IndividualQCResultsTableComponent implements OnInit {
  qcData : QANote[][];
  
  week : number;
  batch : Batch;
  overallNote : QANote;
  trainees;



  constructor(private reportService : ReportService) {
    if (!this.qcData){
      this.qcData=[];
    }
   }

  ngOnInit() {}

  getStatus(week, traineeId) {
    const note = this.getNote(week, traineeId);
    switch (note['qcStatus']) {
      case 'Superstar':
        return 'fa fa-star fa-2x pick mouse-over';
      case 'Good':
        return 'fa fa-smile-o fa-2x pick mouse-over';
      case 'Average':
        return 'fa fa-meh-o fa-2x pick mouse-over';
      case 'Poor':
        return 'fa fa-frown-o fa-2x pick mouse-over';
      default:
        return 'fa fa-question-circle fa-2x mouse-over';
    }
  }

  // finds the correct Note based on the passed
  getNote(week, traineeId) {
    for (let i = 0; i < this.qcData[week].length; i++) {
      if (this.qcData[week][i]['traineeId'] === traineeId) {
        return this.qcData[week][i];
      }
    }
  }

  /*
  *Function called by the reports component to let this know to udate itself
  *Grabs the QA notes and filters them into a two dimensional array based on the week
  */
  update(notes) {
    this.qcData = [];
    const QAnotes = notes//this.reportService.getQANoteDataStore();

    let week = 1;
    while (this.needWeek(week, QAnotes)) {
      this.qcData.push(QAnotes.filter(function(value, index) {
        if (value['week'] === week) {
          return true;
        } else {
          return false;
        }
      }));
      week++;
    }
    this.trainees = this.reportService.getTraineeDataStore();
  }

  // Takes in a week and the array of QA notes searchs the array to see if the specified
  // is in the array and returns true if it finds it and false otherwise
  needWeek(week, QAnotes) {
    for (let i = 0; i < QAnotes.length; i++) {
      if (QAnotes[i]['week'] === week) {
        return true;
      }
    }
    return false;
  }

  /*
  * @param traineeID: This is the id of a particular trainee.
  * If the trainee ID is 0, the font-family is specified. This would be the Overall QC note.
  * Otherwise, the trainee name is found based on the passed in ID, and then is returned.
  */

  getName(traineeID) {
    if (traineeID === 0) {
      const myElement = document.getElementById('trainee' + traineeID);
      myElement.style.setProperty('font-family', 'Futura-Std-Bold');
      return 'Overall';
    } else {
      const trainees = this.reportService.getTraineeDataStore();
      for (let i = 0; i < trainees.length; i++) {
        if (trainees[i].traineeId === traineeID) {
          return trainees[i].name;
        }
      }
    }
  }
  
  /*
  * @param id : the Trainee ID
  * This method takes in a trainee ID and if the id is 0, then that is a Overall Batch Note.
  * The method returns the id for the td element for a specific CSS rule.
  */
  getID(id) {
    if (id === 0) {
      return 'overallRow';
    }
    return id;
  }
}

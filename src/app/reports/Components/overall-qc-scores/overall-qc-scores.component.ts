import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-qc-scores',
  templateUrl: './overall-qc-scores.component.html',
  styleUrls: ['./overall-qc-scores.component.css']
})
export class OverallQCScoresComponent implements OnInit {
  qcData: object[][];
  constructor() { }

  ngOnInit() {
  }

  downloadReport() {
    console.log('wat');
  }

  getStatus(week, traineeId) {
    let note = this.getNote(week, traineeId);
    switch(note['qcStatus']){
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

  getNote(week, traineeId){
    for(var i = 0; i < this.qcData[week].length; i++){
      if(this.qcData[week][i]['traineeId'] == traineeId){
        return this.qcData[week][i]
      }
    }
  }
  update(){
    console.log('wat');
  }
  getId(traineeId){
    if(traineeId == 0){
      return 'overallRow';
    }
    return traineeId;
  }

}

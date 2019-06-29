import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overall-qc-scores',
  templateUrl: './overall-qc-scores.component.html',
  styleUrls: ['./overall-qc-scores.component.css']
})
export class OverallQCScoresComponent implements OnInit {
  tempData = [[{"noteId":2,"content":"example2","week":1,"batchId":2050,"trainee":null,"traineeId":5350,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":3,"content":"example3","week":1,"batchId":2050,"trainee":null,"traineeId":5351,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":4,"content":"example4","week":1,"batchId":2050,"trainee":null,"traineeId":5352,"type":"QC_TRAINEE","qcStatus":"Poor","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":5,"content":"example5","week":1,"batchId":2050,"trainee":null,"traineeId":5353,"type":"QC_TRAINEE","qcStatus":"Poor","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":6,"content":"example6","week":1,"batchId":2050,"trainee":null,"traineeId":5354,"type":"QC_TRAINEE","qcStatus":"Superstar","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":7,"content":"example7","week":1,"batchId":2050,"trainee":null,"traineeId":5355,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":8,"content":"example8","week":1,"batchId":2050,"trainee":null,"traineeId":5356,"type":"QC_TRAINEE","qcStatus":"Superstar","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":9,"content":"example9","week":1,"batchId":2050,"trainee":null,"traineeId":5357,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":10,"content":"example10","week":1,"batchId":2050,"trainee":null,"traineeId":5358,"type":"QC_TRAINEE","qcStatus":"Superstar","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":11,"content":"example11","week":1,"batchId":2050,"trainee":null,"traineeId":5359,"type":"QC_TRAINEE","qcStatus":"Superstar","updateTime":1561677965953,"lastSavedBy":null},
  {"noteId":105,"content":"batchNote105","week":1,"batchId":2050,"trainee":null,"traineeId":0,"type":"QC_BATCH","qcStatus":"Undefined","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":116,"content":"example116","week":2,"batchId":2050,"trainee":null,"traineeId":5350,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":117,"content":"example117","week":2,"batchId":2050,"trainee":null,"traineeId":5351,"type":"QC_TRAINEE","qcStatus":"Superstar","updateTime":1561677965969,"lastSavedBy":null}],
  {"noteId":118,"content":"example118","week":2,"batchId":2050,"trainee":null,"traineeId":5352,"type":"QC_TRAINEE","qcStatus":"Average","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":119,"content":"example119","week":2,"batchId":2050,"trainee":null,"traineeId":5353,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":120,"content":"example120","week":2,"batchId":2050,"trainee":null,"traineeId":5354,"type":"QC_TRAINEE","qcStatus":"Average","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":121,"content":"example121","week":2,"batchId":2050,"trainee":null,"traineeId":5355,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":122,"content":"example122","week":2,"batchId":2050,"trainee":null,"traineeId":5356,"type":"QC_TRAINEE","qcStatus":"Undefined","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":123,"content":"example123","week":2,"batchId":2050,"trainee":null,"traineeId":5357,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":124,"content":"example124","week":2,"batchId":2050,"trainee":null,"traineeId":5358,"type":"QC_TRAINEE","qcStatus":"Average","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":125,"content":"example125","week":2,"batchId":2050,"trainee":null,"traineeId":5359,"type":"QC_TRAINEE","qcStatus":"Good","updateTime":1561677965969,"lastSavedBy":null},
  {"noteId":219,"content":"batchNote219","week":2,"batchId":2050,"trainee":null,"traineeId":0,"type":"QC_BATCH","qcStatus":"Undefined","updateTime":1561677965969,"lastSavedBy":null}];
  constructor() { }

  ngOnInit() {
  }

  downloadReport() {
    console.log('wat');
  }

  getStatus(note: object) {
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

}

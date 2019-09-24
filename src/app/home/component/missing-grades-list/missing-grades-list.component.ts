import {Component, Injectable, OnInit} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Batch} from "../../../domain/model/batch.dto";
import {MissingGrade} from "../../../domain/dto/missing-grades.dto";
import {HomeService} from "../../../services/home.service";


/**
 * @author Jace, Zev
 */

/**
 * sets headers for recieving JSON objects
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-missing-grades-list',
  templateUrl: './missing-grades-list.component.html',
  styleUrls: ['./missing-grades-list.component.css']
})

export class MissingGradesListComponent implements OnInit {

  postUrl : string = 'http://localhost:10000/assessment/all/grade/missingGrades';

  currBatches : Batch[];
  highestGradeWeek: number;

  missingGrades : Array<MissingGrade>;
  displayGrades : Array<MissingGrade>;
  flag : boolean = false; //Signifies init is finished, for dependent components to prevent loading before backend calls complete

  weeksForDisplay: Array<number>;

  location : string; // choose location
  missingGradeByLocation : Array<MissingGrade>;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.weeksForDisplay = new Array<number>();
    this.homeService.getCurrentBatches().subscribe(data => {
      this.currBatches = data;
    }, error => console.log('Error:' + error), () => this.getMissingGradesFromActiveBatches());
  }

  //Called by the location update of last quality audit
  update() {
    if (this.flag) {
      this.currBatches = this.homeService.getBatchesDataStore();
      this.filterByWeekAndLocation();
    }
  }

  getMissingGradesFromActiveBatches()  {
    this.homeService.addMissingGrade(this.currBatches).subscribe(MissingGrade => this.missingGrades = MissingGrade, error => console.log('Error:' + error), () => this.afterMissingGradeReturn());
  }

  afterMissingGradeReturn() {
    this.getPossibleWeeks();
    this.displayGrades = this.missingGrades;
    this.flag = true;
  }

  getPossibleWeeks() {
    let highest: number = 0;
    this.currBatches.forEach(batch => {
      if(batch.weeks - 3 > highest) {
        highest = batch.weeks - 3;
      }
    });
    console.log('Highest is ' + highest);
    this.highestGradeWeek = highest;
  }

  updateWeekFilter(weekList: Array<number>) {
    this.weeksForDisplay = weekList;
    this.filterByWeekAndLocation();
  }

  filterByWeekAndLocation() {
    let tmpDisplayMiss: Array<MissingGrade> = new Array<MissingGrade>();
    this.missingGrades.forEach(miss => {
      //Location filter
      let inCurrLocations: boolean = false;
      for(let j:number = 0; j < this.currBatches.length; j++) {
        if(miss.location === this.currBatches[j].location) {
          inCurrLocations = true;
          break;
        }
      }

      //Filter by week if it passed location filter
      if(inCurrLocations)
      {
        for(let i:number = 0; i < miss.missingWeeks.length; i++)
        {
          if(this.weeksForDisplay.includes(miss.missingWeeks[i]))
          {
            tmpDisplayMiss.push(miss);
            break;
          }
        }
      }
    })
    this.displayGrades = tmpDisplayMiss;
  }
}

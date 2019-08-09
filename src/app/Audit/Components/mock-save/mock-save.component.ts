import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mock-save',
  templateUrl: './mock-save.component.html',
  styleUrls: ['./mock-save.component.css']
})
export class MockSaveComponent implements OnInit {

  constructor() { }

  showSaving = false;
  showCheck = false;
  showFloppy = true;

  //doBurrito acts as the mock save
  doBurrito(){
    this.showFloppy = false;
    this.showSaving = true;
    setTimeout(()=> {this.showSaving = false; this.showCheck = true}, 1000);
    setTimeout(()=> {this.showCheck = false; this.showFloppy = true}, 2000);
  }

  ngOnInit() {
  }

}
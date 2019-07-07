import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: [
    './home-toolbar.component.css'
  ]
})
export class HomeToolbarComponent implements OnInit {
  showStates: boolean;
  constructor() {
    this.showStates = false;
  }

  ngOnInit() {
  }

  calShowState(value){
    if(value){
      this.showStates = true;
    }else{
      this.showStates = false;
    }
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from 'src/app/home/models/location';

@Component({
  selector: '[app-locationrow]',
  templateUrl: './locationrow.component.html',
  styleUrls: ['./locationrow.component.css']
})


export class LocationrowComponent implements OnInit {
  
  @Input() location:Location;

  @Output() locEmit: EventEmitter<Location> = new EventEmitter<Location>();
  @Output() disableEmit: EventEmitter<Location> = new EventEmitter<Location>();

  constructor() { }

  ngOnInit() 
  {
  }

  displayLocationEditModal(){
    this.locEmit.emit(this.location);
  }

  displayDisableModal(){
    this.disableEmit.emit(this.location);
  }
}

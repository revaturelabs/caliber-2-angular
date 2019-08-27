import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from "../../home/models/location"

@Component({
  selector: 'app-addlocationmodal',
  templateUrl: './addlocationmodal.component.html',
  styleUrls: ['./addlocationmodal.component.css']
})
export class AddlocationmodalComponent implements OnInit {
  location: Location;

  @Output() addLocationEmit: EventEmitter<Location> = new EventEmitter<Location>();
  constructor() { }

  ngOnInit() {
    this.location=new Location();
  }

  displayAddModal(){
    this.location=new Location();
  }

  addLocation(){
    this.location.active=true;
    this.addLocationEmit.emit(this.location);
  }

}

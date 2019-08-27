import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '../../home/models/location';
@Component({
  selector: 'app-editlocationmodal',
  templateUrl: './editlocationmodal.component.html',
  styleUrls: ['./editlocationmodal.component.css']
})
export class EditlocationmodalComponent implements OnInit {

  location: Location;

  @Output() putLocation: EventEmitter<Location> = new EventEmitter<Location>()

  constructor() { }

  ngOnInit() {
    this.location=new Location();
  }

  displayEditModal(location: Location){
    this.location=location;
  }

  updateLocation(){
    this.putLocation.emit(this.location);
  }
}

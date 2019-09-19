import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from "../../domain/model/location.dto";

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
    this.location = {
      address: "",
      city: "",
      name: "",
      state: "",
      zipcode: "",
      active: false
    }
  }

  displayAddModal(){
    this.location = {
      address: "",
      city: "",
      name: "",
      state: "",
      zipcode: "",
      active: false
    }
  }

  addLocation(){
    this.location.active=true;
    this.addLocationEmit.emit(this.location);
  }

}

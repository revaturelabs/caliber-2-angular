import { Component, OnInit } from '@angular/core';
import { LastQualityAuditService } from '../../services/last-quality-audit.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: [ './home-toolbar.component.css' ]
})

export class HomeToolbarComponent implements OnInit {
  showStates: boolean;
  locations: Location[];
  cities: String[];
  constructor(private lastQualityAuditService: LastQualityAuditService) {
    this.showStates = false;
    this.getLocations();
    this.cities = [''];
  }

  ngOnInit() {
  }


  getLocations() {
    this.lastQualityAuditService.getStateLocations().subscribe(
      (locations) => {
        this.locations = locations;
    });
  }

  updateState(state) {
    for (let locationIndex = 0; locationIndex < this.locations.length; locationIndex++) {
      if (this.locations[locationIndex].state === state) {
        if (!this.cities.includes(this.locations[locationIndex].city)) {
          this.cities.push(this.locations[locationIndex].city);
          console.log(this.cities);
        }
      }
    }
    this.cities.shift();
  }

  updateCity(city, state) {
    console.log(city + ', ' + state);
  }
}

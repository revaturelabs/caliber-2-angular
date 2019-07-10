import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url = environment.serverRootURL;

  selectedLocation : Location;
  locationsDataStore : Location[];

  allLocationURL = "/location/all/location/all"

  constructor(private http: HttpClient) { }

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.url + this.allLocationURL);
  }

  getlocationsDataStore(){
    return this.locationsDataStore;
  }

  setlocationsDataStore(locations : Location[]){
    this.locationsDataStore = locations;
  }

  getSelectedLocation(){
    return this.selectedLocation;
  }

  setSelectedLocation(location : Location){
    this.selectedLocation = location;
  }
}
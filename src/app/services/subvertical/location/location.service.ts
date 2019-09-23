import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Location} from "../../../domain/model/location.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class LocationService {

  constructor(
    private http: HttpClient
  ) {}

  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.api.location.all);
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(environment.api.location.create, location);
  }

  updateLocation(location: Location): Observable<Location> {
    return this.http.put<Location>(environment.api.location.update, location);
  }
}

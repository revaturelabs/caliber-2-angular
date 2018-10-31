import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainee } from '../types/trainee';

@Injectable({
  providedIn: 'root'
})
export class ViewBatchesService {

  constructor() { }

  getBatches(): Observable<Array<Trainee>> {
    return undefined;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import {AssessCategory} from '../Models/assess-category';

@Injectable({
  providedIn: 'root'
})
export class AssessCategoryService {

  serverUrl= environment.serverRootURL + "/assessment/";

  constructor(private http: HttpClient) { }


  addCategory(category: AssessCategory){
    return this.http.post(this.serverUrl + 'categories', category)
  }
}

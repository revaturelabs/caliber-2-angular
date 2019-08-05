import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {AssessCategory} from '../Models/assess-category';

@Injectable({
  providedIn: 'root'
})
export class AssessCategoryService {

  
  serverUrl = "http://localhost:10001/assessment/";

  constructor(private http: HttpClient) { }


  addCategory(category: AssessCategory){
    return this.http.post(this.serverUrl + 'categories', category)
  }
}

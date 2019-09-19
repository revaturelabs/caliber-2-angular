import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Category} from "../../domain/model/category.dto";


@Injectable({
  providedIn: 'root'
})
export class AssessCategoryService {

  serverUrl= environment.serverRootURL + "/category";

  constructor(private http: HttpClient) { }


  addCategory(category: Category){
    console.log(category)
    return this.http.post(`${this.serverUrl}/create`, category)
  }
}

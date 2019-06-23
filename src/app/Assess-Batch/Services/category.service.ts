import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../Models/Category";
import { environment } from "src/environments/environment"
// import { Category } from "../Models/Category";



@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  url = environment.serverRootURL + "/category/all/";
  getUrl = environment.serverRootURL + "category/all/";

  getCategories(): Observable<[Category]> {
    return this.http.get<[Category]>(this.url);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(this.getUrl+id);
  }


}
import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "../Models/Category";
import { environment } from "src/environments/environment"
// import { Category } from "../Models/Category";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  url = environment.serverRootURL + "/category/all/";
  getUrl = environment.serverRootURL + "/category/";

  getCategories(): Observable<[Category]> {
    return this.http.get<[Category]>(this.url, httpOptions);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(this.getUrl+id, httpOptions);
  }
}
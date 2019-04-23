import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Category } from "../Models/Category";



@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  url = "http://localhost:9090/all/category/all";
  getUrl = "http://localhost:9090/all/category/";

  getCategories(): Observable<[Category]> {
    return this.http.get<[Category]>(this.url);
  }

  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(this.getUrl+id);
  }


}
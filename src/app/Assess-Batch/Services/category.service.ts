import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
// import { Category } from "../Models/Category";



@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  url = "http://desktop-09krqra:8013/all/category/all";
//   ourCategories: Category[] = [];
//   categories = new EventEmitter<Category[]>();

  // getCategories(): Observable<[Category]> {
  //   return this.http.get<[Category]>(this.url);
  // }

//   storeCategories(entry: Category[]) {
//     this.ourCategories = entry;
//     console.log(this.ourCategories);
//   }
}
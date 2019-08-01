import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/User/user/types/trainee';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverUrl= environment.serverRootURL + '/assessment/categories/';


  constructor(private http: HttpClient) { }

  getCategory(id: number){
    return this.http.get(this.serverUrl + id);
  }

  listAll(){
    return this.http.get(this.serverUrl + "list");
  }

  edit(id:number, skillCategory:string, categoryOwner:string, isActive:boolean){
    const params = { "categoryId":id,
                     "skillCategory":skillCategory,
                     "categoryOwner":categoryOwner,
                     "active": isActive};
    return this.http.put(this.serverUrl + "update", params);
  }

  disable(id:number, skillCategory:string, categoryOwner:string){
    const params = { "categoryId":id,
                     "skillCategory":skillCategory,
                     "categoryOwner":categoryOwner,
                     "active": "false"};
    return this.http.put(this.serverUrl + "update", params);
  }
}

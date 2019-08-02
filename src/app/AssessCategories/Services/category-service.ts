import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from 'src/app/User/user/types/trainee';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //serverUrl = 'http://localhost:10000/';
  serverUrl= environment.serverRootURL;


  constructor(private http: HttpClient) { }

  listAll(){
    console.log(this.serverUrl);
    return this.http.get(this.serverUrl + "/assessment/categories/list");
  }

  listActive(){
    return this.http.get(this.serverUrl + "listActive");//to be changed 
  }

  edit(id:number, categoryOwner:string, skillCategory:string, isActive:boolean){
    const params = { "categoryId":id,
                     "skillCategory":skillCategory,
                     "categoryOwner":categoryOwner,
                     "active": isActive};
    return this.http.put(this.serverUrl + "update", params);
  }

  disable(id:number, skillCategory:string, categoryOwner:string){
    console.log(id);
    const params = { "categoryId":id,
                     "skillCategory":skillCategory,
                     "categoryOwner":categoryOwner,
                     "active": false};
    return this.http.put(this.serverUrl + "/assessment/categories/update", params);
  }

  enable(id:number, skillCategory:string, categoryOwner:string){
    console.log(id);
    const params = { "categoryId":id,
                     "skillCategory":skillCategory,
                     "categoryOwner":categoryOwner,
                     "active": true};
    return this.http.put(this.serverUrl + "/assessment/categories/update", params);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../Models/Category';
import {environment} from 'src/environments/environment';
// import { Category } from "../Models/Category";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
/**
 * This needs to be refactored such that there is only one category service
 *
 * For now I have made the needed changes to make this service function in the
 * cloud environment as well but in the future will be removing this file
 */
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  url = environment.serverRootURL + '/category';

  getCategories(): Observable<[Category]> {
    return this.http.get<[Category]>(`${this.url}`, httpOptions);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.url}/${id}`, httpOptions);
  }

  getActiveCatgories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.category.active, httpOptions);
  }
}

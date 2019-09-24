import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../../domain/model/category.dto";
import {environment} from "../../../../environments/environment";

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient
  ) {}

  getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.active);
  }

  getInactiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.inactive);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api.categories.all);
  }

  getCategoriesById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(environment.api.categories.byId(categoryId));
  }

  enable(category: Category): Observable<Category> {
    category.active = true;
    return this.http.put<Category>(environment.api.categories.byId(category.categoryId), category);
  }

  disable(category: Category): Observable<Category> {
    category.active = false;
    return this.http.put<Category>(environment.api.categories.byId(category.categoryId), category);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api.categories.all, category);
  }

  update(category: Category): Observable<Category> {
    return this.http.put<Category>(environment.api.categories.byId(category.categoryId), category);
  }
}

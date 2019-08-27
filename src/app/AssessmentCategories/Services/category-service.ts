import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serverUrl = environment.serverRootURL + '/category';

  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get(`${this.serverUrl}/all`);
  }

  listActive() {
    return this.http.get(`${this.serverUrl}/all?active=true`);
  }

  edit(
    id: number,
    categoryOwner: string,
    skillCategory: string,
    isActive: boolean
  ) {
    const params = {
      categoryId: id,
      skillCategory: skillCategory,
      categoryOwner: categoryOwner,
      active: isActive
    };
    return this.http.put(
      `${this.serverUrl}/update`,
      params
    );
  }

  disable(id: number, skillCategory: string, categoryOwner: string) {
    const params = {
      categoryId: id,
      skillCategory,
      categoryOwner,
      active: false
    };
    return this.http.put(`${this.serverUrl}/update`, params);
  }

  enable(id: number, skillCategory: string, categoryOwner: string) {
    const params = {
      categoryId: id,
      skillCategory,
      categoryOwner,
      active: true
    };
    return this.http.put(
      `${this.serverUrl}/update`,
      params
    );
  }
}

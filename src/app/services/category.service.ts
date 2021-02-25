import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private BASE_URL = 'http://localhost:8080/categories'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.BASE_URL);
  }

  getByID(id): Observable<Category> {
    return this.httpClient.get<Category>(this.BASE_URL + "/" + id);
  }

  delete(id): Observable<Category> {
    return this.httpClient.delete<Category>(this.BASE_URL + "/" + id);
  }

  insert(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.BASE_URL, category);
  }

  update(id, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.BASE_URL + "/" + id, category);
  }
}

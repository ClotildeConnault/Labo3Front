import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = 'http://localhost:8080/products'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }

  getByID(id): Observable<Product> {
    return this.httpClient.get<Product>(this.BASE_URL + "/" + id);
  }

  delete(id): Observable<Product> {
    return this.httpClient.delete<Product>(this.BASE_URL + "/" + id);
  }

  insert(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.BASE_URL, product);
  }

  update(id, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.BASE_URL + "/" + id, product);
  }
}

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductPage } from '../models/productPage.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = 'http://localhost:8080/products'

  searching : boolean = false;
  listProduct : Product[] = []

  //sharedSearching = this.searching.asObservable();
  //sharedListProduct= this.listProduct.asObservable();
  
  /*nextSearching(searching : boolean){
    this.searching.next(searching);
  }

  nextListProduct(listProduct : Product[]){
    this.listProduct.next(listProduct);
  }*/

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }

  getWithPagination(page : number, size : number) : Observable<ProductPage>{
    return this.httpClient.get<ProductPage>(this.BASE_URL + "?page=" + page + "&size="+ size)
  }

  getByID(id): Observable<Product> {
    return this.httpClient.get<Product>(this.BASE_URL + "/" + id);
  }

  delete(id) {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }

  insert(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.BASE_URL, product);
  }

  update(id, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.BASE_URL + "/" + id, product);
  }

  searchByName(productName : String){
    return this.httpClient.post<Product[]>(this.BASE_URL + "/searchByName", productName);
  }

  search(product : Product){
    return this.httpClient.post<Product[]>(this.BASE_URL + "/search", product)
  }
}

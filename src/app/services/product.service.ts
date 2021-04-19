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

  searchingByNameBool : boolean = false;
  searchingByNameValue : string = ""

  searchingAdvancedBool : boolean = false;
  searchingAdvancedValue : Product = new Product()

  // productPage : ProductPage = new ProductPage();
  activatedPage : number = 0
  numberElementByPage : number = 10
  sortingField : string= ""
  sortingDirection : string = ""

  // searchingByNameBool : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // searchingByNameValue : BehaviorSubject<string> = new BehaviorSubject<string>("")

  // searchingAdvancedBool : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // searchingAdvancedValue : BehaviorSubject<Product> = new BehaviorSubject<Product>(new Product())

  productPage : BehaviorSubject<ProductPage> = new BehaviorSubject<ProductPage>(new ProductPage());
  // activatedPage : BehaviorSubject<number>=new BehaviorSubject<number>(0)
  // numberElementByPage : BehaviorSubject<number>= new BehaviorSubject<number>(10)
  // sortingField : BehaviorSubject<string> = new BehaviorSubject<string>("")
  // sortingDirection : BehaviorSubject<string> = new BehaviorSubject<string>("")

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

  getWithPagination(page : number, size : number, sortingFieldName : string, sortingDirection : string) : Observable<ProductPage>{
    return this.httpClient.get<ProductPage>(this.BASE_URL + "?page=" + page + "&size="+ size + "&sortingFieldName=" + sortingFieldName + "&sortingDirection=" + sortingDirection)
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

  searchByNameWithPagination(productName : String, activatedPage : number, numberElementByPage : number, sortingField : string, sortingDirection : string){
    return this.httpClient.post<ProductPage>(this.BASE_URL + "/searchByName?page="+ activatedPage +"&size="+ numberElementByPage +"&sortingFieldName="+ sortingField +"&sortingDirection=" + sortingDirection, productName);
  }

  searchWithPagination(product : Product, activatedPage : number, numberElementByPage : number, sortingField : string, sortingDirection : string){
    return this.httpClient.post<ProductPage>(this.BASE_URL + "/search?page="+ activatedPage +"&size="+ numberElementByPage +"&sortingFieldName="+ sortingField +"&sortingDirection=" + sortingDirection, product)
  }
}

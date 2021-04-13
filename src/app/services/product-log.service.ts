import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductLog } from '../models/productLog.model';

@Injectable({
  providedIn: 'root'
})
export class ProductLogService {

  private BASE_URL = 'http://localhost:8080/plogs'

  constructor(private httpClient: HttpClient) { }

  getAllLogs(): Observable<ProductLog[]> {
    return this.httpClient.get<ProductLog[]>(this.BASE_URL);
  }

  getLogsBySpecificProduct(id : number): Observable<ProductLog[]> {
    return this.httpClient.get<ProductLog[]>(this.BASE_URL + "/product/" + id);
  }

  getLogsBySpecificUser(id : number): Observable<ProductLog[]> {
    return this.httpClient.get<ProductLog[]>(this.BASE_URL + "/user/" + id);
  }

  insert(log: ProductLog): Observable<ProductLog> {
    return this.httpClient.post<ProductLog>(this.BASE_URL, log);
  }

}

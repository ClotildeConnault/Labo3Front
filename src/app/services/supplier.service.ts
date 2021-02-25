import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_URL = 'http://localhost:8080/suppliers'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.BASE_URL);
  }

  getByID(id): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.BASE_URL + "/" + id);
  }

  delete(id): Observable<Supplier> {
    return this.httpClient.delete<Supplier>(this.BASE_URL + "/" + id);
  }

  insert(supplier: Supplier): Observable<Supplier> {
    return this.httpClient.post<Supplier>(this.BASE_URL, supplier);
  }

  update(id, supplier: Supplier): Observable<Supplier> {
    return this.httpClient.put<Supplier>(this.BASE_URL + "/" + id, supplier);
  }
}

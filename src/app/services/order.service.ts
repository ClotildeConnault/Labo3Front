import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = 'https://laboback.herokuapp.com/orders'

  constructor(
    private httpClient : HttpClient,
    private router : Router
  ) { }

  getAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.BASE_URL);
  }

  getByID(id): Observable<Order> {
    return this.httpClient.get<Order>(this.BASE_URL + "/" + id);
  }

  delete(id): Observable<Order> {
    return this.httpClient.delete<Order>(this.BASE_URL + "/" + id);
  }

  insert(order: Order) {
    return this.httpClient.post<Order>(this.BASE_URL, order).subscribe({
      next : () => this.router.navigate(['']),
      error : (error) => console.log(error)
    })
  }

  update(id, order: Order): Observable<Order> {
    return this.httpClient.put<Order>(this.BASE_URL + "/" + id, order);
  }

  getbyClient(id) : Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.BASE_URL + "/" + id + "/orders")
  }
}

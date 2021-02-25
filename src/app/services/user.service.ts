import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = 'http://localhost:8080/products'

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.BASE_URL);
  }

  getByID(id): Observable<User> {
    return this.httpClient.get<User>(this.BASE_URL + "/" + id);
  }

  delete(id): Observable<User> {
    return this.httpClient.delete<User>(this.BASE_URL + "/" + id);
  }

  insert(user: User): Observable<User> {
    return this.httpClient.post<User>(this.BASE_URL, user);
  }

  update(id, user: User): Observable<User> {
    return this.httpClient.put<User>(this.BASE_URL + "/" + id, user);
  }
}

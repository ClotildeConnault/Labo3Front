import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginInfo } from '../models/logininfo.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url : string = "http://localhost:8080/products"

  currentUser : User;

  isConnected : boolean = false;

  conSub : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router : Router,
    private client : HttpClient
  ) { }

  emitStatus() {
    this.conSub.next(this.isConnected);
  }

  login(mail : string, pwd : string) {

    let user = new LoginInfo();
    user.email = mail;
    user.password = pwd;

    this.client.post<User>(this.url+"/auth", user).subscribe({
      next : (data : User) => {
        this.currentUser = data;
        this.isConnected = true;
        this.emitStatus();
        localStorage.setItem("role", this.currentUser.accessLevel.toString());
        localStorage.setItem("isConnected", 'ok');
      },
      error : error => {console.log("ça plante : " + error.message)}
    })




  }
}

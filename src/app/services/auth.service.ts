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

  private url : string = "http://localhost:8080"

  currentUser : User;

  isConnected : boolean = false;

  conSub : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router : Router,
    private client : HttpClient
  ) { }

  emitStatus() {
    this.conSub.next(this.isConnected);
    console.log("emitStatus");
  }

  public getIsConnected(): boolean {
    return this.isConnected;
    }

  login(pseudo : string, pwd : string) {

    let user = new LoginInfo();
    user.pseudo = pseudo;
    user.password = pwd;

    this.client.post<User>(this.url+"/users/auth", user).subscribe({
      next : (data : User) => {
        if(data !== null){
            this.currentUser = data;
            this.isConnected = true;
            this.emitStatus();
            localStorage.setItem("isConnected", 'ok');
        }

        this.emitStatus();

      },
      error : error => {console.log("ça plante : " + error.message)}
    })
  }

  logout() {
    this.currentUser=null;
    this.isConnected = false;
    this.emitStatus();
    localStorage.removeItem('isConnected');
  }

  getCurrentUser() : User {
    return this.currentUser
  }
}

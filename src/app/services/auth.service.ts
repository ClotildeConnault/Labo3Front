import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginInfo } from '../models/logininfo.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url : string = "http://localhost:8080"

  // currentUser : User;

  currentUser : BehaviorSubject<User> = new BehaviorSubject<User>(null);

  get _currentUser(): BehaviorSubject<User> {
    return this.currentUser;
  }

  isConnected : boolean = false;

  conSub : Subject<boolean> = new Subject<boolean>();

  constructor(
    private router : Router,
    private client : HttpClient,
    private service : UserService
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
    user.username = pseudo;
    user.password = pwd;

    // this.client.post<User>(this.url+"/users/login", user).subscribe({
    //   next : (data : User) => {
    //     if(data !== null){
    //         this.currentUser = data;
    //         this.isConnected = true;
    //         this.emitStatus();
    //         localStorage.setItem("isConnected", 'ok');
    //     }

    //     this.emitStatus();

    //   },
    //   error : error => {console.log("ça plante : " + error.message)}
    // })

    this.client.post(this.url + "/login", user, {observe: "response"}).subscribe(response => {
      localStorage.setItem("token", response.headers.get("Authorization").replace("Bearer ", ""));
      this.service.getUserConnected({"username":pseudo} as User).subscribe(u => {this._currentUser.next(u); this.router.navigate(['home']).then()})
    })
  }

  logout() {
    this._currentUser.next(null);
    this.isConnected = false;
    this.emitStatus();
    localStorage.removeItem('isConnected');
  }
}

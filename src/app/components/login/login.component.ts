import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isConnected : boolean;
  fg : FormGroup;
  status : Subscription; 

  constructor(
    private builder : FormBuilder,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.status = this.authService.conSub.subscribe((data : boolean) => this.isConnected = data);

    this.fg = this.builder.group({
      pseudo : ['', Validators.required],
      password : ['', Validators.required]
    })

    console.log("TEST onINIT" + this.isConnected);
  }

  onSubmit() {
    this.authService.login(this.fg.value['pseudo'], this.fg.value['password']);
    console.log("TEST onSUBMIT" + this.isConnected);
    
  }

  logout() {
    
    this.authService.logout();
    this.isConnected = false;
  
  }

  register() {
    this.router.navigate(['./home/register'])
    }

    ngOnDestroy() {
      this.status.unsubscribe();
      localStorage.clear();
    }
  }



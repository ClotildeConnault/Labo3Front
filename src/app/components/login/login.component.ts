import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isConnected : boolean;
  fg : FormGroup;

  constructor(
    private builder : FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.authService.conSub.subscribe((data : boolean) => this.isConnected = data);

    this.fg = this.builder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    })
  }

  onSubmit() {
    this.authService.login(this.fg.value['email'], this.fg.value['password']);
  }

  logout() {
    this.isConnected = false;
  }

  /*register() {
    let ref = this.dialogBox.open(RegisterComponent, {
      closeOnBackdropClick : false,
      closeOnEsc : false
    }) 
  }*/

}

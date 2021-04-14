import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  user : User;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    this.authService._currentUser.subscribe(u => {
      this.user = u;
    });
  }

}

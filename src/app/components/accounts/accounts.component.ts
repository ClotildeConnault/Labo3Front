import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  users : User[];

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe( u => {
      this.users = u;
    })
  }

}

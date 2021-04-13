import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessLevel, accessLevelLabelMapping, accessLevelMapping, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  users : User[];
  accessLevel = Object.values(AccessLevel).filter(value => typeof value === 'string');
  truc = accessLevelMapping;

  constructor(
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe( u => {
      this.users = u;
    })
  }

  updateAccessLevel(u : User) {
   
 
    console.log(u.accessLevel);


    if (u.accessLevel == "CUSTOMER" ) {
      u.accessLevel = "ADMINISTRATOR";
      
    } else {
      u.accessLevel = "CUSTOMER";
    }
  
    this.userService.update(u.id, u).subscribe({
      next : () => this.router.navigate(['/accounts']),
      error : (error) => console.log(error)
    });
    
  }

 

}

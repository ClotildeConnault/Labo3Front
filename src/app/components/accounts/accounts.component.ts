import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessLevel, accessLevelLabelMapping, accessLevelMapping, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe( u => {
      this.users = u;
    })
  }

  updateAccessLevel(u : User) {

    let user : User = ({"accessLevel":"","id":0} as User);
    user.id = u.id;

    if (u.accessLevel == "CUSTOMER" ) {
      user.accessLevel = "ADMINISTRATOR";
      
    } else {
      user.accessLevel = "CUSTOMER";
    }
  
    this.userService.update(user.id, user).subscribe({
      next : () => {
        if (user.id == this.authService._currentUser.value.id) {
          this.userService.getByID(user.id).subscribe(u => {this.authService._currentUser.next(u); this.authService.updateLocalStorage(u); this.router.navigate(['/home'])})
        } else {
          this.userService.getAll().subscribe(u => {
            this.users = u;
            this.router.navigate(['/accounts'])
          })
        }
      },
      error : (error) => console.log(error)
    });

    // console.log(u.accessLevel);

    // if (u.accessLevel == "CUSTOMER" ) {
    //   u.accessLevel = "ADMINISTRATOR";
      
    // } else {
    //   u.accessLevel = "CUSTOMER";
    // }
  
    // this.userService.update(u.id, u).subscribe({
    //   next : () => this.router.navigate(['/accounts']),
    //   error : (error) => console.log(error)
    // });
    
  }

 

}

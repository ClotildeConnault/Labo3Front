import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADDRESS_FORM_UPDATE, USER_FORM_UPDATE, checkPasswords } from 'src/app/forms/user-update.form';
import { accessLevelLabelMapping, AccessLevel, Address, User } from 'src/app/models/user.model';
import { UserRegister } from 'src/app/models/userRegister.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  //fg : FormGroup = new FormGroup(USER_FORM_UPDATE);
  fg : FormGroup;
  accessLevelLabelMapping =  accessLevelLabelMapping;
  accessLevel = Object.values(AccessLevel).filter(value => typeof value === 'number');
  accessLevelId : number;
  user : User;
  identical : string = "border border-dark";

  constructor(
    private userService : UserService,
    private authService : AuthService,
    private builder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {

    this.fg = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accessLevel : ['CUSTOMER', Validators.required],
      username : ['', Validators.required],
      password : this.builder.group({password : ['', Validators.required],
                              confirmPassword : ['', Validators.required]}, {validator : checkPasswords}),
      address : new FormGroup(ADDRESS_FORM_UPDATE)
      })
    




    console.log("ONINIT")
    this.authService.currentUser.subscribe(u => {
      this.user = u;
      console.log("TEST" + u);
      this.accessLevelId = (Object.keys(AccessLevel).indexOf(this.user.accessLevel.toString()) -1) /2;
    })
    
  }

  onSubmit() {
    let values = this.fg.value;
    let addressValues = values['address'];
    let passwordValues = values['password'];
    let address = new Address;
    address.city = addressValues['city'];
    address.country = addressValues['country'];
    address.number = addressValues['number'];
    address.street = addressValues['street'];
    address.zipCode = addressValues['zipcode'];
    let user = new User();
    user.firstName = values['firstName'];
    user.lastName = values['lastName'];
    user.accessLevel = this.user.accessLevel;
    user.username = values['username'];
    user.address = address;

    if(this.fg.get('password').invalid) {
      console.log("INVALID");
      this.identical = "border border-danger";
    }

    user.password = passwordValues['password'];
    console.log("LA" + JSON.stringify(user));
        this.userService.update(this.user.id, user).subscribe({
              next : () => this.router.navigate(['/user']),
              error : (error) => console.log(error)
            });

    // if(values['password'] !== null) {
    //   if(values['password'] !== this.confPassword) {
    //     C
    //   } else {
    //     user.password = values['password'];
    //     this.userService.update(this.user.id, user).subscribe({
    //           next : () => this.router.navigate(['/user']),
    //           error : (error) => console.log(error)
    //         });
    //   }
     
    // } else {
    //   user.password = this.user.password;
    //   this.userService.update(this.user.id, user).subscribe({
    //     next : () => this.router.navigate(['/user']),
    //     error : (error) => console.log(error)
    //   });
    // }

    
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { USER_FORM_CREATE } from 'src/app/forms/user.form';
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

  fg : FormGroup = new FormGroup(USER_FORM_CREATE);
  accessLevelLabelMapping =  accessLevelLabelMapping;
  accessLevel = Object.values(AccessLevel).filter(value => typeof value === 'number');
  accessLevelId : number;
  user : User;

  constructor(
    private userService : UserService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService._currentUser.value;
    this.accessLevelId = (Object.keys(AccessLevel).indexOf(this.user.accessLevel.toString()) -1) /2;
  }

  onSubmit() {
    let values = this.fg.value;
    let addressValues = values['address'];
    let address = new Address;
    address.city = addressValues['city'];
    address.country = addressValues['country'];
    address.number = addressValues['number'];
    address.street = addressValues['street'];
    address.zipCode = addressValues['zipcode'];
    let user = new User();
    user.firstName = values['firstName'];
    user.lastName = values['lastName'];
    user.accessLevel = values['accessLevel'];
    user.username = values['pseudo'];
    user.password = values['password'];
    user.address = address;
    this.userService.update(this.user.id, user);
  }

}

import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { USER_FORM_CREATE } from 'src/app/forms/user.form';
import { AccessLevel, accessLevelLabelMapping, Address} from 'src/app/models/user.model';
import { UserRegister } from 'src/app/models/userRegister.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fg : FormGroup = new FormGroup(USER_FORM_CREATE);
  accessLevelLabelMapping =  accessLevelLabelMapping;
  accessLevel = Object.values(AccessLevel).filter(value => typeof value === 'number');


  constructor(
    private builder : FormBuilder,
    private userService : UserService,
    private router : Router
  ) { }

  ngOnInit(): void {
    /*this.fg = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accessLevel : ['', Validators.required],
      pseudo : ['', Validators.required],
      password : ['', [Validators.required]],
      address : this.builder.group({
        street : new FormControl('', Validators.required),
        number : new FormControl('', Validators.required),
        zipcode : new FormControl('', Validators.required),
        city : new FormControl('', Validators.required),
        country : new FormControl('', Validators.required)
      })
    })*/


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
    let userRegister = new UserRegister();
    userRegister.firstName = values['firstName'];
    userRegister.lastName = values['lastName'];
    userRegister.accessLevel = values['accessLevel'];
    userRegister.pseudo = values['pseudo'];
    userRegister.password = values['password'];
    userRegister.address = address;
    this.userService.insert(userRegister);
console.log(JSON.stringify(userRegister));
this.router.navigate(['']);
  }

  

}



import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccessLevel, accessLevelLabelMapping} from 'src/app/models/user.model';
import { UserRegister } from 'src/app/models/userRegister.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  fg : FormGroup;
  accessLevelLabelMapping =  accessLevelLabelMapping;
  accessLevel = Object.values(AccessLevel).filter(value => typeof value === 'number');


  constructor(
    private builder : FormBuilder,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.fg = this.builder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accessLevel : ['', Validators.required],
      pseudo : ['', Validators.required],
      password : ['', Validators.required] ,
      address : this.builder.array([
        {
          rue : new FormControl,
          ville : new FormControl
        }
      ])
    })


  }



  onSubmit() {
    let values = this.fg.value;
    let userRegister = new UserRegister();
    userRegister.firstName = values['firstName'];
    userRegister.lastName = values['lastName'];
    userRegister.accessLevel = values['accessLevel'];
    userRegister.pseudo = values['pseudo'];
    userRegister.password = values['password'];
    //userRegister.address = values['address'];
    this.userService.insert(userRegister);
console.log(JSON.stringify(userRegister));
  }

}





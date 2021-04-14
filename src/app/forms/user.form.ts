import { FormControl, FormGroup, Validators } from "@angular/forms"
import { AccessLevel } from "../models/user.model"
import { CheckPasswordValidatorDirective } from "../util/check-password-validator.directive"
import { FormGroupDef } from "./product.form"

  export const ADDRESS_FORM_CREATE: FormGroupDef = {
    street : new FormControl('', Validators.required),
    number : new FormControl('', Validators.required),
    zipcode : new FormControl('', Validators.required),
    city : new FormControl('', Validators.required),
    country : new FormControl('', Validators.required)
  }

  export const USER_FORM_CREATE: FormGroupDef = {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    accessLevel : new FormControl('CUSTOMER', Validators.required),
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    address : new FormGroup(ADDRESS_FORM_CREATE)
  }

  export const USER_FORM_UPDATE: FormGroupDef = {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    accessLevel : new FormControl('CUSTOMER', Validators.required),
    username : new FormControl('', Validators.required),
    password : new FormGroup({password : new FormControl('', Validators.required),
                            confirmPassword : new FormControl('', Validators.required)},checkPasswords),
    address : new FormGroup(ADDRESS_FORM_CREATE)
  }

  export function checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : { notSame: true }  
  }

     


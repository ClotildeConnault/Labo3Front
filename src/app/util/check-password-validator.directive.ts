import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appCheckPasswordValidator]'
})
export class CheckPasswordValidatorDirective implements Validator {

  constructor() { }


  validate(form : FormGroup): ValidationErrors {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;
    let error = null;

    error = password === confirmPassword ? null : "Les deux mots de passe ne sont pas identiques"; 

    return error? error : null;
  }
 

}

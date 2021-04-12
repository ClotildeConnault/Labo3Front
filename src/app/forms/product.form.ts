import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';

export type FormGroupDef = {[key: string]: AbstractControl};

export class CustomValidators {
    static dateMinimum(date: string): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value == null) {
          return null;
        }
  
        const controlDate = moment(control.value);
  
        if (!controlDate.isValid()) {
          return null;
        }
  
        const validationDate = moment(date).subtract(1,'days');
  
        return controlDate.isAfter(validationDate) ? null : {
          'date-minimum': {
            'date-minimum': validationDate,
            'actual': controlDate
          }
        };
      };
    }
  }

export const PRODUCT_FORM_CREATE: FormGroupDef = {
    name: new FormControl("", [ Validators.required ]),
    description: new FormControl("", [ Validators.required ]),
    insertDate: new FormControl(null),
    updateDate: new FormControl(null),
    expirationDate: new FormControl(null, [Validators.required, CustomValidators.dateMinimum(moment().toString())]),
    price: new FormControl(0, [Validators.min(0.01)]),
    quantity: new FormControl(0, [Validators.min(0)]),
    imagePath: new FormControl(null),
    tva: new FormControl(null, [Validators.required]),
    categories: new FormControl(0, [Validators.required, Validators.min(1)]),
    supplier: new FormControl(0, [Validators.required, Validators.min(1)]),
}


 
  
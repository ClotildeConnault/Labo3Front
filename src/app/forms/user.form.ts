import { FormControl, FormGroup, Validators } from "@angular/forms"
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
    accessLevel : new FormControl('', Validators.required),
    pseudo : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    address : new FormGroup(ADDRESS_FORM_CREATE)
  }

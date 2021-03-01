import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type FormGroupDef = {[key: string]: AbstractControl};

export const SUPPLIER_FORM_CREATE: FormGroupDef = {
    companyName: new FormControl("", [ Validators.required ]),
    statut: new FormControl(null),
    sector: new FormControl(null),
    insertionDate: new FormControl(null),
    updateDate: new FormControl(null),
}
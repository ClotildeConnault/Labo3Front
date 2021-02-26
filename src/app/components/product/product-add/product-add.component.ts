import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PRODUCT_FORM_CREATE } from 'src/app/forms/product.form';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  form_product = new FormGroup(PRODUCT_FORM_CREATE);

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  return() {
    
  }

}

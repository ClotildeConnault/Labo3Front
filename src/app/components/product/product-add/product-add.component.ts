import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PRODUCT_FORM_CREATE } from 'src/app/forms/product.form';
import { Category } from 'src/app/models/category.model';
import { Supplier } from 'src/app/models/supplier.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  form_product = new FormGroup(PRODUCT_FORM_CREATE);

  suppliers$: Observable<Supplier[]>;
  categories$: Observable<Category[]>;
  suppltab: Array<Supplier>;
  cattab: Array<Category>;

  constructor(private service : ProductService, private supplServ : SupplierService, private catServ : CategoryService) { }

  ngOnInit(): void {
    this.suppliers$ = this.supplServ.getAll();
    this.categories$ = this.catServ.getAll()
    this.supplServ.getAll().subscribe(x => this.suppltab = x);
    this.catServ.getAll().subscribe(x => this.cattab = x);
  }

  onSubmit() {

  }

  return() {
    
  }

}

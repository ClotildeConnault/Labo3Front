import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PRODUCT_FORM_CREATE } from 'src/app/forms/product.form';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
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
  product: Product;
  categories: Array<Category> = [];

  constructor(private service : ProductService, private supplServ : SupplierService, private catServ : CategoryService, private router : Router) { }

  ngOnInit(): void {
    this.suppliers$ = this.supplServ.getAll();
    this.categories$ = this.catServ.getAll()
    this.supplServ.getAll().subscribe(x => this.suppltab = x);
    this.catServ.getAll().subscribe(x => this.cattab = x);
  }

  onSubmit() {
    const form = this.form_product;
    if(form.valid){
      this.product = form.value;

      /**
       * Transformation de la date pour la DB
       */

      this.product.expirationDate = new Date(form.get('expirationDate').value);

      /**
       * Imputation du taux de TVA
       */

      this.product.tva = Number(form.get('tva').value);

      /**
       * Récupération du fournisseur et de la catégorie
       */

      for(let i = 0; i < this.suppltab.length; i++) {
        if(this.suppltab[i].id == form.get('supplier').value) {
          this.product.supplier = this.suppltab[i];
        }
      }

      for(let i = 0; i < this.cattab.length; i++) {
        if(this.cattab[i].id == form.get('categories').value) {
          this.categories.push(this.cattab[i]);
        }
      }
      this.product.categories = this.categories;
      
      console.log(this.product);
      this.service.insert(this.product).subscribe();
      this.form_product.reset();
      this.router.navigate(['products']);
    } else {
      alert("Un ou plusieurs champs sont invalides. Recommencez");
    }
  }

}

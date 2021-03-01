import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PRODUCT_FORM_CREATE } from 'src/app/forms/product.form';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Supplier } from 'src/app/models/supplier.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  form_product = new FormGroup(PRODUCT_FORM_CREATE);

  suppliers$: Observable<Supplier[]>;
  categories$: Observable<Category[]>;
  suppltab: Array<Supplier>;
  cattab: Array<Category>;
  product: Product;
  productUpdate: Product;
  categories: Array<Category> = [];

  constructor(private service : ProductService, private supplServ : SupplierService, private catServ : CategoryService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    this.service.getByID(id).subscribe(
      product => {this.product = product}
    )

    this.suppliers$ = this.supplServ.getAll();
    this.categories$ = this.catServ.getAll()
    this.supplServ.getAll().subscribe(x => this.suppltab = x);
    this.catServ.getAll().subscribe(x => this.cattab = x);
  }

  onUpdate() {
    const form = this.form_product;
    if(form.valid){
      this.productUpdate = form.value;

      this.productUpdate.insertDate = this.product.insertDate;

      /**
       * Transformation de la date pour la DB
       */

      this.productUpdate.expirationDate = new Date(form.get('expirationDate').value);

      /**
       * Imputation du taux de TVA
       */

      this.productUpdate.tva = Number(form.get('tva').value);

      /**
       * Récupération du fournisseur
       */

      for(let i = 0; i < this.suppltab.length; i++) {
        if(this.suppltab[i].id == form.get('supplier').value) {
          this.productUpdate.supplier = this.suppltab[i];
        }
      }

      /**
       * Récupération des catégories
       */

      for(let i = 0; i < this.cattab.length; i++) {
        form.get('categories').value.forEach(element => {
          if(this.cattab[i].id == element) {
            this.categories.push(this.cattab[i]);
          }
        });     
      }
      this.productUpdate.categories = this.categories;
      
      //console.log(this.product);
      this.service.update(this.product.id, this.productUpdate).subscribe();
      this.form_product.reset();
      this.router.navigate(['products']);
    } else {
      alert("Un ou plusieurs champs sont invalides. Recommencez");
    }
  }

}

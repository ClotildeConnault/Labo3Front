import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PRODUCT_FORM_CREATE } from 'src/app/forms/product.form';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductLog } from 'src/app/models/productLog.model';
import { Supplier } from 'src/app/models/supplier.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductLogService } from 'src/app/services/product-log.service';
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
  expirationDateString : string
  productUpdate: Product;
  log: ProductLog = new ProductLog;
  categories: Array<Category> = [];

  productLogOld : string;

  constructor(
    private service : ProductService,
    private supplServ : SupplierService,
    private catServ : CategoryService,
    private logServ : ProductLogService,
    private authServ : AuthService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    this.service.getByID(id).subscribe(
      product => {this.product = product; this.productLogOld = JSON.stringify(product); this.expirationDateString=this.product.expirationDate.toString().substring(0,10)}
      
    )

    this.suppliers$ = this.supplServ.getAll();
    this.categories$ = this.catServ.getAll()
    this.supplServ.getAll().subscribe(x => this.suppltab = x);
    this.catServ.getAll().subscribe(x => this.cattab = x);

    
  }

  onUpdate() {
    const form = this.form_product;
    if (form.pristine){
      alert ("Vous n'avez rien modifié pour ce produit")
    }
    else if(form.valid){
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

      // Création du log d'historique du produit
      this.log.productId = this.product.id;
      let productLogNew : Product = this.productUpdate;
      productLogNew.supplier.products = null;
      this.log.oldProduct = this.productLogOld;
      this.log.newProduct = JSON.stringify(productLogNew);
      this.log.userId = this.authServ._currentUser.value.id;
      this.logServ.insert(this.log).subscribe();
      
      //console.log(this.product);
      this.service.update(this.product.id, this.productUpdate).subscribe();


      this.form_product.reset();
      this.router.navigate(['products']);
    } else {
      alert("Un ou plusieurs champs sont invalides. Recommencez");
    }
  }

}

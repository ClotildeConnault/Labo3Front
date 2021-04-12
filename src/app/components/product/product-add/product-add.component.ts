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

  //Message d'erreur : boolean
  nameError : boolean = false
  descriptionError : boolean = false
  expirationDateError : boolean = false
  priceError : boolean = false;
  quantityError : boolean = false;
  tvaError : boolean = false;
  fournisseurError : boolean = false;
  categorieError : boolean = false;


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
       * Récupération du fournisseur
       */

      for(let i = 0; i < this.suppltab.length; i++) {
        if(this.suppltab[i].id == form.get('supplier').value) {
          this.product.supplier = this.suppltab[i];
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
      this.product.categories = this.categories;
      
      //console.log(this.product);
      this.service.insert(this.product).subscribe();
      this.form_product.reset();
      this.router.navigate(['products']);
    } else {
      this.blur("name")
      this.blur("description")
      this.blur("expirationDate")
      this.blur("price")
      this.blur("quantity")
      this.blur("tva")
      this.blur("supplier")
      this.blur("categories")
  
      // this.nameError=document.getElementById("name").classList.contains("ng-invalid")
      // this.descriptionError=document.getElementById("description").classList.contains("ng-invalid")
      // this.expirationDateError=document.getElementById("expirationDate").classList.contains("ng-invalid")
      // this.priceError=document.getElementById("price").classList.contains("ng-invalid")
      // this.quantityError=document.getElementById("quantity").classList.contains("ng-invalid")
      // this.tvaError=document.getElementById("tva").classList.contains("ng-invalid")
      // this.fournisseurError=document.getElementById("supplier").classList.contains("ng-invalid")
      // this.categorieError=document.getElementById("categories").classList.contains("ng-invalid")
      alert("Un ou plusieurs champs sont invalides (marqué en rouge). Recommencez");
    }
  }

  blur(inputName : string){
    const input = document.getElementById(inputName)
    if (input.classList.contains("ng-invalid")){
      input.classList.add("invalidInput")
      switch (inputName){
        case "name":
          this.nameError=true;
          break;
        case "description":
          this.descriptionError=true;
          break;
        case "expirationDate":
          this.expirationDateError=true;
          break;
        case "price":
          this.priceError=true;
          break;
        case "quantity":
          this.quantityError=true;
          break;
        case "tva":
          this.tvaError=true;
          break;
        case "supplier":
          this.fournisseurError=true;
          break;
        case "categories":
          this.categorieError=true

      }
    }
  }

  change(inputName: string){
    const input = document.getElementById(inputName)
    if(input.classList.contains("ng-valid")){
      input.classList.remove("invalidInput")
      switch (inputName){
        case "name":
          this.nameError=false;
          break;
        case "description":
          this.descriptionError=false;
          break;
        case "expirationDate":
          this.expirationDateError=false;
          break;
        case "price":
          this.priceError=false;
          break;
        case "quantity":
          this.quantityError=false;
          break;
        case "tva":
          this.tvaError=false;
          break;
        case "supplier":
          this.fournisseurError=false;
          break;
        case "categories":
          this.categorieError=false
      }
    }
  }
}

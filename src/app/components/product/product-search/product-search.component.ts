import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  searchForm : FormGroup

  constructor(private builder : FormBuilder,
    private productService : ProductService,
    private router : Router) { }

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      name : new FormControl(""),
      description : new FormControl(""),
      expirationDate : new FormControl(""),
      price : new FormControl("", Validators.min(0.01)),
      quantity : new FormControl("", Validators.min(1))
    })
  }

  search(){
    
    if(this.searchForm.valid){
      let product : Product = this.searchForm.value
      //2021-03-03T12:24:07Z 
      product.expirationDate = new Date(this.searchForm.get('expirationDate').value)

      this.productService.searchingByNameBool=false;
      this.productService.searchingByNameValue="";
      this.productService.searchingAdvancedBool=true;
      this.productService.searchingAdvancedValue=product;
      this.productService.activatedPage=0;  

      this.router.navigateByUrl("/products");
    }      
  }


}

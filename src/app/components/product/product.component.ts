import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  searching : boolean
  products$ : Observable<Product[]>;
  navigationSubscription;

  constructor(
    private productService : ProductService,
    private router : Router
    ) { 
      this.navigationSubscription = this.router.events.subscribe(
        (e:any) => {if (e instanceof NavigationEnd) {
          this.initialize();
        }}
        )
    }

  ngOnInit(): void {
    this.productService.searchingSubscriber$.subscribe(searching => {
      if (searching){
        this.productService.searchValueSubscriber$.subscribe(searchValue => {this.products$ = this.productService.searchByName(searchValue)})
      }else{
        this.products$ = this.productService.getAll()
      }    
    })
    
    
  }

  initialize() {
    this.products$ = this.productService.getAll();
  }

  onClick(id : number) {
    console.log(id);
    this.productService.delete(id);
    this.initialize();
    this.router.navigate(['/products']);
    
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
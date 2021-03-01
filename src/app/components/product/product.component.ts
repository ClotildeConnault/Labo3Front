import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isShow : boolean;
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
            this.products$=this.productService.listProductSubscriber$
            this.products$.subscribe(v => console.log(v))
          }else{
          this.products$ = this.productService.getAll()
        }    
      })
    
    
    
  }

  initialize() {
    console.log("INITIALIZE");
    this.products$ = this.productService.getAll();
  }

  onClick(id : number) {
    this.productService.delete(id);
    this.initialize();
    this.router.navigate(['/products']);
    
  }

  details(id) {
    this.router.navigate(['products/detail/' + id]);
    this.gotoTop();
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = document.documentElement.scrollTop;

    if (scrollPosition >= 100){
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

}
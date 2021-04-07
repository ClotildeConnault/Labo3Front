import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductPage } from 'src/app/models/productPage.model';
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
  searching : boolean;
  products : Product[];
  productPage : ProductPage = new ProductPage();
  numberPage : Number[] = [];
  pageLoaded: number;
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
       console.log("init")
      this.searching=this.productService.searching
      if (this.searching){
        this.productPage.content=this.productService.listProduct
      }else{
        this.productService.getWithPagination(0,10).subscribe(data => {
        this.productPage=data;
        this.products=this.productPage.content;
        this.pageLoaded=this.productPage.pageable.pageNumber
        this.numberPage=[];
          for (let index = 1; index <= this.productPage.totalPages; index++) {
            this.numberPage.push(index)      
          }   
        })
      }
    
  }

  

    
  
    
    /*this.productService.searchingSubscriber$.subscribe(searching => {
        if (searching){
          console.log("hello")
            this.productService.listProductSubscriber$.subscribe(data => this.products=data)
          
          }else{
            console.log("coucou")
            this.productService.getWithPagination(0,10).subscribe(data => {
              this.productPage=data;
              this.pageLoaded=this.productPage.pageable.pageNumber
             for (let index = 1; index <= this.productPage.totalPages; index++) {
                this.numberPage.push(index)      
              }   
            })
         // console.log(this.products)
        }    
      })   
    }*/

  initialize() {
    this.numberPage = []
    for (let index = 1; index <= this.productPage.totalPages; index++) {
      this.numberPage.push(index)      
      }  
      
      this.searching=this.productService.searching
      if (this.searching){
        this.productPage.content=this.productService.listProduct
      }else{
        this.productService.getWithPagination(0,10).subscribe(data => {
        this.productPage=data;
        this.products=this.productPage.content;
        this.pageLoaded=this.productPage.pageable.pageNumber
        this.numberPage=[];
          for (let index = 1; index <= this.productPage.totalPages; index++) {
            this.numberPage.push(index)      
          }   
        })
      }
     
  }
    
    /*this.productService.getWithPagination(this.pageLoaded,10).subscribe(data => {
      console.log(data)
      //this.productPage=data;
    })
    //this.productService.searchingSubscriber$.subscribe(searching => {
      
     if (searching){
        console.log("searching : true")
          this.productService.listProductSubscriber$.subscribe(data => this.products=data)
        
        }else{
          console.log("searching : false")
        this.productService.getWithPagination(0,10).subscribe(data => this.productPage=data)
        this.products = this.productPage.content
       // console.log(this.products)
      }    
    })
  // this.productService.getAll().subscribe(data => this.products=data);*/
  

  onDelete(id : number) {
    this.productService.delete(id).subscribe(
      () => {
        this.productService.getWithPagination(this.pageLoaded,10).subscribe(data => {
          console.log(data);
          this.productPage=data; 
          this.numberPage=[];
            for (let index = 1; index <= this.productPage.totalPages; index++) {
              this.numberPage.push(index);     
            }
          if (this.pageLoaded >= this.productPage.totalPages) {
            this.pageLoaded = this.productPage.totalPages-1;
            this.navigateTo(this.pageLoaded);
          }
        })
      })
  };
    /*this.productService.delete(id).subscribe(
      data => {console.log("success", data);
      this.initialize();
      this.router.navigate(['/products'])},
      error => console.error("couldn't delete because, error")
    );*/
    
    
  

  details(id) {
    this.router.navigate(['products/detail/' + id]);
    //this.gotoTop();
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

  navigateTo(index : number){
    this.productService.getWithPagination(index,10).subscribe(data => {
      console.log(index)
      this.productPage=data;
      this.pageLoaded=this.productPage.pageable.pageNumber
    })
  }

}
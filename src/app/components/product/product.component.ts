import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductPage } from 'src/app/models/productPage.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  user : User;

  isShow : boolean;
  numberPage : number[] = [];
  navigationSubscription;

  // searchingByNameBool : boolean = false;
  // searchingByNameValue : string = ""

  // searchingAdvancedBool : boolean = false;
  // searchingAdvancedValue : Product = new Product()

  productPage : ProductPage = new ProductPage();
  // activatedPage : number = 0
  // numberElementByPage : number = 10
  // sortingField : string= ""
  // sortingDirection : string = ""


  constructor(
    private _productService : ProductService,
    private router : Router,
    private authService : AuthService
    ) { 
      this.navigationSubscription = this.router.events.subscribe(
        (e:any) => {if (e instanceof NavigationEnd) {
          this.initialize();
        }}
        )
    }

    get productService(): ProductService{
      return this._productService;
    }

  ngOnInit(): void {
      this.user = this.authService._currentUser.value;

      
      if (this._productService.searchingByNameBool){
        this._productService.searchByNameWithPagination(this._productService.searchingByNameValue, this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => 
          {this._productService.productPage.next(pp)
          })
      }else if(this._productService.searchingAdvancedBool){
        this._productService.searchWithPagination(this._productService.searchingAdvancedValue, this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => 
          {this._productService.productPage.next(pp)
          })
      }else{
        this._productService.getWithPagination(this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => {
          this._productService.productPage.next(pp)
        })
      }
      this._productService.productPage.subscribe(pp => {
        this.productPage=pp;
        this.numberPage=[];
        for (let index = 1; index <= this.productPage.totalPages; index++) {
          this.numberPage.push(index)      
        } 
      })
      
                
      // this.searching=this.productService.searching
      // if (this.searching){
      //   this.productPage.content=this.productService.listProduct
      // }else{
      //   this.productService.getWithPagination(0,10,this.sortingFieldName,this.sortingDirection).subscribe(data => {
      //   this.productPage=data;
      //   this.products=this.productPage.content;
      //   this.pageLoaded=this.productPage.pageable.pageNumber
      //   this.numberPage=[];
      //     for (let index = 1; index <= this.productPage.totalPages; index++) {
      //       this.numberPage.push(index)      
      //     }   
      //   })
      // }
    
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
    if (this._productService.searchingByNameBool){
      this._productService.searchByNameWithPagination(this._productService.searchingByNameValue, this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => 
        {this._productService.productPage.next(pp)
      })
    }else if(this._productService.searchingAdvancedBool){
      this._productService.searchWithPagination(this._productService.searchingAdvancedValue, this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => 
        {this._productService.productPage.next(pp)
      })
    }else{
      this._productService.getWithPagination(this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => {
        this._productService.productPage.next(pp)
      })
    }
    this._productService.productPage.subscribe(pp => {
      this.productPage=pp;
      this.numberPage=[];
      for (let index = 1; index <= this.productPage.totalPages; index++) {
        this.numberPage.push(index)      
      } 
    })
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
    this._productService.delete(id).subscribe(
      () => {
        if (this._productService.searchingByNameBool){
          this._productService.searchByNameWithPagination(this._productService.searchingByNameValue, this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => {
            this.productPage=pp;
            this.numberPage=[];
            if (this.productPage.totalPages > 0){
              for (let index = 1; index <= this.productPage.totalPages; index++) {
                this.numberPage.push(index)      
              } 
              if (this._productService.activatedPage >= this.productPage.totalPages) {
                this._productService.activatedPage = this.productPage.totalPages-1;
                this.navigateTo(this._productService.activatedPage);
              }
            }
          })
        }else{
          this._productService.getWithPagination(this._productService.activatedPage, this._productService.numberElementByPage, this._productService.sortingField, this._productService.sortingDirection).subscribe(pp => {
            this.productPage=pp;
            this.numberPage=[];
            if (this.productPage.totalPages > 0){
              for (let index = 1; index <= this.productPage.totalPages; index++) {
                this.numberPage.push(index)      
              } 
              if (this._productService.activatedPage >= this.productPage.totalPages) {
                this._productService.activatedPage = this.productPage.totalPages-1;
                this.navigateTo(this._productService.activatedPage);
              }
            }            
          })
        }
    })
  }

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

  historic(id) {
    this.router.navigate(['plog/product/' + id]);
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
    this._productService.activatedPage=index;
    this.initialize();
  }

  sorted(field : string, direction : string){
    this._productService.sortingField=field;
    this._productService.sortingDirection=direction;
    this.initialize();
  }

}
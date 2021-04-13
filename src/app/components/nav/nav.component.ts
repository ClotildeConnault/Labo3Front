import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccessLevel, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild("navitem")

  user : User;

  adminConnected : boolean;
  isConnected : boolean;
  status : Subscription;
  searchForm : FormGroup;
  menuItems : MenuItem[] 
  
  constructor(
    private productService : ProductService,
    private builder : FormBuilder,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

    let items : MenuItem[] = [
      {title: "Nos produits", path : "/products", adminAccess: false},
      {title: "Les fournisseurs", path : "/suppliers", adminAccess: true},
      {title: "Comptes", path : "/accounts", adminAccess: true}
    ]

    this.status = this.authService.conSub.subscribe((data : boolean) => {
      this.isConnected = data;
    });

    this.authService._currentUser.subscribe(u => {
      this.user = u;
      this.adminConnected = this.user != null && this.user.accessLevel.toString() === 'ADMINISTRATOR' ? true : false;
      if (!this.adminConnected) {
       this.menuItems =  items.filter(i => i.adminAccess !== true);
       console.table(this.menuItems);
      } else {
        this.menuItems = items;
        console.table(this.menuItems);
      }
    });

    this.searchForm = this.builder.group({
      search : new FormControl("", Validators.required)
    })
    this.productService.searching = false;
    
  }


  search(){
   
    if (this.searchForm.valid){      
      this.productService.searching = true;
      const searchName = this.searchForm.value['search'];
      this.productService.searchByName(searchName).subscribe(pl => {
        this.productService.listProduct = pl;
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigateByUrl("/products");
      })
      
      //this.productService.emitSearchValue(searchName)
      
        
      } else {
        this.productService.searching=false;
        this.router.onSameUrlNavigation = 'reload'
        this.router.navigateByUrl("/products");
      }

    
  }

  productRefresh(){
    this.productService.searching = false;
    this.productService.listProduct = [];
    this.router.navigateByUrl("/products")
  }

}

export class MenuItem {
  title : string;
  path : string;
  adminAccess? : boolean;
}

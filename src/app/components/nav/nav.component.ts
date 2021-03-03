import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  isConnected : boolean;
  status : Subscription;
  searchForm : FormGroup;
  
  constructor(
    private productService : ProductService,
    private builder : FormBuilder,
    private router : Router,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      search : new FormControl("", Validators.required)
    })
    this.productService.nextSearching(false)

    this.status = this.authService.conSub.subscribe((data : boolean) => this.isConnected = data)
  }

  search(){
    if (this.searchForm.valid){      
      this.productService.nextSearching(true);
      const searchName = this.searchForm.value['search'];
      this.productService.searchByName(searchName).subscribe(pl => {
        this.productService.nextListProduct(pl)
      })
      
      //this.productService.emitSearchValue(searchName)
      
        this.router.navigateByUrl("/products");
      }

    
  }

  productRefresh(){
    this.productService.nextSearching(false)
    this.productService.nextListProduct([])
  }

}

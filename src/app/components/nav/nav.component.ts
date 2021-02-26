import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  searchForm : FormGroup;
  
  constructor(
    private productService : ProductService,
    private builder : FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      search : new FormControl("", Validators.required)
    })
    this.productService.emitSearching(false)
  }

  search(){
    if (this.searchForm.valid){      
      this.productService.emitSearching(true);
      const searchName = this.searchForm.value['search'];
      this.productService.emitSearchValue(searchName)
      this.router.navigateByUrl("/products");
    }
    
  }

}

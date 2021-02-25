import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product : Product;
  navigationSubscription;

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) { 
      this.navigationSubscription = this.router.events.subscribe(
        (e:any) => {if (e instanceof NavigationEnd) {
          this.initialize();
        }}
        )
    }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    console.log(id);

    this.productService.getByID(id).subscribe(
      product => {this.product = product}
    )
    
  };

  initialize() {
    let id = this.activatedRoute.snapshot.params['id'];
    this.productService.getByID(id).subscribe(
      product => {this.product = product}
    )
  }

}

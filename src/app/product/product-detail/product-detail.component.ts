import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  Product : Product;

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
  }

}

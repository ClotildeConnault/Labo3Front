import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  id : number;
  product : Observable<Product>;

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private router : Router
    ) { }

  ngOnInit(): void {
    //this.product = this.productService.getById(this.id);
  }

  initializeInvites() {
    this.activatedRoute.params.subscribe(
     // param => { this.productService.getById(param.id)}
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  products$ : Observable<Product[]>;
  cart : any[];
  cartSubscription : Subscription;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    // this.cartService.cartSub.subscribe(d => this.cart = d);
    this.cart = this.cartService.showCart();
  }

  refresh(){
    // this.cartService.cartSub.subscribe(d => this.cart = d);
    this.cart = this.cartService.showCart();
  }

  remove(product: Product){
    this.cartService.remove(product)
  }

  oneMore(product: Product){
    this.cartService.oneMore(product);
    this.refresh();
  }

  oneLess(product: Product){
    this.cartService.oneLess(product);
    this.refresh();
  }

}

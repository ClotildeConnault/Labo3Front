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
  cartPrice : number;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.showCart();
    this.cartPrice = this.cartService.totalPrice();
  }

  refresh(){
    this.cart = this.cartService.showCart();
    this.cartPrice = this.cartService.totalPrice();
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

  removeAll(){
    this.cartService.clearCart();
    this.refresh();
  }

  accept(){
    
  }

}

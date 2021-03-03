import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  cartExists : boolean;

  constructor(private cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.showCart();
    this.cartPrice = this.cartService.totalPrice();
    if(this.cartPrice > 0){
      this.cartExists = true;
    } else {
      this.cartExists = false;
    }
  }

  refresh(){
    this.cart = this.cartService.showCart();
    this.cartPrice = this.cartService.totalPrice();
    if(this.cartPrice > 0){
      this.cartExists = true;
    } else {
      this.cartExists = false;
    }
  }

  remove(product: Product){
    this.cartService.remove(product);
    this.refresh();
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
    if(this.cartService.totalPrice() > 0) {
      this.cartService.clearCart();
      this.refresh();
    } else {
      alert("Ce panier est déjà vide, arrêtez de vous acharner sur ce pauvre bouton...");
    }
  }

  accept(){
    if(this.cartService.totalPrice() > 0) {
      this.router.navigate(['validate']);
    } else {
      alert("Vous n'allez quand même pas valider un panier vide...");
    }
  }

}

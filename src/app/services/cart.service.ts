import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  completeCart = [];
  counter : number = 0;

  showCart(): any[] {
    return this.completeCart;
  }

  add(product: Product, quantity : number){
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        this.counter = 1;
      }
    });
    if(this.counter > 0) {
      alert("Ce produit se trouve déjà dans votre panier, changez plutôt sa quantité");
    } else {
      this.completeCart.push([product, quantity]);
    }
  }

  remove(product: Product){
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        this.completeCart.splice(this.counter,1);
      }
      this.counter++;
    });
  }

  changeQuantity(product: Product, quantity: number){
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        this.completeCart[this.counter][1] = quantity;
      }
      this.counter++;
    });
  }

  clearCart(){
    this.completeCart = [];
  }
}

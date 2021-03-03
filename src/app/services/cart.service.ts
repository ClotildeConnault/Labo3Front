import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  completeCart = [];
  counter : number = 0;
  cartPrice : number = 0;

  showCart(): any[] {
    return this.completeCart;
  }

  add(product: Product, quantity : number){
    if(this.alreadyInCart(product)) {
      alert("Ce produit se trouve déjà dans votre panier, passez par celui-ci pour changer sa quantité");
    } else if (quantity > product.quantity){
      alert("Quatité en stock insuffisante pour ce produit (en stock : " + product.quantity + ")")
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

  oneMore(product: Product){
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        if(product.quantity === data[1]) {
          alert("Le stock actuel ne permet pas de commander plus d'exemplaires de cet article")
        } else {
          this.completeCart[this.counter][1]++;
        }
      }
      this.counter++;
    });
  }

  oneLess(product: Product){
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        this.completeCart[this.counter][1]--;
        if (this.completeCart[this.counter][1] === 0){
          this.remove(product);
        }
      }
      this.counter++;
    });
  }

  alreadyInCart(product: Product): boolean{
    this.counter = 0;
    this.completeCart.forEach(data => {
      if(product === data[0]){
        this.counter = 1;
      }
    });
    if (this.counter>0){
      return true;
    } else {
      return false;
    }
  }

  totalPrice() : number{
    this.cartPrice = 0;
    this.completeCart.forEach(data => {
      this.cartPrice = this.cartPrice + (data[0].price * data[1]);
    });
    return Math.round(this.cartPrice * 100)/100;
  }

  clearCart(){
    this.completeCart = [];
  }
}

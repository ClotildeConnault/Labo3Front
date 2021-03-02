import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  products : Product[] = [];
  quantities : number[] = [];
  completeCart = [];
  counter : number = 0;

  showProducts(): Product[] {
    return this.products;
  }

  showQuantities(): number[] {
    return this.quantities;
  }

  showCart(): any[] {
    return this.completeCart;
  }

  add(product: Product, quantity : number){
    this.products.push(product);
    this.quantities.push(quantity);
    //Test tableau 2 éléments
    this.completeCart.push([product, quantity]);
  }

  remove(product: Product){
    this.counter = 0;
    this.products.forEach(data => {
      if(data === product){
        this.products.splice(this.counter);
        this.quantities.splice(this.counter);
        //Test tableau 2 éléments
        this.completeCart.splice(this.counter);
      }
      this.counter++;
    });
  }

  addQuantity(product: Product, quantity: number){
    this.counter = 0;
    this.products.forEach(data => {
      if(data === product){
        this.quantities[this.counter] = quantity;
        //Test tableau 2 éléments
        this.completeCart[this.counter,1] = quantity;
      }
      this.counter++;
    });
  }

  clearCart(){
    this.products = [];
    this.quantities = [];
    //Test tableau 2 éléments
    this.completeCart = [];
  }
}

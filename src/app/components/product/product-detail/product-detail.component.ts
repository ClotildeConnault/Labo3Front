import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Supplier } from 'src/app/models/supplier.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product : Product;
  supplier : Supplier;
  navigationSubscription;
  
  answer : any;
  number : number;

  constructor(
    private productService : ProductService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private cartService : CartService
    ) { 
      this.navigationSubscription = this.router.events.subscribe(
        (e:any) => {if (e instanceof NavigationEnd) {
          this.initialize();
        }}
        )
    }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

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

  ngOnDestroy() {
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }

  buy(productToBuy : Product){
    if (this.cartService.alreadyInCart(productToBuy)){
      alert("Ce produit se trouve déjà dans votre panier, passez par celui-ci pour changer sa quantité");
    } else {
      this.answer = prompt("Combien d'exemplaires?");
      if (isNaN(this.answer) || this.answer===null) {
        alert("Tu te fiches de moi? C'est pas un nombre, ça...");
      } else {
        this.number = parseInt(this.answer);
        if (this.number < 1){
          alert("Il me faut au moins un exemplaire...");
        } else {
          this.cartService.add(productToBuy, this.number);
          console.log(this.cartService.showCart());
        }
      }
    }
  }

}

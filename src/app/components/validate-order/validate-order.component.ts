import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order, PaymentMethod, PaymentMethodLabelMapping } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-validate-order',
  templateUrl: './validate-order.component.html',
  styleUrls: ['./validate-order.component.scss']
})
export class ValidateOrderComponent implements OnInit {

  
  cart = [];
  cartPrice : Number;
  form : FormGroup;

  PaymentMethodLabelMapping = PaymentMethodLabelMapping;
  paymentMethod = Object.values(PaymentMethod).filter(value => typeof value === 'number')

  constructor(private cartService : CartService,
    private orderService : OrderService,
    private productService : ProductService,
    private authService : AuthService,
    private builder : FormBuilder) { }

  ngOnInit(): void {
    this.cart = this.cartService.showCart();
    this.cartPrice=this.cartService.totalPrice();
    this.form=this.builder.group({
      paymentMethod : Validators.required
    })
  }

  onSubmit(){
    if (this.form.valid){
      let order  = new Order();
      order.user=this.authService.currentUser;
      if (order.user != null){
        order.paid = true;
        order.paymentMethod = this.form.value["paymentMethod"]
        for (let index = 0; index < this.cart.length; index++) {
          const product : Product = this.cart[index][0]
          order.products.push(product)
          product.quantity = product.quantity - this.cart[index][1]
          this.productService.update(product.id, product).subscribe(pr =>{
          this.orderService.getAll().subscribe(data => {
            order.reference="ORD" + (data.length+1);
            this.orderService.insert(order);
            this.cartService.clearCart();
            })  
          })
        }
      }else{
          alert("Impossible de valider la commande car vous n'êtes pas connecté")
      }
    }           
  }

}

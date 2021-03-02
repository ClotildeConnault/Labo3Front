import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user : User;
  orders$ : Observable<Order[]>;

  constructor(
    private orderService : OrderService,
    private authService : AuthService
    ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.orders$ = this.orderService.getbyClient(this.user.id);
    
  }

}

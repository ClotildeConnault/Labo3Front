import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { AccessLevel, accessLevelLabelMapping, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user : User;
  orders$ : Observable<Order[]>;
  accessLevelLabelMapping =  accessLevelLabelMapping;
  accessLevel : number;
  orderDetail : boolean;
  navigationSubscription;

  constructor(
    private orderService : OrderService,
    private authService : AuthService,
    private router : Router
    ) {
      this.navigationSubscription = this.router.events.subscribe(
        (e:any) => {if (e instanceof NavigationEnd) {
          this.orderDetail = !this.orderDetail;
        }}
        )
     }

  ngOnInit(): void {
    this.orders$ = null;
    this.user = this.authService.currentUser;
    console.log(this.user.firstName);
    this.orderService.getbyClient(this.user.id).subscribe(data => console.table(data));
    this.orders$ = this.orderService.getbyClient(this.user.id);
    this.accessLevel = (Object.keys(AccessLevel).indexOf(this.user.accessLevel.toString()) -1) /2;
    this.orderDetail = false;
     
  }

  onClickUpdate() {
    this.router.navigate(["user/update"]);
  }

  onClick(id : number) {
    
    this.router.navigate(['user/order/' + id]);
  }

}

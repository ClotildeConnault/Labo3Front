import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order : Order;
  id : number;
  paid : string;

  constructor(
    private orderService : OrderService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getByID(this.id).subscribe((data : Order) => {
      this.order = data
      console.log(data.isPaid);
    })
    if(this.order.isPaid) {
      this.paid = "payée";
    }
    else {
      this.paid = "en attente de paiement"
    }
  }

}

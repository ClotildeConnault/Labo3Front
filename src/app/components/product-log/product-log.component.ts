import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductLog } from 'src/app/models/productLog.model';
import { User } from 'src/app/models/user.model';
import { ProductLogService } from 'src/app/services/product-log.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.component.html',
  styleUrls: ['./product-log.component.scss']
})
export class ProductLogComponent implements OnInit {

  plog : ProductLog[]
  entry : string;
  prod : Product;
  user : User;

  constructor(private activatedRoute : ActivatedRoute, private logService : ProductLogService, private prodService : ProductService, private userService : UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.activatedRoute.url.subscribe(url => {
        if (url[1].toString() == "product") {
          this.entry = "product"
          this.logService.getLogsBySpecificProduct(data.id).subscribe(p => {
            this.plog = p;
          });
          this.prodService.getByID(data.id).subscribe(p => this.prod = p);
        } else {
          this.entry = "user"
          this.logService.getLogsBySpecificUser(data.id).subscribe(p => {
            this.plog = p;
          });
          this.userService.getByID(data.id).subscribe(u => this.user = u);
        }
      })
    })
  }

}

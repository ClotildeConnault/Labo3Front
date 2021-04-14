import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  p1 : Product;
  p2 : Product;
  p3 : Product;

  constructor(private service : ProductService) { }

  ngOnInit(): void {
    this.service.getByID(this.getRandomIntInclusive(1,100)).subscribe(p => this.p1 = p);
    this.service.getByID(this.getRandomIntInclusive(1,100)).subscribe(p => this.p2 = p);
    this.service.getByID(this.getRandomIntInclusive(1,100)).subscribe(p => this.p3 = p);
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

}

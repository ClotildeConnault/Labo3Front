import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductLog } from 'src/app/models/productLog.model';
import { ProductLogService } from 'src/app/services/product-log.service';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.component.html',
  styleUrls: ['./product-log.component.scss']
})
export class ProductLogComponent implements OnInit {

  plog : ProductLog[]

  constructor(private activatedRoute : ActivatedRoute, private logService : ProductLogService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.activatedRoute.url.subscribe(url => {
        if (url[1].toString() == "product") {
          this.logService.getLogsBySpecificProduct(data.id).subscribe(p => {
            this.plog = p;
          })
        } else {
          this.logService.getLogsBySpecificUser(data.id).subscribe(p => {
            this.plog = p;
          })
        }
      })
    })
  }

}

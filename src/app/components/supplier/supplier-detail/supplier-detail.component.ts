import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  supplier : Supplier;

  constructor(private service : SupplierService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.params['id'];

    this.service.getByID(id).subscribe(
      supplier => {this.supplier = supplier}
    )

  }

}

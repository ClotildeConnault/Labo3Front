import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  suppliers$ : Observable<Supplier[]>;

  constructor(private service : SupplierService, private router : Router) { }

  ngOnInit(): void {
    this.suppliers$ = this.service.getAll()
  }

  deleteThis(id : number) {
    this.service.delete(id).subscribe();
    this.router.navigate(['/suppliers']);
  }

}

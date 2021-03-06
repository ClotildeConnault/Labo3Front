import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  user : User;

  suppliers$ : Observable<Supplier[]>;

  constructor(private service : SupplierService, private router : Router, private authService : AuthService) { }

  ngOnInit(): void {
    this.user = this.authService._currentUser.value;
    this.initialize();
  }

  initialize(){
    this.suppliers$ = this.service.getAll();
  }

  deleteThis(id : number) {
    this.service.delete(id).subscribe(
      data => {
        this.initialize();
        this.router.navigate(['/suppliers'])
      },
      error => console.error("Oups, j'ai pas pu effacer...")
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SUPPLIER_FORM_CREATE } from 'src/app/forms/supplier.form';
import { Sector, SectorLabelMapping, SocialStatut, SocialStatutLabelMapping, Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.scss']
})
export class SupplierAddComponent implements OnInit {

  form_supplier = new FormGroup(SUPPLIER_FORM_CREATE);
  supplier : Supplier;

  SocialStatutLabelMapping =  SocialStatutLabelMapping;
  statut = Object.values(SocialStatut).filter(value => typeof value === 'number');

  SectorLabelMapping = SectorLabelMapping;
  sector = Object.values(Sector).filter(value => typeof value === 'number');

  constructor(private service : SupplierService, private router : Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    const form = this.form_supplier;
    this.supplier = form.value;
    if(form.valid){
      this.service.insert(this.supplier).subscribe();
      this.form_supplier.reset();
      this.router.navigate(['suppliers']);
    } else {
      alert("Un ou plusieurs champs sont invalides. Recommencez");
    }
  }

}

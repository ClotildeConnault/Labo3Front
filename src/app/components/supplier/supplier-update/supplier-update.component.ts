import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SUPPLIER_FORM_CREATE } from 'src/app/forms/supplier.form';
import { Sector, SectorLabelMapping, SocialStatut, SocialStatutLabelMapping, Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supplier-update',
  templateUrl: './supplier-update.component.html',
  styleUrls: ['./supplier-update.component.scss']
})
export class SupplierUpdateComponent implements OnInit {

  form_supplier = new FormGroup(SUPPLIER_FORM_CREATE);
  supplier: Supplier;
  supplierUpdate: Supplier;

  SocialStatutLabelMapping =  SocialStatutLabelMapping;
  statut = Object.values(SocialStatut).filter(value => typeof value === 'number');

  SectorLabelMapping = SectorLabelMapping;
  sector = Object.values(Sector).filter(value => typeof value === 'number');

  constructor(private service : SupplierService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    this.service.getByID(id).subscribe(
      supplier => {this.supplier = supplier}
    )
  }

  onUpdate() {
    const form = this.form_supplier;
    this.supplierUpdate = form.value;
    if(form.valid){
      this.supplierUpdate.products = this.supplier.products;
      this.service.update(this.supplier.id, this.supplierUpdate).subscribe();
      this.form_supplier.reset();
      this.router.navigate(['suppliers']);
    } else {
      alert("Un ou plusieurs champs sont invalides. Recommencez");
    }
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { ProductSearchComponent } from './components/product/product-search/product-search.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierDetailComponent } from './components/supplier/supplier-detail/supplier-detail.component';
import { SupplierAddComponent } from './components/supplier/supplier-add/supplier-add.component';
import { SupplierUpdateComponent } from './components/supplier/supplier-update/supplier-update.component';

import { OrderComponent } from './components/order/order.component';
import { BasketComponent } from './components/basket/basket.component';
import { UserComponent } from './components/user/user.component';
import { ValidateOrderComponent } from './components/validate-order/validate-order.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AuthGuard } from './services/auth.guard';
import { ProductLogComponent } from './components/product-log/product-log.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [{
    path: 'register', component: RegisterComponent
  }]},

  {path: 'products', component: ProductComponent, children: [{
    path: 'detail/:id',
    component: ProductDetailComponent
  }
]},
  {path: 'basket', component: BasketComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'validate', component: ValidateOrderComponent},
  {path: 'user', component: UserComponent, children: [{
    path: 'order/:id',
    component: OrderComponent
  },
  {path: 'update', component: UpdateUserComponent}
  ]},
  {path: 'products/add', component: ProductAddComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'products/search', component: ProductSearchComponent},
  {path: 'products/update/:id', component: ProductUpdateComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'suppliers', component: SupplierComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'suppliers/detail/:id', component: SupplierDetailComponent, children: [{
    path: 'productdetail/:id',
    component: ProductDetailComponent
  }
]},
  {path: 'suppliers/add', component: SupplierAddComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'suppliers/update/:id', component: SupplierUpdateComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'plog/product/:id', component: ProductLogComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: 'plog/user/:id', component: ProductLogComponent, canActivate: [AuthGuard], data: {roles: ['ADMINISTRATOR']} },
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

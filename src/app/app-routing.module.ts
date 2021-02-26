import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductComponent } from './components/product/product.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductComponent, children: [{
    path: 'detail/:id',
    component: ProductDetailComponent
  }]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
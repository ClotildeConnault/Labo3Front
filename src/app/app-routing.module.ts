import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { ProductComponent } from './components/product/product.component';
import { ProductSearchComponent } from './components/product/product-search/product-search.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductComponent, children: [{
    path: 'detail/:id',
    component: ProductDetailComponent
  }
]},
  {path: 'products/add', component: ProductAddComponent},
  {path: 'products/search', component: ProductSearchComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

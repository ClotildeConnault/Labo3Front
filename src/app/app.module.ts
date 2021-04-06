import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { ProductAddComponent } from './components/product/product-add/product-add.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductSearchComponent } from './components/product/product-search/product-search.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SupplierDetailComponent } from './components/supplier/supplier-detail/supplier-detail.component';
import { SupplierAddComponent } from './components/supplier/supplier-add/supplier-add.component';
import { SupplierUpdateComponent } from './components/supplier/supplier-update/supplier-update.component';

import { ValidateOrderComponent } from './components/validate-order/validate-order.component';
import { OrderComponent } from './components/order/order.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { BasketComponent } from './components/basket/basket.component';
import { UserComponent } from './components/user/user.component';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    HomeComponent,
    NavComponent,
    ProductDetailComponent,
    LoginComponent,
    ProductAddComponent,
    RegisterComponent,
    ProductSearchComponent,
    ProductUpdateComponent,
    SupplierComponent,
    SupplierDetailComponent,
    SupplierAddComponent,
    SupplierUpdateComponent,
    BasketComponent,
    UserComponent,
    ValidateOrderComponent,
    OrderComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

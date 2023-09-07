import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CartComponent } from './Components/cart/cart.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      { path: 'Products', component: ProductListComponent, canActivate: [AdminGuard] },
      { path: 'Products/Cart', component: CartComponent },
      //parameterized path
      { path: 'Products/Add', component: AddProductComponent, canActivate: [AdminGuard] },
      { path: 'Products/Edit/:pid', component: AddProductComponent, canActivate: [AdminGuard] },
      { path: 'Products/Delete/:pid', component: AddProductComponent },
      { path: 'Products/:pid', component: ProductDetailsComponent },
      { path: 'Order', component: OrderMasterComponent, canActivate: [AuthGuard] },

    ]
  },
  { path: 'Login', component: UserLoginComponent },
  { path: 'Logout', component: UserLoginComponent },
  { path: '**', component: NotFoundComponent }, //wild card path (not found pages)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

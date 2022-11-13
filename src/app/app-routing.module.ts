import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {CustomerComponent} from "./components/dashboard/inner-items/customer/customer.component";
import {OrderDetailComponent} from "./components/dashboard/inner-items/order-detail/order-detail.component";
import {OrderComponent} from "./components/dashboard/inner-items/order/order.component";
import {ProductComponent} from "./components/dashboard/inner-items/product/product.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {path:'',redirectTo:'/dashboard/customer', pathMatch:'full'},
      {path:'customer', component: CustomerComponent},
      {path:'product', component: ProductComponent},
      {path:'order', component: OrderComponent},
      {path:'detail', component: OrderDetailComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

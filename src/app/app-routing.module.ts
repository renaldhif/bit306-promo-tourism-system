import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { RegisterComponent } from './views/register/register.component';
import { ErrorNotfoundComponent } from './views/error-notfound/error-notfound.component';
import { AdminComponent } from './views/admin/admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { MerchantListComponent } from './views/admin/merchant-list/merchant-list.component';
import { MerchantComponent } from './views/merchant/merchant/merchant.component';
import { MerchantDashboardComponent } from './views/merchant/merchant-dashboard/merchant-dashboard.component';
import { ProductsComponent } from './views/merchant/products/products.component';
import { AnalyticsComponent } from './views/merchant/analytics/analytics.component';
import { CustomerComponent } from './views/customer/customer.component';
import { PaymentHistoryComponent } from './views/customer/payment-history/payment-history.component';
import { JoinMerchantComponent } from './views/join-merchant/join-merchant.component';
import { ProductComponent } from './views/product/product.component';
import { AddProductComponent } from './views/merchant/add-product/add-product.component';
import { EditProductComponent } from './views/merchant/edit-product/edit-product.component';
import { ProductDetailComponent } from './views/merchant/product-detail/product-detail.component';
import { ViewMerchantDetailComponent } from './views/admin/view-merchant-detail/view-merchant-detail.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { CheckoutComponent } from './views/customer/checkout/checkout.component';
import { PaymentHistoryDetailComponent } from './views/customer/payment-history-detail/payment-history-detail.component';
import { AdminAnalyticsComponent } from './views/admin/admin-analytics/admin-analytics.component';
import { AuthGuard } from './helper/auth.guard';
import { AdminGuard } from './helper/admin.guard';
import { MerchantGuard } from './helper/merchant.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    // children: [
    // ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'join-merchant', component: JoinMerchantComponent},
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product/:id', component: ProductComponent},

  // Admin Routes
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: 'merchant-list', component: MerchantListComponent, canActivate: [AdminGuard] },
      { path: 'view-merchant-detail/:id', component: ViewMerchantDetailComponent, canActivate: [AdminGuard]},
      { path: 'analytics/:id', component: AdminAnalyticsComponent, canActivate: [AdminGuard]}
    ],
  },

  // Merchant Routes
  {
    path: 'merchant',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: MerchantDashboardComponent, canActivate: [MerchantGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [MerchantGuard] },
      { path: 'add-product', component: AddProductComponent, canActivate: [MerchantGuard] },
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [MerchantGuard] },
      { path: 'view-product-detail/:id', component: ProductDetailComponent, canActivate: [MerchantGuard] },
      { path: 'analytics', component: AnalyticsComponent, canActivate: [MerchantGuard] },
    ],
  },

  // Customer Routes
  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: LandingPageComponent },
      { path: 'payment-history', component: PaymentHistoryComponent, canActivate: [AuthGuard] },
      { path: 'payment-history-detail/:id', component: PaymentHistoryDetailComponent, canActivate: [AuthGuard]},
      { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] }
    ],
  },


  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full',  component: ErrorNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

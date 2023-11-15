import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorNotfoundComponent } from './views/error-notfound/error-notfound.component';
import { AdminComponent } from './views/admin/admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { MerchantListComponent } from './views/admin/merchant-list/merchant-list.component';
import { MerchantComponent } from './views/merchant/merchant/merchant.component';
import { MerchantDashboardComponent } from './views/merchant/merchant-dashboard/merchant-dashboard.component';
import { ProductsComponent } from './views/merchant/products/products.component';
import { AnalyticsComponent } from './views/merchant/analytics/analytics.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    // children: [
    // ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Admin Routes
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'merchant-list', component: MerchantListComponent },
    ],
  },

  // Merchant Routes
  {
    path: 'merchant',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: MerchantDashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/:id', component: ProductsComponent}, // mungkin bisa pake ini?
      { path: 'product-detail', component: ProductsComponent },
      { path: 'analytics', component: AnalyticsComponent },
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

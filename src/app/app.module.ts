import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/landing-page/header/header.component';
import { FooterComponent } from './views/landing-page/footer/footer.component';
import { MainComponent } from './views/landing-page/main/main.component';
import { LoginComponent } from './views/login/login.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { ErrorNotfoundComponent } from './views/error-notfound/error-notfound.component';
import { AdminComponent } from './views/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { CardStatsComponent } from './components/card-stats/card-stats.component';
import { MerchantListComponent } from './views/admin/merchant-list/merchant-list.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MerchantComponent } from './views/merchant/merchant/merchant.component';
import { MerchantDashboardComponent } from './views/merchant/merchant-dashboard/merchant-dashboard.component';
import { ProductsComponent } from './views/merchant/products/products.component';
import { ProductDetailComponent } from './views/merchant/product-detail/product-detail.component';
import { AnalyticsComponent } from './views/merchant/analytics/analytics.component';
import { MerchantSidebarComponent } from './components/merchant-sidebar/merchant-sidebar.component';
import { MerchantHeaderStatsComponent } from './components/merchant-header-stats/merchant-header-stats.component';
import { PaymentHistoryComponent } from './views/customer/payment-history/payment-history.component';
import { CustomerComponent } from './views/customer/customer.component';
import { JoinMerchantComponent } from './views/join-merchant/join-merchant.component';
import { ProductComponent } from './views/product/product.component';
import { AddProductComponent } from './views/merchant/add-product/add-product.component';
import { EditProductComponent } from './views/merchant/edit-product/edit-product.component';
import { ViewMerchantDetailComponent } from './views/admin/view-merchant-detail/view-merchant-detail.component';
import { ChangePasswordComponent } from './views/change-password/change-password.component';
import { CheckoutComponent } from './views/customer/checkout/checkout.component';
import { PaymentHistoryDetailComponent } from './views/customer/payment-history-detail/payment-history-detail.component';
import { AdminAnalyticsComponent } from './views/admin/admin-analytics/admin-analytics.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { AddReviewComponent } from './views/customer/add-review/add-review.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { AllProductsComponent } from './views/all-products/all-products.component';
import { PackageTourComponent } from './views/product/category/package-tour/package-tour.component';
import { CruiseComponent } from './views/product/category/cruise/cruise.component';
import { AttractionEntertainmentComponent } from './views/product/category/attraction-entertainment/attraction-entertainment.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    ErrorNotfoundComponent,
    AdminComponent,
    SidebarComponent,
    HeaderStatsComponent,
    CardStatsComponent,
    MerchantListComponent,
    DashboardComponent,
    MerchantComponent,
    MerchantDashboardComponent,
    ProductsComponent,
    ProductDetailComponent,
    AnalyticsComponent,
    MerchantSidebarComponent,
    MerchantHeaderStatsComponent,
    PaymentHistoryComponent,
    CustomerComponent,
    JoinMerchantComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    ViewMerchantDetailComponent,
    ChangePasswordComponent,
    CheckoutComponent,
    PaymentHistoryDetailComponent,
    AdminAnalyticsComponent,
    AddReviewComponent,
    StarRatingComponent,
    ProductCardComponent,
    WhyChooseUsComponent,
    AllProductsComponent,
    PackageTourComponent,
    CruiseComponent,
    AttractionEntertainmentComponent,
    LoadingIndicatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    NgxPayPalModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

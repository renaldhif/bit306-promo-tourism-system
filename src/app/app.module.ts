import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/landing-page/header/header.component';
import { FooterComponent } from './components/landing-page/footer/footer.component';
import { MainComponent } from './components/landing-page/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { ErrorNotfoundComponent } from './views/error-notfound/error-notfound.component';
import { AdminComponent } from './views/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { CardStatsComponent } from './components/card-stats/card-stats.component';
import { MerchantListComponent } from './views/admin/merchant-list/merchant-list.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokeninterceptorService } from './tokeninterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    CustomerdashboardComponent,
    AdmindashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService, {
    provide:HTTP_INTERCEPTORS,
    useClass:TokeninterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

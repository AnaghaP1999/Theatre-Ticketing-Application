import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { BookticketsComponent } from './booktickets/booktickets.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { EditmovieComponent } from './editmovie/editmovie.component';

const routes: Routes = [{path:'',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'admin-dashboard',component:AdmindashboardComponent},
{path:'my-dashboard',component:CustomerdashboardComponent},
{path:'movie-details/:id',component:MoviepageComponent},
{path:'book-tickets',component:BookticketsComponent},
{path:'add-movie',component:AddmovieComponent},
{path:'edit-movie/:id',component:EditmovieComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

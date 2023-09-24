import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {

  items:any;
  movieData: any = {};

  constructor(private router: Router, private service: LoginService, private customerservice: CustomerService) {}

  ngOnInit() {
    this.customerservice.getMovies().subscribe((data=>{
      this.items=data;
    }))
  }

  logout(): void {
    this.service.logout();
  }
}

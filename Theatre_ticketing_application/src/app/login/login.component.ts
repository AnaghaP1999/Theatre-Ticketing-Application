import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform = {
    email: '',
    password: ''
  }

  constructor(private route: Router, private service: LoginService) {}

  ngOnInit(): void {
  }

  // Login
  login() {
      this.service.login(this.loginform).subscribe(res =>{
        alert("Successfully logged in the Account")
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        
        localStorage.setItem('user', res.user);
        if(res.role == 'admin') {
          this.route.navigate(['/admin-dashboard']);
        }
        if(res.role == 'user') {
          this.route.navigate(['/my-dashboard']);
        }
      },(error=>{
        alert("Not Successfully LogIn")
      }) )
   }

}

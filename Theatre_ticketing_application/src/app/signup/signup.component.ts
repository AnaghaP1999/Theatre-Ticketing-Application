import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupform={
    name:'',
    email:'',
    password:''
  }
  constructor(private service:LoginService,private route:Router) { }

  ngOnInit(): void {
  }

  signup(){
    this.service.signup(this.signupform).subscribe(res=>{
      alert("Customer Account Successfully Registered")
      localStorage.setItem('token', res.token);

        this.route.navigate(['/login'])
      },(error)=>{
        alert("Not Successfully Registered")
      } )
    
      }
}

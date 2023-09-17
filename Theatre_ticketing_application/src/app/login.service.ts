import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  private isLoggedIn = false;

  login(user:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/login`, user);
  }

  // signup
  signup(user:any):Observable<any>{
    return this.http.post(`http://localhost:3000/api/signup`, user);
  }

  // logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
    this.isLoggedIn = false;
  }
}

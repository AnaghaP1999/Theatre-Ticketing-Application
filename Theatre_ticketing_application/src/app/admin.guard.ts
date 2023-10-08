import { CanActivateFn, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { inject } from '@angular/core';

interface MyToken {
  data:{
    role: string,
    username: string,    
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  var token = localStorage.getItem('token') || '';
  var adminRole = localStorage.getItem('role') || '';

  try {
    var user = jwt_decode<MyToken>(token);
    console.log(user)
    if (adminRole == "admin"){
      return true
    }else{
      alert('Permission Denied');
      return false;
    }
  } catch (error) {
    console.log('Token error', error)
    return false
  }

 return true;
 
};
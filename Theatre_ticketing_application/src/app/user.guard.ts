import { CanActivateFn, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { inject } from '@angular/core';

interface MyToken {
  data:{
    role: string,
    username: string,    
  }
}

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token=localStorage.getItem('token') || '';
  var userRole = localStorage.getItem('role') || '';

try{
  var user =jwt_decode<MyToken>(token);
  console.log(user)
  if(userRole == "user"){
    return true
  }else{ 
    alert('Permission Denied');
    router.navigate(['/']); 
    return false;
  }
} catch(error){
  console.log('Token error', error)
    return false
}

  
  
return true;  
  



};

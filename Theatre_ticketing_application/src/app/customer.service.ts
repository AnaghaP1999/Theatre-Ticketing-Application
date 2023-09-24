import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private router:Router) { }

  //  get all movies API - Customer
  getMovies() {
    return this.http.get(`http://localhost:3000/api/movielist`);
  }

   //  get movie details by id API - Customer
   getDataById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/get-movie-details/${id}`);
  }
}

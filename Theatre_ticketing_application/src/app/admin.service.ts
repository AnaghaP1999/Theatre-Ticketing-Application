import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private router:Router) { }

  //  get all movies API - Admin
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/movielist`);
  }

  getDataById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/get-movie-details/${id}`);
  }

  //  add requirements API - Admin
  addMovie(formData: FormData) {
    return this.http.post<any>('http://localhost:3000/api/addmovie', formData);
  }

  //  update requirement API - Admin
  updateMovie(movieId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/update-movie/${movieId}`, updatedData);
  }

  //  delete movie API - Admin
  deleteMovie(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/delete-movie/${id}`);
  }

}

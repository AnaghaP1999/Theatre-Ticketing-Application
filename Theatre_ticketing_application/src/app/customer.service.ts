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
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/movielist`);
  }

   //  get movie details by id API - Customer
  getDataById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/get-movie-details/${id}`);
  }

  // Book Tickets
  bookTicket(bookingData: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/bookTicket`, bookingData, { responseType: 'text' });
  }

  // get booking data by email
  getBookingData(email: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/get-booking-details/${email}`);
  }

  // get booking data by id
  getBookingsById(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/get-bookings/${id}`);
  }

  //  delete movie API - Admin
  cancelTickets(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/cancel-tickets/${id}`);
  }

  getSoldSeats(movieId: string): Observable<string[]> {
    return this.http.get<string[]>(`http://localhost:3000/api/soldseats/${movieId}`);
  }

}

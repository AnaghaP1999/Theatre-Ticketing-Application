import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private router:Router) { }
  server_address: string = 'http://localhost:3000/api';

  //  get all movies API - Customer
  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.server_address}/movielist`);
  }

   //  get movie details by id API - Customer
  getDataById(id: any): Observable<any> {
    return this.http.get<any>(`${this.server_address}/get-movie-details/${id}`);
  }

  // Book Tickets
  bookTicket(bookingData: any): Observable<any> {
    return this.http.post(`${this.server_address}/bookTicket`, bookingData, { responseType: 'text' });
  }

  // get booking data by email
  getBookingData(email: any): Observable<any> {
    return this.http.get<any>(`${this.server_address}/get-booking-details/${email}`);
  }

  // get booking data by id
  getBookingsById(id: any): Observable<any> {
    return this.http.get<any>(`${this.server_address}/get-bookings/${id}`);
  }

  //  delete movie API - Admin
  cancelTickets(id: string): Observable<any> {
    return this.http.delete<any>(`${this.server_address}/cancel-tickets/${id}`);
  }

  getSoldSeats(movieId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.server_address}/soldseats/${movieId}`);
  }

  // Add Rating - Customer
  submitRating(movieId: string, user: string, reviewText: string, starRating: number): Observable<any> {
    const ratingData = {
      user,
      reviewText,
      starRating,
    };

    return this.http.post(`${this.server_address}/movie-rating/${movieId}`, ratingData, { responseType: 'text' });
  }

}

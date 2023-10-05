import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-booktickets',
  templateUrl: './booktickets.component.html',
  styleUrls: ['./booktickets.component.css']
})
export class BookticketsComponent {

  booking = {
    moviename:'',
    date:'',
    tickets:'',
    amount:'',
    // time:'',
    email: ''
  }
  constructor(private http: HttpClient, private customerservice: CustomerService) {}

  bookTicket() {
    this.customerservice.bookTicket(this.booking).subscribe(
      (response) => {
        console.log('Booking response:', response);
      },
      (error) => {
        console.error('Booking error:', error);
      }
    );
  }
}

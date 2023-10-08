import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {

  email: any; // This will store the user's email
  userData: any; // This will store the retrieved user data

  constructor(private http: HttpClient, private service: LoginService, private customerservice: CustomerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.getBookingData();
  }

  getBookingData() {
    // Make an HTTP GET request to your API
    this.email = localStorage.getItem('user');
    this.customerservice.getBookingData(this.email).subscribe(
      (data) => {
        this.userData = data.sort((a: any, b: any) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });
        console.log('User Data:', this.userData);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  isDateOlderThanToday(dateString: string): boolean {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
  }
  
  cancelTicket(id: string) {
    this.customerservice.getBookingsById(id).subscribe(
      (response) => {
        this.userData = response;
        if (confirm('Are you sure you want to cancel the Tickets?')) { 
          this.customerservice.cancelTickets(this.userData._id).subscribe(
            () => {
              console.log('Tickets deleted successfully.');
              window.location.reload();
            },
            (error) => {
              console.error('Error deleting Tickets:', error);
            }
          );
        }  
      }
    ); 
  }

  logout(): void {
    this.service.logout();
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-booktickets',
  templateUrl: './booktickets.component.html',
  styleUrls: ['./booktickets.component.css']
})
export class BookticketsComponent implements OnInit {

  booking : any = {}

  Id: any;
  movieData: any = {};
  loggedInUserEmail: any = '';
  userData: any;
  movieName: any;
  date: any;
  tickets: any;
  amount: any;
  time: any;
  seat_number: string ='';
  errorMessage: string = '';
  selectedSeats: string[] = [];
  seatNumbersInput: string = '';
  movieId: string = '';
  bookedSeats: string[] = [];
  totalSeats: any;
  columnsPerRow: number = 6;
  totalAmount: number = 0;

  constructor(private http: HttpClient, private customerservice: CustomerService, private route: ActivatedRoute,
    private router: Router, private service: LoginService) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.Id = params.get('id');
      this.Id = decodeURIComponent(this.Id);
      this.getMovieDetails(this.Id);
    });
    this.loadSoldSeats();
  }
  
  selectedDate: Date | null = null; // Initialize with null value

  // Define the dateFilter property as a DateFilterFn<Date | null>
  dateFilter: (date: Date | null) => boolean = (date: Date | null) => {
    const currentDate = new Date();
    return date ? date >= currentDate : true; // Handle null date case
  };

  // Handle date selection
  onDateSelected(event: any) {
    this.selectedDate = event.value;
  }

  // get single requirement details - Admin
  getMovieDetails(id: string) {
    this.loggedInUserEmail = localStorage.getItem('user');
    this.customerservice.getDataById(id).subscribe(
      (response) => {
        this.movieData = response;
        this.movieName = response.moviename;
        this.amount = response.ticket_rate;
        this.userData = localStorage.getItem('user');
        this.totalSeats = response.seats;
        this.totalAmount = this.calculateTotalAmount();
      },
      (error) => {
        console.error('Error fetching movie details:', error);
      }
    );
  }

  bookTicket() {
    this.booking = {
      moviename:this.movieName,
      date:this.date,
      tickets:this.selectedSeats,
      amount:this.totalAmount,
      time:this.time,
      email: this.userData
    }
    this.customerservice.bookTicket(this.booking).subscribe(
      (response) => {
        alert('Tickets booked successfully');
        this.router.navigate(['/my-bookings']);
        console.log('Booking response:', response);
      },
      (error) => {
        console.error('Booking error:', error);
      }
    );
  }

  toggleSeat(seat: string): void {

    if (this.isSeatDisabled(seat)) {
     // Handle the case when the seat is booked or already selected
     alert('This seat is already booked.');
     return;
   }

  const seatIndex = this.selectedSeats.indexOf(seat);
  if (seatIndex !== -1) {
    this.selectedSeats.splice(seatIndex, 1); // Deselect the seat
  } else {
    this.selectedSeats.push(seat); // Select the seat
  }
  this.seat_number = seat; 
  this.seatNumbersInput = this.selectedSeats.join(', ');
  // console.log('Selected Seats:', this.selectedSeats); 
  this.totalAmount = this.calculateTotalAmount();
}

  isSeatSelected(seat: string):boolean {
    return this.selectedSeats.includes(seat);
  }
  
  isSeatBooked(seat: string): boolean {
    return this.bookedSeats.includes(seat);
  }
  
  isSeatDisabled(seat: string): boolean {
    return this.isSeatBooked(seat) || this.isSeatSelected(seat);
  }

  loadSoldSeats() {
    this.customerservice.getSoldSeats(this.movieId).subscribe(
      (response) => {
        this.bookedSeats = response;
      },
      (error) => {
        console.error('Error loading sold seats:', error);
      }
    );
  }

  generateRowIndices(): number[] {
    const numberOfRows = Math.ceil(this.totalSeats / this.columnsPerRow);
    return Array.from({ length: numberOfRows }, (_, index) => index);
  }
  
  generateSeatNumbers(rowIndex: number): number[] {
    const startSeatNumber = rowIndex * this.columnsPerRow + 1;
    const endSeatNumber = Math.min(startSeatNumber + this.columnsPerRow - 1, this.totalSeats);
    return Array.from({ length: endSeatNumber - startSeatNumber + 1 }, (_, index) => startSeatNumber + index);
  }

  calculateTotalAmount(): number {
    const numberOfSelectedSeats = this.selectedSeats.length;console.log('this.amount', this.amount);
    console.log(numberOfSelectedSeats * this.amount);
    
    return numberOfSelectedSeats * this.amount;
  }

  // logout
  logout(): void {
    this.service.logout();
  }
}

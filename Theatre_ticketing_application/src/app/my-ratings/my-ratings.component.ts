import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-my-ratings',
  templateUrl: './my-ratings.component.html',
  styleUrls: ['./my-ratings.component.css']
})
export class MyRatingsComponent {

  movieTitle: string = '';
  reviewText: string = '';
  starRating: number = 0; // Initialize with no stars selected
  user: any;
  movieId: any;

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService, private customerervice: CustomerService) {}

  setRating(rating: number) {
    // Set the starRating property when a star is clicked
    this.starRating = rating;
    
  }

  submitRating() {
    this.route.paramMap.subscribe(params => {
    this.movieId = params.get('id');
    this.user = localStorage.getItem('user');
    this.customerervice
  .submitRating(this.movieId, this.user, this.reviewText, this.starRating)
  .subscribe(
    (response) => {
      alert('Rating submitted successfully');
      this.router.navigate(['/my-bookings']);
      console.log('Rating submitted successfully', response);
      // Handle successful response
    },
    (error) => {
      console.error('HTTP Error:', error);
      // Handle error here
    }
  );

    });
  }

  // logout
  logout(): void {
    this.service.logout();
  }
}

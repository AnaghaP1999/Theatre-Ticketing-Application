import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  items:any;
  movieData: any = {};
  
  constructor(private router: Router, private service: LoginService, private adminservice: AdminService) {}

  ngOnInit() {
    this.fetchMovies();
    // this.adminservice.getMovies().subscribe((data=>{
    //   this.items=data;
    // }))
  }
  fetchMovies() {
    this.adminservice.getMovie().subscribe(
      (data) => {
        // Update the image URLs to point to the backend server
        this.items = data.map((movie:any) => ({
          ...movie,
          image: `http://localhost:3000${movie.image}`,
        }));
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  // delete a movie - Admin
deleteMovie(id: string) {
  this.adminservice.getDataById(id).subscribe(
    (response) => {
      this.movieData = response;
      if (confirm('Are you sure you want to delete this Movie?')) { 
        this.adminservice.deleteMovie(this.movieData._id).subscribe(
          () => {
            console.log('Movie deleted successfully.');
            window.location.reload();
          },
          (error) => {
            console.error('Error deleting Movie:', error);
          }
        );
      }  
    }
  );  
}

  // Logout
  logout(): void {
    this.service.logout();
  }
}

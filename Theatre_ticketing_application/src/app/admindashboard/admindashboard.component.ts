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
    this.adminservice.getMovies().subscribe((res:any[])=>{
      this.items = res.map(movie => {
        const imageBase64 = this.arrayBufferToBase64(movie.image.data.data);
        return {
          ...movie,
          image: `data:${movie.image.contentType};base64,${imageBase64}`
        };
      });
    },
    (error)=>{
      console.error(`Error getting data:`,error)
    }
    )
  }

  arrayBufferToBase64(buffer: ArrayBuffer) {
    const binaryArray = new Uint8Array(buffer);
    let binaryString = '';
  
    for (let i = 0; i < binaryArray.length; i++) {
      binaryString += String.fromCharCode(binaryArray[i]);
    }
  
    const base64String = btoa(binaryString);
    return base64String;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-editmovie',
  templateUrl: './editmovie.component.html',
  styleUrls: ['./editmovie.component.css']
})
export class EditmovieComponent implements OnInit {

  movieData: any = {};
  timeSlots : any;

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService, private adminservice: AdminService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.adminservice.getDataById(id).subscribe(
          response => {
            this.movieData = response;
            this.timeSlots = response.timeSlots.join(', ');
          },
          error => {
            console.error('Error fetching movie details:', error);
          }
        );
      }
    });
  }
  

   // update a requirement - Admin
   updateMovie() {
    const updatedMovieData = {
      ticket_rate: this.movieData.ticket_rate,
      timeSlots: this.timeSlots.split(',').map((slot: string) => slot.trim())
    };
    
    this.adminservice.updateMovie(this.movieData._id, updatedMovieData).subscribe(() => {
      this.router.navigate(['/admin-dashboard']);
    });
  }

  // Logout
  logout(): void {
    this.service.logout();
  }
}

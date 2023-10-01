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

  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService, private adminservice: AdminService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.adminservice.getDataById(id).subscribe(
          response => {
            this.movieData = response;
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
    this.adminservice.updateMovie(this.movieData).subscribe(() => {
      this.router.navigate(['/admin-dashboard']);
    });
  }

}

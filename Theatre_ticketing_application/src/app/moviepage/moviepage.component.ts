import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CustomerService) {}
  movieData: any = {};
  private id: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.service.getDataById(id).subscribe(
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
}

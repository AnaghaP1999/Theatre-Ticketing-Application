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
  SelectedImage: string | ArrayBuffer | null = null;
  private id: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.service.getDataById(id).subscribe((response)=>{
        this.movieData = response;    
        if (this.movieData && this.movieData.image && this.movieData.image.data) {
          const blob = new Blob([new Uint8Array(this.movieData.image.data.data)]);
          const reader = new FileReader();
          reader.onload = (e) => {
            this.SelectedImage = e.target?.result || null;
          };
          reader.readAsDataURL(blob);
        }
      });
    });
  }
}

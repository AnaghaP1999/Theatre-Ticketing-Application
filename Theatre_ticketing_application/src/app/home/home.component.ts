import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items:any;
  
  constructor(private router: Router, private adminservice: AdminService) {}

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

}

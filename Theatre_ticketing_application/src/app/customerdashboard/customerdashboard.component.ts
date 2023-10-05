import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css']
})
export class CustomerdashboardComponent implements OnInit {

  items:any;
  movieData: any = {};

  constructor(private router: Router, private service: LoginService, private customerservice: CustomerService) {}

  ngOnInit() {
    this.customerservice.getMovies().subscribe((res:any[])=>{
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

  logout(): void {
    this.service.logout();
  }
}

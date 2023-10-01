import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {

  // movieForm = {
  //   moviename : '',
  //   image : '',
  //   language : '',
  //   category : '',
  //   cast : '',
  //   description : '',
  //   ticket_rate : '',
  //   seats : ''
  // };

  movieForm: any = {}; // Define your movie form model
  selectedImage: File | null = null; // Variable to store the selected image file
  url: string | ArrayBuffer | null = null; // Variable to display the selected image preview

  constructor(private router: Router, private service: LoginService, private adminservice: AdminService) {}

  ngOnInit() {}

  addMovie() {
    const formData = new FormData();
    formData.append('moviename', this.movieForm.moviename);
    formData.append('seats', this.movieForm.seats);
    formData.append('category', this.movieForm.category);
    formData.append('language', this.movieForm.language);
    formData.append('cast', this.movieForm.cast);
    formData.append('description', this.movieForm.description);
    formData.append('ticket_rate', this.movieForm.ticket_rate);

    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.adminservice.addMovie(formData).subscribe(
      (res) => {
        alert('Movie added successfully');
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        console.error('Error adding movie:', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0]; // Store the selected file
      if (this.selectedImage !== null) {
        this.url = URL.createObjectURL(this.selectedImage); 
      }
      // / Display the selected image preview
    } else {
      this.selectedImage = null; // Ensure that selectedImage is null if no file is selected
      this.url = null; // Clear the image preview if no file is selected
    }
  }


  // Logout
  logout(): void {
    this.service.logout();
  }

}

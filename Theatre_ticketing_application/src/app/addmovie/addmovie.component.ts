import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent implements OnInit {


  movieForm: any = {}; // Define your movie form model
  selectedImage: File | null = null; // Variable to store the selected image file
  url: string | ArrayBuffer | null = null; // Variable to display the selected image preview

  constructor(private router: Router, private service: LoginService, private adminservice: AdminService) {}

  ngOnInit() {}

  addMovie(form: NgForm) {
    if (form.valid && this.selectedImage) {
      const formData = new FormData();
      formData.append('moviename', form.value.moviename);
      formData.append('category', form.value.category);
      formData.append('language', form.value.language);
      formData.append('cast', form.value.cast);
      formData.append('description', form.value.description);
      formData.append('ticket_rate', form.value.ticket_rate);
      formData.append('seats', form.value.seats);
      formData.append('image', this.selectedImage);
      const timeSlotsArray: string[] = form.value.timeSlots.split(',').map((slot: string) => slot.trim());
      timeSlotsArray.forEach(slot => formData.append('timeSlots[]', slot));
  
      this.adminservice.addMovie(formData).subscribe(
        (response) => {
          alert('Movie added successfully');
          console.log('Movie added successfully:', response);
          this.router.navigate(['/admin-dashboard']);
          // Reset the form
          form.reset();
        },
        (error) => {
          console.error('Error adding movie:', error);
        }
      );
    }
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

import { Component } from '@angular/core';

@Component({
  selector: 'app-booktickets',
  templateUrl: './booktickets.component.html',
  styleUrls: ['./booktickets.component.css']
})
export class BookticketsComponent {

  bookingForm={
    moviename:'',
    date:'',
    tickets:'',
    amount:'',
    time:'',
    email: ''
  }
}

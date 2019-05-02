import { Component, OnInit } from "@angular/core";
import { ObservableService } from "../services/observable.service";
import { AuthService } from "../services/auth.service";
import { BookingService } from "../services/booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.css"]
})
export class BookingsComponent implements OnInit {
  username = "";
  bookings = [];
  constructor(
    private auth: AuthService,
    private observableService: ObservableService,
    private service: BookingService
  ) {
    this.populateUserName();
    this.observableService.isLoggedInSubject.subscribe(value => {
      this.populateUserName();
    });
  }
  populateUserName() {
    if (this.auth.getUser() != null) {
      this.username = this.auth.getUser().name;
    } else {
      this.username = "User";
    }
  }

  ngOnInit() {
    this.service.getBookings().then(resp => {
      console.log(resp);

      this.bookings = resp;
    });
  }
}

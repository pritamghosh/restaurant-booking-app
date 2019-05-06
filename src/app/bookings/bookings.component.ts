import { Component, OnInit } from "@angular/core";
import { ObservableService } from "../services/observable.service";
import { AuthService } from "../services/auth.service";
import { BookingService } from "../services/booking.service";
import { Booking } from "../model/booking.model";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.component.html",
  styleUrls: ["./bookings.component.css"]
})
export class BookingsComponent implements OnInit {
  username = "";
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  bookings: Booking[] = [];
  booking: any;
  currentIndex = -1;
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
    this.service
      .getBookings()
      .then((resp: Booking[]) => {
        this.bookings = resp;
        this.bookings.forEach(booking => {
          booking.bookingDate = new Date(booking.bookingDate);
          booking.reservationDate = new Date(booking.reservationDate);
        });
      })
      .catch(err => console.error(err));
  }

  get getbookings(): any[] {
    return this.bookings
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  getIndex(i: number) {
    return (this.page - 1) * this.pageSize + i + 1;
  }
  multiply(x: number, y: number): number {
    return x * y;
  }
  showBookingDetails(index: number) {
    this.currentIndex = this.getIndex(index - 1);
    this.booking = this.bookings[this.currentIndex];
  }

  onClose() {
    this.currentIndex = -1;
    this.booking = null;
  }

  onCancel() {
    this.service
      .cancelBooking(this.booking.id)
      .then(resp => {
        if (resp) {
          this.booking.bookingStatus = "CNXL";
          this.bookings[this.currentIndex].bookingStatus = "CNXL";
        }
      })
      .catch(err => console.error(err));
  }
}

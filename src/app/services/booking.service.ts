const CANCEL_BOOKING_API = "http://localhost:9051/booking/cancle";
const ALL_BOOKING_API = "http://localhost:9051/booking/all";
const GET_BOOKING_API = "http://localhost:9051/booking/get";
const NEW_BOOKING_API = "http://localhost:9051/booking/new";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class BookingService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getBookings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isLoggedIn) {
        this.http
          .get(GET_BOOKING_API, {
            params: { " access_token": this.auth.getToken() }
          })
          .subscribe(
            body => resolve(body),
            error => {
              reject(error);
            }
          );
      } else {
        reject("login required");
      }
    });
  }

  newBooking(booking: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isLoggedIn()) {
        this.http
          .post(NEW_BOOKING_API, booking, {
            params: { " access_token": this.auth.getToken() }
          })
          .subscribe(
            body => {
              resolve(body);
            },
            err => {
              console.error(err);
              reject(err);
            }
          );
      } else {
        reject("login required");
      }
    });
  }
}

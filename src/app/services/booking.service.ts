const CANCEL_BOOKING_API = "http://localhost:9051/booking/cancle";
const COMPLETE_ADMIN_BOOKING_API =
  "http://localhost:9051/booking/admin/complete";
const CANCEL_ADMIN_BOOKING_API = "http://localhost:9051/booking/admin/cancle";
const GET_ADMIN_BOOKING_API = "http://localhost:9051/booking/admin/all";
const GET_BOOKING_API = "http://localhost:9051/booking/get";
const NEW_BOOKING_API = "http://localhost:9051/booking/new";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class BookingService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getBookings(isAdmin = false): Promise<any> {
    let api = isAdmin ? GET_ADMIN_BOOKING_API : GET_BOOKING_API;
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isLoggedIn) {
        this.http
          .get(api, {
            params: { access_token: this.auth.getToken() }
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
            params: { access_token: this.auth.getToken() }
          })
          .subscribe(
            body => {
              resolve(body);
            },
            err => {
              reject(err);
            }
          );
      } else {
        reject("login required");
      }
    });
  }

  cancelBooking(id: any, isAdmin = false): Promise<any> {
    let api = isAdmin ? CANCEL_ADMIN_BOOKING_API : CANCEL_BOOKING_API;
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isLoggedIn()) {
        this.http
          .get(api, {
            params: { access_token: this.auth.getToken(), id: id }
          })
          .subscribe(
            body => {
              resolve(body);
            },
            err => {
              reject(err);
            }
          );
      } else {
        reject("login required");
      }
    });
  }

  completeBooking(id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isLoggedIn()) {
        this.http
          .get(COMPLETE_ADMIN_BOOKING_API, {
            params: { access_token: this.auth.getToken(), id: id }
          })
          .subscribe(
            body => {
              resolve(body);
            },
            err => {
              reject(err);
            }
          );
      } else {
        reject("login required");
      }
    });
  }
}

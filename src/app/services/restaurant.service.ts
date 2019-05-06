const SEARCH_API = "http://localhost:9053/restaurant/search";
const ALL_API = "http://localhost:9053/restaurant/all";
const CREATE_RESTAURANT_API = "http://localhost:9053/restaurant/add";
const UPDATE_RESTAURANT_API = "http://localhost:9053/restaurant/update";
const DELETE_RESTAURANT_API = "http://localhost:9053/restaurant/delete";
const FETCH_RESTAURANT_API = "http://localhost:9053/restaurant/fetchRestaurant";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class RestaurantService {
  [x: string]: any;
  constructor(private http: HttpClient, private auth: AuthService) {}

  seacrRestaurant(key: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (key === "") {
        this.http.get(ALL_API).subscribe(
          body => resolve(body),
          error => {
            console.error(error);
            reject();
          }
        );
      } else {
        this.http.get(SEARCH_API, { params: { key: key } }).subscribe(
          body => resolve(body),
          error => {
            reject(error);
          }
        );
      }
    });
  }

  fetchRestaurant(id: any, date: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(FETCH_RESTAURANT_API, { params: { id: id, queryDate: date } })
        .subscribe(body => resolve(body), error => reject(error));
    });
  }
  createRestaurant(restaurant: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isAdmin) {
        this.http
          .post(CREATE_RESTAURANT_API, restaurant, {
            params: { access_token: this.auth.getToken() }
          })
          .subscribe(body => resolve(body), err => reject(err));
      } else {
        reject("Admin privilage required");
      }
    });
  }

  updateRestaurant(restaurant: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isAdmin) {
        this.http
          .post(UPDATE_RESTAURANT_API, restaurant, {
            params: { access_token: this.auth.getToken() }
          })
          .subscribe(body => resolve(body), err => reject(err));
      } else {
        reject("Admin privilage required");
      }
    });
  }

  deleteRestaurant(id: number) {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isAdmin) {
        this.http
          .post(
            `${DELETE_RESTAURANT_API}\\${id}?access_token=${this.auth.getToken()}`,
            {}
          )
          .subscribe(body => resolve(body), error => reject(error));
      }
    });
  }
}

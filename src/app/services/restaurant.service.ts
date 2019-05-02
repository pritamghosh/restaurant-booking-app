const SEARCH_API = "http://localhost:9053/restaurant/search";
const ALL_API = "http://localhost:9053/restaurant/all";
const CREATE_RESTAURANT_API = "http://localhost:9053/restaurant/add";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class RestaurantService {
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

  createRestaurant(restaurant: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (this.auth.isAdmin) {
        this.http
          .post(CREATE_RESTAURANT_API, restaurant, {
            params: { " access_token": this.auth.getToken() }
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
        console.error("Admin privilage required");
        reject("Admin privilage required");
      }
    });
  }
}

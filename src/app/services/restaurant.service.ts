const SEARCH_API = "http://localhost:9053/restaurant/search";
const ALL_API = "http://localhost:9053/restaurant/all";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RestaurantService {
  constructor(private http: HttpClient) {}

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
            console.error(error);
            reject();
          }
        );
      }
    });
  }
}

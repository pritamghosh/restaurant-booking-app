import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";
import { ObservableService } from "src/app/services/observable.service";

@Component({
  selector: "app-restaurant-list",
  templateUrl: "./restaurant-list.component.html",
  styleUrls: ["./restaurant-list.component.css"]
})
export class RestaurantListComponent implements OnInit {
  restaurants = [];
  constructor(
    private service: RestaurantService,
    private observableService: ObservableService
  ) {
    this.searchRestaurant("");
    this.observableService.searchKeySubject.subscribe(key =>
      this.searchRestaurant(key)
    );
  }

  ngOnInit() {}

  searchRestaurant(key: string) {
    this.service
      .seacrRestaurant(key)
      .then(resp => (this.restaurants = resp))
      .catch(err => console.error(err));
  }
}

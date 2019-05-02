import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";

@Component({
  selector: "app-manage-restaurant",
  templateUrl: "./manage-restaurant.component.html",
  styleUrls: ["./manage-restaurant.component.css"]
})
export class ManageRestaurantComponent implements OnInit {
  restaurants = [];
  constructor(private service: RestaurantService) {
    this.searchRestaurant();
  }

  ngOnInit() {}
  searchRestaurant() {
    this.service
      .seacrRestaurant("")
      .then(resp => (this.restaurants = resp))
      .catch(err => console.error(err));
  }
}

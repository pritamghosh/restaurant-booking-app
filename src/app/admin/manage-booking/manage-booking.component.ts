import { Component, OnInit } from "@angular/core";
import { ObservableService } from "src/app/services/observable.service";

@Component({
  selector: "app-manage-booking",
  templateUrl: "./manage-booking.component.html",
  styleUrls: ["./manage-booking.component.css"]
})
export class ManageBookingComponent implements OnInit {
  avticeId = "static-1";
  constructor(private observableService: ObservableService) {
    this.observableService.manageRestaurantIdSubject.subscribe(value => {
      console.log("scd");

      this.avticeId = "static-2";
    });
  }
  manageRestaurant(data: { id: any }) {
    console.log(data);
  }
  ngOnInit() {}
}

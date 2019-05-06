import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "../services/restaurant.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookingService } from "../services/booking.service";
import { AuthService } from "../services/auth.service";
import { Booking } from "../model/booking.model";
import { SelectedTable } from "../model/selected.restaurant.table.model.";
import {
  NgbDatepickerConfig,
  NgbDateStruct,
  NgbCalendar
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html",
  styleUrls: ["./restaurant-detail.component.scss"]
})
export class RestaurantDetailComponent implements OnInit {
  dateModel: NgbDateStruct;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private bookingService: BookingService,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig
  ) {
    let currentDate = new Date();
    this.config.minDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
    this.config.maxDate = { year: 2099, month: 12, day: 31 };
    this.config.outsideDays = "hidden";
  }
  restaurant: any;
  id: number;
  ngOnInit() {
    this.route.fragment.subscribe();
    this.id = +this.route.snapshot.params["id"];
    const queryDate: string = this.route.snapshot.params["queryDate"];
    let arr: string[] = queryDate.split("-");
    this.dateModel = {
      year: +arr[2],
      month: +arr[1],
      day: +arr[0]
    };
    this.restaurantService
      .fetchRestaurant(
        this.id,
        `${this.dateModel.year}-${this.dateModel.month}-${this.dateModel.day}`
      )
      .then(resp => {
        this.restaurant = resp;
        this.restaurant.queryDate = new Date(
          `${this.dateModel.month}/${this.dateModel.day}/${this.dateModel.year}`
        );
      })
      .catch(err => console.error(err));
  }

  multiply(x: number, y: number): number {
    return x * y;
  }

  onAdd(table: any) {
    if (table.noOfSelectedTables < table.avaiableNoOfTables) {
      table.noOfSelectedTables = table.noOfSelectedTables + 1;
    }
  }

  onDelete(table: any) {
    if (table.noOfSelectedTables != 0) {
      table.noOfSelectedTables = table.noOfSelectedTables - 1;
    }
  }

  getSelectedTables(): any[] {
    let selectedTables = [];
    this.restaurant.tables.forEach(table => {
      if (table.noOfSelectedTables != 0) {
        selectedTables.push(table);
      }
    });
    return selectedTables;
  }
  onReset() {
    this.restaurant.tables.forEach(table => {
      table.noOfSelectedTables = 0;
    });
  }
  isDisabled(): boolean {
    let tables = this.getSelectedTables();
    if (tables.length == 0) {
      return true;
    }
    return false;
  }

  onModifySearch() {
    this.restaurantService
      .fetchRestaurant(
        this.id,
        `${this.dateModel.day}-${this.dateModel.month}-${this.dateModel.year}`
      )
      .then(resp => {
        this.restaurant = resp;
        this.restaurant.queryDate = new Date(
          `${this.dateModel.month}/${this.dateModel.day}/${this.dateModel.year}`
        );
      })
      .catch(err => console.error(err));
  }

  onBook() {
    if (!this.authService.isLoggedIn()) {
      window.alert("Login required");
    } else {
      let username = this.authService.getUser().username;
      let tables = this.getSelectedTables();
      if (tables.length != 0) {
        let selectedTableArray = [];
        tables.forEach(table => {
          let seletedTable = new SelectedTable(
            0,
            table.noOfSelectedTables,
            table.id
          );
          selectedTableArray.push(seletedTable);
        });
        let booking = new Booking(
          0,
          username,
          100,
          this.restaurant,
          selectedTableArray,
          this.restaurant.queryDate
        );
        this.bookingService
          .newBooking(booking)
          .then(resp => {
            window.alert("Booking Successfull");
            this.onReset();
          })
          .catch(err => console.error(err));
      }
    }
  }
}

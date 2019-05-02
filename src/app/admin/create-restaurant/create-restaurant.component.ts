import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RestaurantService } from "../../services/restaurant.service";

@Component({
  selector: "app-create-restaurant",
  templateUrl: "./create-restaurant.component.html",
  styleUrls: ["./create-restaurant.component.css"]
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  tables = new FormArray([]);
  constructor(private service: RestaurantService) {}

  ngOnInit() {
    this.restaurantForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.required.bind(this)
      ]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9-]{8,}")
      ]),

      address: new FormControl(null, [
        Validators.required,
        this.required.bind(this)
      ]),

      ratingAvg: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]+(.[0-9]{0,2})")
      ]),
      tables: this.tables
    });
    this.tables.push(this.getNewTable());
  }

  getNewTable() {
    return new FormGroup({
      seatingCapacity: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{1,}")
      ]),
      totalNoOfTables: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{1,}")
      ]),

      chargesPerTable: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{1,}")
      ])
    });
  }

  onReset() {
    this.restaurantForm.reset();
    this.tables = new FormArray([]);
    this.tables.push(this.getNewTable());
  }

  onSubmit() {
    console.log(this.restaurantForm.value);
    this.service
      .createRestaurant(this.restaurantForm.value)
      .catch(err => console.error(err));
  }
  addRow() {
    this.tables.push(this.getNewTable());
  }

  deleteRow(i: number) {
    if (this.tables.length > 1) {
      this.tables.removeAt(i);
    }
  }

  required(control: FormControl): { [s: string]: boolean } {
    if (control.value == null || control.value.trim() === "") {
      return { required: true };
    }
    return null;
  }
}

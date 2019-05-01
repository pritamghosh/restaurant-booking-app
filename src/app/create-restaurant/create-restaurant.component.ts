import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-create-restaurant",
  templateUrl: "./create-restaurant.component.html",
  styleUrls: ["./create-restaurant.component.css"]
})
export class CreateRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  tables = new FormArray([]);
  constructor() {}

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
      tables: this.tables
    });
    this.tables.push(this.getNewTable());
  }

  getNewTable() {
    return new FormGroup({
      seatingCapacity: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9-]")
      ]),
      totalNoOfTables: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9-]")
      ]),

      chargesPerTable: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9-]")
      ])
    });
  }

  required(control: FormControl): { [s: string]: boolean } {
    if (control.value == null || control.value.trim() === "") {
      return { required: true };
    }
    return null;
  }
}

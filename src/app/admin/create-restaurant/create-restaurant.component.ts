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
        Validators.pattern("[0-9]+(.{0,1}[0-9]{0,2})")
      ]),
      tables: this.tables
    });
    this.tables.push(this.getNewTable());
  }

  getNewTable() {
    return new FormGroup({
      seatingCapacity: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{1,}"),
        this.duplicateRow.bind(this)
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
    this.service
      .createRestaurant(this.restaurantForm.value)
      .then(resp => {
        window.alert("Restaurant Has Been Created!!");
        this.onReset();
      })
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

  duplicateRow(control: FormControl) {
    let freqMap = new Map<number, number>();

    this.tables.controls.forEach(ctrl => {
      let val = ctrl.get("seatingCapacity").value;
      if (freqMap.get(val) == null) {
        freqMap.set(val, 1);
      } else {
        freqMap.set(val, freqMap.get(val) + 1);
      }
    });
    this.tables.controls.forEach(ctrl => {
      let val = ctrl.get("seatingCapacity").value;
      if (val == null || val == "") {
        ctrl.get("seatingCapacity").setErrors({ required: true });
      } else if (freqMap.get(val) > 1) {
        ctrl.get("seatingCapacity").setErrors({ duplicateRow: true });
      } else {
        ctrl.get("seatingCapacity").setErrors(null);
      }
    });
    if (freqMap.get(control.value) > 1) {
      return { duplicateRow: true };
    }
    return null;
  }
}

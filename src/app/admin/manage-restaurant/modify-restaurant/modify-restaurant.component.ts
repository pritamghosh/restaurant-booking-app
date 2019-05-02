import { Component, OnInit, Input } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";
import { FormGroup, FormArray, Validators, FormControl } from "@angular/forms";

@Component({
  selector: "app-modify-restaurant",
  templateUrl: "./modify-restaurant.component.html",
  styleUrls: ["./modify-restaurant.component.css"]
})
export class ModifyRestaurantComponent implements OnInit {
  @Input("restaurant") restaurant: any;

  restaurantForm: FormGroup;
  tables = new FormArray([]);
  constructor(private service: RestaurantService) {}

  ngOnInit() {
    this.restaurantForm = this.populateForm();
  }
  populateForm() {
    return new FormGroup({
      name: new FormControl(this.restaurant.name, [
        Validators.required,
        this.required.bind(this)
      ]),
      contact: new FormControl(this.restaurant.contact, [
        Validators.required,
        Validators.pattern("[0-9-]{8,}")
      ]),

      address: new FormControl(this.restaurant.address, [
        Validators.required,
        this.required.bind(this)
      ]),

      ratingAvg: new FormControl(this.restaurant.ratingAvg, [
        Validators.required,
        Validators.pattern("[0-9]+(.{0,1}[0-9]{0,2})")
      ]),
      tables: this.populateTable()
    });
  }
  populateTable() {
    this.tables = new FormArray([]);
    this.restaurant.tables.forEach(table => {
      this.tables.push(
        new FormGroup({
          seatingCapacity: new FormControl(table.seatingCapacity, [
            Validators.required,
            Validators.pattern("[0-9]{1,}")
          ]),
          totalNoOfTables: new FormControl(table.totalNoOfTables, [
            Validators.required,
            Validators.pattern("[0-9]{1,}")
          ]),

          chargesPerTable: new FormControl(table.chargesPerTable, [
            Validators.required,
            Validators.pattern("[0-9]{1,}")
          ])
        })
      );
    });
    return this.tables;
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
    this.restaurantForm = this.populateForm();
  }

  deleteRestaurant(id: number) {
    console.log(id);
  }

  onSubmit() {
    console.log(this.restaurantForm.value);
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
}

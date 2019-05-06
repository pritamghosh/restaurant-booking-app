import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ObservableService } from "../services/observable.service";
import {
  NgbDateStruct,
  NgbCalendar,
  NgbDatepickerConfig
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  username = "User";
  searchFrom: FormGroup;
  model: NgbDateStruct;
  constructor(
    private auth: AuthService,
    private observableService: ObservableService,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig
  ) {
    this.model = this.calendar.getToday();
    let currentDate = new Date();
    this.config.minDate = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
    this.config.maxDate = { year: 2099, month: 12, day: 31 };

    this.config.outsideDays = "hidden";
    this.populateUserName();
    this.observableService.isLoggedInSubject.subscribe(value => {
      this.populateUserName();
    });
  }
  populateUserName() {
    if (this.auth.getUser() != null) {
      this.username = this.auth.getUser().name;
    } else {
      this.username = "User";
    }
  }
  onSubmit() {
    this.observableService.searchKeySubject.next(
      this.searchFrom.get("search").value
    );
    console.log(this.model);
  }

  ngOnInit() {
    this.searchFrom = new FormGroup({
      search: new FormControl(null, [Validators.required])
    });
  }
}

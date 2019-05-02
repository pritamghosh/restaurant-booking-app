import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ObservableService } from "../services/observable.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  username = "User";
  searchFrom : FormGroup
  constructor(private auth: AuthService, private observableService: ObservableService) {
    if (this.auth.getUser() != null) {
      this.username = this.auth.getUser().name;
    } else {
      this.username = "User";
    }
  }

  onSubmit(){
    this.observableService.searchKeySubject.next(this.searchFrom.get('search').value);
  }

  ngOnInit() {
    this.searchFrom = new FormGroup({
      search: new FormControl(null, [
        Validators.required
      ])
  }
}

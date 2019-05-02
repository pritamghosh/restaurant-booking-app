import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { ObservableService } from "../services/observable.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth: AuthService,private observableService:ObservableService) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.observableService.isLoggedInSubject.subscribe(isLoggedinParam => {
      this.isLoggedIn = isLoggedinParam;
    });
  }

  ngOnInit() {}
  signOut() {
    this.auth.signOut();
  }
}

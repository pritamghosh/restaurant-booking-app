import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private auth: AuthService) {
    this.auth.isLoggedIn$.subscribe(isLoggedinParam => {
      this.isLoggedIn = isLoggedinParam;
    });
  }

  ngOnInit() {}
  signOut() {
    this.auth.signOut();
  }
}

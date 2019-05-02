import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  constructor(
    private service: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onReset() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.service.login(this.loginForm.value).then(resp => {
      this.router
        .navigateByUrl(this.returnUrl)
        .catch(err => console.error(err));
    });
  }
}

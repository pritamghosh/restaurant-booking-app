import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RegistrationService } from "../services/registration.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private service: RegistrationService, private router: Router) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.required.bind(this)
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9-]{8,}")
      ]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        this.passwordMatcher.bind(this)
      ]),
      confpassword: new FormControl(null, [
        Validators.required,
        this.confpasswordMatcher.bind(this)
      ]),
      address: new FormControl(null, [
        Validators.required,
        this.required.bind(this)
      ])
    });

    this.registrationForm.valueChanges.subscribe(value => {
      //  console.log(this.registrationForm);
    });
  }

  onReset() {
    this.registrationForm.reset();
  }

  onSubmit() {
    this.service
      .signUp(this.registrationForm.value)
      .then(resp => this.router.navigate(["login"]))
      .catch(err => {
        console.log(err);
        window.alert("Error Occured!!");
      });
  }

  required(control: FormControl): { [s: string]: boolean } {
    if (control.value == null || control.value.trim() === "") {
      return { required: true };
    }
    return null;
  }

  passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (this.registrationForm != null) {
      const password: string = this.registrationForm.get("password").value;
      const confirmPassword: string = this.registrationForm.get("confpassword")
        .value;
      if (password === confirmPassword) {
        return null;
      }

      this.registrationForm
        .get("confpassword")
        .setErrors({ NoPassswordMatch: true });
    }
  }

  confpasswordMatcher(control: FormControl): { [s: string]: boolean } {
    if (this.registrationForm != null) {
      const password: string = this.registrationForm.get("password").value;
      if (password !== control.value) {
        return { NoPassswordMatch: true };
      }
    }
    return null;
  }
}

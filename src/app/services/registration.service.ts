import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  signUp(registration: any) {
    this.http
      .post("http://localhost:9052/create/user", registration)
      .subscribe(resp => {
        console.log(resp);
      });
  }
}

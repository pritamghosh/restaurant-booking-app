import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {}

  signUp(registration: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post("http://localhost:9052/create/user", registration)
        .subscribe(
          resp => {
            resolve(resp);
          },
          err => reject(err)
        );
    });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()
export class LoginService {
  returnUrl: string;
  constructor(private http: HttpClient, private auth: AuthService) {}

  login(login: any): Promise<any> {
    this.auth.signOut();
    return new Promise((resolve, reject) => {
      this.http.post("/user/login", login).subscribe(
        resp => {
          this.auth.savetoContext(resp);
          resolve(true);
        },
        error => {
          reject(error);
        }
      );
    });
  }
}

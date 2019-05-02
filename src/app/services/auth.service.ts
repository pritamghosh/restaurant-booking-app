const LOGIN_INFO_KEY = "loginInfo";

import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
import { ObservableService } from "./observable.service";
@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private observableService: ObservableService
  ) {}

  public savetoContext(resp: any) {
    if (resp != null) {
      sessionStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(resp));
      this.observableService.isLoggedInSubject.next(true);
      this.observableService.isAdminSubject.next(resp.roles.includes("ADMIN"));
    }
  }

  isLoggedIn(): boolean {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    return resp != null;
  }

  isAdmin(): boolean {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    return resp != null && JSON.parse(resp).roles.includes("ADMIN");
  }

  getUser(): any {
    sessionStorage.getItem(LOGIN_INFO_KEY);
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    if (resp != null) {
      return JSON.parse(resp);
    }
    return null;
  }
  getToken(): any {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    if (resp != null) {
      return JSON.parse(resp).tokenInfo.access_token;
    }
    return null;
  }

  public clearContext() {
    sessionStorage.removeItem(LOGIN_INFO_KEY);
    this.observableService.isLoggedInSubject.next(false);
    this.observableService.isAdminSubject.next(false);
  }
  public signOut() {
    this.clearContext();
    this.router.navigateByUrl("/");
  }
}

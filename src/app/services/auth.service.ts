const LOGIN_INFO_KEY = "loginInfo";

import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Router } from "@angular/router";
@Injectable()
export class AuthService {
  isLoggedInSubject = new Subject<boolean>();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  isAdminSubject = new Subject<boolean>();
  isAdmin$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  constructor(private router: Router) {}

  public savetoContext(resp: any) {
    if (resp != null) {
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(resp.roles.includes("ADMIN"));
      sessionStorage.setItem(LOGIN_INFO_KEY, JSON.stringify(resp));
    }
  }

  isLoggedIn(): boolean {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    return resp != null;
  }

  getUser(): any {
    let resp = sessionStorage.getItem(LOGIN_INFO_KEY);
    if (resp != null) {
      return JSON.parse(resp);
    }
    return null;
  }

  public clearContext() {
    sessionStorage.removeItem(LOGIN_INFO_KEY);
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
  public signOut() {
    this.clearContext();
    this.router.navigateByUrl("/");
  }
}

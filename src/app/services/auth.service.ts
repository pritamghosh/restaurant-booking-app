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
      localStorage.setItem("loginInfo", JSON.stringify(resp));
    }
  }

  public clearContext() {
    localStorage.removeItem("loginInfo");
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
  public signOut() {
    this.clearContext();
    this.router.navigateByUrl("/");
  }
}

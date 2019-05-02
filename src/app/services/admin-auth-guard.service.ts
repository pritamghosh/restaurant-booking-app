import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ObservableService } from "./observable.service";
@Injectable()
export class AdminAuthGuard implements CanActivate {
  isLoggedIn = false;
  isAdmin = false;
  constructor(private auth: AuthService, private router: Router,private observableService:ObservableService) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isAdmin = this.auth.isAdmin();
    this.observableService.isLoggedInSubject.subscribe(isLoggedinParam => {
      this.isLoggedIn = isLoggedinParam;
    });
    this.observableService.isAdminSubject.subscribe(isAdminParam => {
      console.log(isAdminParam+'lklklklkl');
      
      this.isAdmin = isAdminParam;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    console.log(this.isAdmin+"kjkjkjk");
    
    if (this.isLoggedIn&&this.isAdmin) {
      return true;
    }
    window.alert("Please Log in as Admin !!")
    this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

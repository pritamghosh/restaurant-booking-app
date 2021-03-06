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
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
  isAdmin = false;
  constructor(private auth: AuthService, private router: Router,private observableService:ObservableService) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.observableService.isLoggedInSubject.subscribe(isLoggedinParam => {
      this.isLoggedIn = isLoggedinParam;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isLoggedIn) {
      return true;
    }
    this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

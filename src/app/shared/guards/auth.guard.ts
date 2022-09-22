import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";
import { IdentityUserView } from "../../models/user";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtAuth: JwtAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: IdentityUserView = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          // logged in so return true
          /* if(route.data.roles && route.data.roles.indexOf(currentUser.roleName) === -1) { */
            /* this.router.navigate(['/mainten/error'], { queryParams: { returnUrl: state.url } }); */
            return true;
          /* }
          return true; */
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}

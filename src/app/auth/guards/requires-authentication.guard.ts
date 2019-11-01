import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class RequiresAuthenticationGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated: boolean = this.authService.hasValidAccessToken() && this.authService.hasValidIdToken();
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/error', 'sign-in']);
      return false;
    }

  }

}

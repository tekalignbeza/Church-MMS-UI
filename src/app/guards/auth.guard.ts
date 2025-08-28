import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../back-service/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    
    if (isLoggedIn && !this.authService.isTokenExpired()) {
      // Check if route requires specific roles
      const requiredRoles = route.data.roles as Array<string>;
      if (requiredRoles && requiredRoles.length > 0) {
        if (!this.authService.hasAnyRole(requiredRoles)) {
          // User doesn't have required role, redirect to dashboard or unauthorized page
          this.router.navigate(['/dashboard']);
          return false;
        }
      }
      return true;
    }

    // Not logged in or token expired, redirect to login page with return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
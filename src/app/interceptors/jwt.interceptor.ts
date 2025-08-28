import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../back-service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const token = this.authService.getToken();
    const isApiUrl = request.url.startsWith(environment.apiBaseUrl);
    const isAuthUrl = request.url.includes('/auth/');

    // Add auth header with jwt if user is logged in and request is to api and not to auth endpoints
    if (token && isApiUrl && !isAuthUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Auto logout if 401 response returned from api
        if (error.status === 401 && isApiUrl && !isAuthUrl) {
          this.authService.logout();
        }
        
        return throwError(error);
      })
    );
  }
}
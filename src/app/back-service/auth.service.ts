import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginRequest } from './model/loginRequest';
import { JwtAuthenticationResponse } from './model/jwtAuthenticationResponse';
import { RegisterRequest } from './model/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.apiBaseUrl + '/auth';
  private tokenKey = 'jwt_token';
  private userKey = 'current_user';
  
  private currentUserSubject: BehaviorSubject<JwtAuthenticationResponse | null>;
  public currentUser: Observable<JwtAuthenticationResponse | null>;
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem(this.userKey);
    this.currentUserSubject = new BehaviorSubject<JwtAuthenticationResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtAuthenticationResponse | null {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
    }
    return this.httpOptions.headers;
  }

  login(loginRequest: LoginRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(
      `${this.authUrl}/login`, 
      loginRequest, 
      this.httpOptions
    ).pipe(
      tap(response => {
        // Store JWT token and user info
        localStorage.setItem(this.tokenKey, response.accessToken);
        localStorage.setItem(this.userKey, JSON.stringify(response));
        this.currentUserSubject.next(response);
      }),
      catchError(this.handleError)
    );
  }

  register(registerRequest: RegisterRequest): Observable<JwtAuthenticationResponse> {
    return this.http.post<JwtAuthenticationResponse>(
      `${this.authUrl}/register`, 
      registerRequest, 
      this.httpOptions
    ).pipe(
      tap(response => {
        // Store JWT token and user info
        localStorage.setItem(this.tokenKey, response.accessToken);
        localStorage.setItem(this.userKey, JSON.stringify(response));
        this.currentUserSubject.next(response);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Remove user from local storage and set current user to null
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= exp;
    } catch (error) {
      return true;
    }
  }

  refreshTokenIfNeeded(): void {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    return user ? roles.includes(user.role) : false;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.error && typeof error.error === 'string') {
      // Server returned error message as string
      errorMessage = error.error;
    } else if (error.error && error.error.message) {
      // Server returned error object with message
      errorMessage = error.error.message;
    } else if (error.message) {
      // HTTP error message
      errorMessage = error.message;
    }
    
    console.error('Auth Service Error:', error);
    return throwError(errorMessage);
  }
}
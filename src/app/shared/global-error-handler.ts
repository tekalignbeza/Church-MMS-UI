import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse): void {
    const router = this.injector.get(Router);
    let errorMessage = 'An unexpected error occurred';
    let shouldRedirect = false;

    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      switch (error.status) {
        case 401:
          errorMessage = 'Session expired. Please login again.';
          shouldRedirect = true;
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal server error. Please try again later.';
          break;
        case 0:
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
          break;
        default:
          errorMessage = error.error?.message || error.message || errorMessage;
      }

      // Log HTTP errors in development
      if (environment.enableLogging) {
        console.error('HTTP Error:', {
          status: error.status,
          message: error.message,
          url: error.url,
          timestamp: new Date().toISOString()
        });
      }

    } else {
      // Handle JavaScript/Angular errors
      errorMessage = error.message || errorMessage;

      // Log JavaScript errors in development
      if (environment.enableLogging) {
        console.error('JavaScript Error:', {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString()
        });
      }
    }

    // Show user-friendly error message
    this.showErrorToUser(errorMessage);

    // Redirect to login if authentication error
    if (shouldRedirect) {
      router.navigate(['/login']);
    }

    // In production, you might want to send errors to a logging service
    if (environment.production) {
      // Example: Send to logging service
      // this.sendToLoggingService(error);
    }
  }

  private showErrorToUser(message: string): void {
    // For now, use a simple alert. In production, you might use a toast or snackbar
    // You could also dispatch to a global error state management system
    console.error('User Error:', message);
    
    // TODO: Replace with proper user notification system (e.g., MatSnackBar)
    if (typeof window !== 'undefined') {
      // Only show alerts for critical errors to avoid spam
      if (message.includes('server') || message.includes('connection') || message.includes('Session expired')) {
        alert(message);
      }
    }
  }

  // Example method for sending errors to a logging service
  private sendToLoggingService(error: any): void {
    // Example implementation:
    // this.http.post('/api/logs/error', {
    //   error: error.message,
    //   stack: error.stack,
    //   url: window.location.href,
    //   userAgent: navigator.userAgent,
    //   timestamp: new Date().toISOString()
    // }).subscribe();
  }
}
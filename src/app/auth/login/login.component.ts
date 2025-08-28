import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/back-service/auth.service';
import { LoginRequest } from 'src/app/back-service/model/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // Getter for form controls
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const loginRequest: LoginRequest = {
      username: this.f.username.value,
      password: this.f.password.value
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.showSuccess(`Welcome back, ${response.username}!`);
        this.router.navigate([this.returnUrl]);
      },
      error: (error) => {
        this.isLoading = false;
        this.showError(error || 'Login failed. Please check your credentials.');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.f[controlName];
    if (!control || !control.errors) return '';
    
    if (control.hasError('required')) {
      return `${this.getFieldDisplayName(controlName)} is required`;
    }
    if (control.hasError('minlength')) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `${this.getFieldDisplayName(controlName)} must be at least ${requiredLength} characters`;
    }
    return '';
  }

  private getFieldDisplayName(controlName: string): string {
    const fieldNames: { [key: string]: string } = {
      username: 'Username',
      password: 'Password'
    };
    return fieldNames[controlName] || controlName;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}

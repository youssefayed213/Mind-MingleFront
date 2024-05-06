import { Component } from '@angular/core';
import {AuthService} from "../service/auth-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.authService.forgotPassword(this.email)
      .subscribe(
        () => {
          this.successMessage = 'Reset password link sent to your email';
          this.errorMessage = null;
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // Ignore parsing error if status is 200
            console.log('Reset password link sent to your email');
            // Set success message
            this.successMessage = 'Reset password link sent to your email';
          } else {
            console.error('Failed to reset password:', error);
            // Set error message
            this.errorMessage = 'Failed to reset password. Please try again.';
          }
        }
      );
  }

}

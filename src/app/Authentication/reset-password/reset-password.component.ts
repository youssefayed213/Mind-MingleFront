import { Component } from '@angular/core';
import {AuthService} from "../service/auth-service.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  newPassword: string = '';
  resetToken: string | null = null;
  successMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'] || null;
      if (this.resetToken) {
        // Store the reset token in a cookie
        this.cookieService.set('token', this.resetToken);
      }
    });
  }

  resetPassword(): void {
    if (this.newPassword) {
      this.authService.resetPassword(this.newPassword).subscribe(
        () => {
          console.log('Password reset successfully');
          // Optionally, clear the reset token from the cookie after successful reset
          this.cookieService.delete('token');
          // Set success message
          this.successMessage = 'Password reset successfully';
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // Ignore parsing error if status is 200
            console.log('Password reset successfully');
            // Optionally, clear the reset token from the cookie after successful reset
            this.cookieService.delete('token');
            // Set success message
            this.successMessage = 'Password reset successfully';
          } else {
            console.error('Failed to reset password:', error);
            // Set error message
            this.successMessage = 'Failed to reset password. Please try again.';
          }
        }
      );
    } else {
      console.error('New password is required.');
      // Set error message
      this.successMessage = 'New password is required.';
    }
  }




}

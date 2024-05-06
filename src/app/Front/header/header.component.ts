import { Component } from '@angular/core';

import {AuthService} from "../../Authentication/service/auth-service.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    // Check if token exists in the cookie
    return !!this.cookieService.get('token');
  }

  logout(): void {
    // Perform logout actions using your authentication service
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
        this.router.navigate(['signin']);
        // Additional logout actions if needed
      },
      (error) => {
        console.error('Logout failed:', error);
        // Handle logout failure
      }
    );
    this.router.navigate(['signin']);

  }

}

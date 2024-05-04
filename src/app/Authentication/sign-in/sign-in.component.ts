import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth-service.service";
import {ToastrService} from "ngx-toastr";

import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  confirmed: boolean = false;

  username: string = '';
  password: string = '';

  usernameOfToken: string = ''; // Initialize as empty string

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.confirmed = params['confirmed'] === 'true';
    });
    this.login()
  }




  login() {
    if (!this.username || !this.password) {
      this.toastr.error('Please provide username and password.', 'Error');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (data) => {

        const token = data.token;
        this.usernameOfToken = data.usernameOfToken;
        console.log("Username of token: " + this.usernameOfToken);

        // Store usernameOfToken in a cookie
        this.cookieService.set('username', this.usernameOfToken);

        // Handle successful login
        console.log('Login successful');
        this.router.navigate(['/profile']); // Navigate to dashboard or desired route on success
        this.toastr.success('Login successful!', 'Success');
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
        this.toastr.error('Invalid credentials. Please try again.', 'Error');
        // Optionally reset form fields here
      }
    );
  }

}

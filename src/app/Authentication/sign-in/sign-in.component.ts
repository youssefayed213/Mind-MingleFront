import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../service/auth-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  confirmed: boolean = false;

  username: string = '';
  password: string = '';


  constructor(private route: ActivatedRoute,private authService: AuthService,private toastr: ToastrService,private router: Router,) { }


  ngOnInit(): void {
    // Check if the 'confirmed' query parameter is present
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

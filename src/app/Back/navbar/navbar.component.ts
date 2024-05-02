import { Component } from '@angular/core';
import {AuthService} from "../../Authentication/service/auth-service.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }


  logout(): void {
    console.log('Logout button clicked');
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
       this.router.navigate(['signin']); // Redirect to signin page after logout
      },
      (error) => {
        console.error('Logout failed:', error);
        this.toastr.error('Failed to logout. Please try again.', 'Error');
      }
    );


  }


}

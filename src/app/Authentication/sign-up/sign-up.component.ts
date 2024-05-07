import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth-service.service";
import {User} from "../../models/User";
import {RoleUser} from "../../models/RoleUser";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  submitting: boolean = false;
  user: User = {
    idUser: 0,
    nomUser: '',
    prenomUser: '',
    email: '',
    username: '',
    password: '',
    dateNaiss: new Date(), // Initialize with default date or leave it empty
    tel: '',
    role: RoleUser.Etudiant, // Initialize with default role or leave it empty
    numEtudiant: null,
    numEnseignant: null,
    numExpert: null,
    confirmationToken: '',
    blocked: false,
    failedLoginAttempts: 0,
    imageProfil: null, // Initialize with null or leave it empty
    totalFeedbackScore: 0,
    totalFeedbackSubmissions: 0
  };

  constructor(private authService: AuthService,private toastr: ToastrService) { }


  ngOnInit(): void {
  }

  signUp(userForm: NgForm): void {
    // Check if the selected role requires a number
    if ((this.user.role === RoleUser.Etudiant && this.user.numEtudiant === null) ||
      (this.user.role === RoleUser.Enseignant && this.user.numEnseignant === null)) {
      console.error('Please enter a valid number for the selected role.');
      return; // Prevent further execution
    }

    this.submitting = true; // Disable submit button
    this.authService.register(this.user).subscribe(
      (res: User) => {
        console.log(res);
        userForm.resetForm();
        this.submitting = false;
        this.toastr.success('Please confirm your account', 'Confirmation');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        userForm.resetForm();
        this.submitting = false;
        this.toastr.success('Please confirm your account', 'Confirmation');
      }
    );
  }



}

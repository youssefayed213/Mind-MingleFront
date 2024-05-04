import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../../models/User";
import {ToastrService} from "ngx-toastr";
import {RoleUser} from "../../models/RoleUser";
import {Router} from "@angular/router";
import {ProfileService} from "../service/profile-service.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: User[] = [];
  newUser: User = {
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
  showAddUserForm = false;
  dateNaisse =  new Date();
  rolee = RoleUser.Etudiant;
  editingUserId: number | null = null; // Track the user being edited


  searchTerm: string = ''; // Search term for filtering users

  constructor(private userService: UserService,private toastr: ToastrService,private router: Router,private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
  }


  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        console.log('Users displayed successefully');
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
    this.resetForm();
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(
      (newUser: User) => {
        this.toastr.success('User added successfully!');

        console.log('User added successefully');
        this.loadUsers(); // Refresh user list
        this.showAddUserForm = false;
      },
      (error) => {
        console.error('Error adding user:', error);
        this.toastr.error('Failed to add user. Please try again.');
      }
    );
  }
  updateUser(newUser: User): void {
    this.userService.updateUser(newUser).subscribe(
      (updatedUser: User) => {
        this.toastr.success('User updated successfully!');
        console.log('User updated successefully');
        this.loadUsers(); // Refresh user list
        this.editingUserId = null; // Clear editing state
        this.resetForm();
      },
      (error) => {
        console.error('Error updating user:', error);
        this.toastr.error('Failed to update user. Please try again.');
      }
    );
  }
  cancelAddUser(): void {
    this.toggleAddUserForm(); // Simply close the form without submitting
  }

  cancelUpdate(): void {
    this.editingUserId = null; // Cancel editing mode
    this.resetForm(); // Reset form fields
  }
  resetForm(): void {
    this.newUser.idUser=0;
    this.newUser.nomUser="";
    this.newUser.prenomUser="";
    this.newUser.tel="";
    this.newUser.email="";
    this.newUser.username="";
    this.newUser.password="";
    this.newUser.dateNaiss = this.dateNaisse;
    this.newUser.role = this.rolee;
    this.newUser.blocked = false;
    this.newUser.confirmationToken = "";
    this.newUser.imageProfil = null;
    this.newUser.failedLoginAttempts = 0;
    this.newUser.totalFeedbackScore = 0;
    this.newUser.totalFeedbackSubmissions = 0;

  }
  copyUser(user: User): void {
    this.newUser = { ...user }; // Create a copy of the user object
  }
  // Method to delete a user
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.toastr.success('User deleted successfully!');
        console.log('User deleted successefully');
        this.loadUsers(); // Refresh user list
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.toastr.error('Failed to delete user. Please try again.');
      }
    );
  }
  getUserProfileImage(user: User): string {
    if (user.imageProfil) {
      // Convert the image file to base64 and return it
      return 'data:image/jpeg;base64,' + user.imageProfil;
    } else {
      // Return the path to the default image
      return '/assets/Back/img/bruce-mars.jpg';
    }
  }

  filterUsers(): void {
    if (!this.searchTerm) {
      // If search term is empty, show all users
      this.loadUsers();
    } else {
      // Filter users by first name and last name
      const [prenom, nom] = this.searchTerm.split(' ');
      if (prenom && nom) {
        // Call the API to filter users by first name and last name
        this.userService.getUsersByFirstNameAndLastName(prenom, nom)
          .subscribe(users => {
            this.users = users;
            console.log('Filtered users:', users);
          }, error => {
            console.error('Error filtering users:', error);
          });
      } else if (prenom) {
        // Call the API to filter users by first name only
        this.userService.getUserByPrenom(prenom)
          .subscribe(users => {
            this.users = users;
            console.log('Filtered users:', users);
          }, error => {
            console.error('Error filtering users:', error);
          });
      } else if (nom) {
        // Call the API to filter users by last name only
        this.userService.getUserByNom(nom)
          .subscribe(users => {
            this.users = users;
            console.log('Filtered users:', users);
          }, error => {
            console.error('Error filtering users:', error);
          });
      }
    }
  }


}

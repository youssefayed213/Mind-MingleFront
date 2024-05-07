import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {ProfileService} from "../service/profile-service.service";
import {RoleUser} from "../../models/RoleUser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

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

  base64Image: string | undefined;
  selectedFile: File | null = null;
  retrievedImage: any;
  base64Data: any;
  editMode: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe(
      (data: User) => {
        this.user = data;

        if (data.imageProfil) {
          // If the image is defined, display it
          this.base64Image = 'data:image/jpeg;base64,' + data.imageProfil;
        } else {
          // If the image is not defined, display the default image
          this.base64Image = '/assets/Back/img/bruce-mars.jpg';
        }
      },
      (error) => {
        console.error('Failed to load profile:', error);
      }
    );
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.profileService.uploadProfileImage(this.selectedFile).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Reload profile after upload
          this.loadProfile();
        },
        (error) => {
          console.error('Failed to upload file:', error);
          this.loadProfile();
        }
      );
    } else {
      console.error('No file selected.');
    }
  }

  updateProfile(): void {
    this.profileService.updateProfile(this.user).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        // Reload profile after update
        this.loadProfile();
      },
      (error) => {
        console.error('Failed to update profile:', error);
      }
    );
  }

  getProfileImageUrl(): string {
    if (!this.base64Image) {
      return ''; // Return empty string if base64Image is not defined
    }

    // Determine the image format based on the base64Image string
    const format = this.base64Image.startsWith('/9j/') ? 'jpeg' : 'png';
    return `data:image/${format};base64,${this.base64Image}`;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode; // Toggle edit mode
  }

  onSaveChanges(): void {
    // Call updateProfile method to save changes
    this.updateProfile();
    // Toggle edit mode after saving changes
    this.toggleEditMode();
  }
  cancelEdit(): void {
    // Reset the user object to its original state
    this.loadProfile();

    // Exit edit mode
    this.editMode = false;
  }
}

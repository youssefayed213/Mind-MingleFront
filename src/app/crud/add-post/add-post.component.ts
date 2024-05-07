import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from "../../service/Post/post.service";
import { Post, TypePost } from 'src/app/model/Post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  BlocForm: FormGroup;
  formSubmitted = false;
  typePostValues: string[] = [];

  constructor(
    private service: PostService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    let formControls = {
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      typePost: new FormControl('', Validators.required),
      imageFile: new FormControl(null, Validators.required) // Ajoutez le contrôle pour l'image
    };
    this.BlocForm = this.fb.group(formControls);
    this.typePostValues = Object.values(TypePost).filter(value => typeof value === 'string') as string[];
  }

  get titre() { return this.BlocForm.get('titre'); }
  get description() { return this.BlocForm.get('description'); }
  get typePost() { return this.BlocForm.get('typePost'); }
  get imageFile() { return this.BlocForm.get('imageFile'); }

  validateField(field: string) {
    return (
      this.BlocForm.get(field)?.invalid &&
      (this.BlocForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.BlocForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    return '';
  }

  addPost() {
    this.formSubmitted = true;
    if (this.BlocForm.invalid) {
      return;
    }

    const data = this.BlocForm.value;

    const newPost: Post = {
      titre: data.titre,
      description: data.description,
      typePost: data.typePost as TypePost, // Utilisez le type TypePost
    };

    const userId = 1; // Remplacez 1 par l'ID de l'utilisateur connecté
    this.service.addPostWithImageToUser(userId, newPost, data.imageFile).subscribe(
      res => {
        console.log(res);
        console.log('Ajout réussi ', res);
        // Rediriger vers une autre page après l'ajout réussi si nécessaire
        this.router.navigate(['/ListPosts']); // Remplacez '/posts' par le chemin de votre choix
      },
      err => {
        console.error('Erreur lors de l\'ajout du post :', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Error:', err.error);
        }
      }
    );
  }


  onFileSelected(event: any) {
    const file = event.target.files[0]; // Récupérer le fichier sélectionné
    this.BlocForm.patchValue({ imageFile: file }); // Mettre à jour la valeur du contrôle imageFile
  }
}

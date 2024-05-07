import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { PostService } from "../../service/Post/post.service";
import { Observable } from "rxjs";
import { TypePost } from "../../model/Post";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  idPost: number;
  idUser: number = 1;
  updatedPost: any = {};
  imageFile: File;
  typePostOptions: string[] = [];
  BlocForm: FormGroup;
  userId: number = 0;
  constructor(private route: ActivatedRoute, private postService: PostService ,   private router: Router,
              private httpClient: HttpClient,private cookieService: CookieService) {
    this.idPost = 0;
    this.imageFile = new File([], 'default');
    this.typePostOptions = Object.values(TypePost).filter(value => typeof value === 'string') as string[];

    this.BlocForm = new FormGroup({
      titre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      typePost: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const idPostParam = this.route.snapshot.paramMap.get('idPost');
    if (idPostParam!== null) {
      this.idPost = +idPostParam;
      this.getOriginalPost().subscribe(
        (response: any) => {
          this.updatedPost = response;
          this.BlocForm.patchValue({
            titre: this.updatedPost.titre,
            description: this.updatedPost.description,
            typePost: this.updatedPost.typePost,
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.error("Parameter 'idPost' is missing in the URL.");
    }
    this.getUserByUsername();
  }
  getUserByUsername() {
    const username = this.cookieService.get('username');

    // Make the HTTP GET request to the provided URL
    this.httpClient.get<any>('http://localhost:8085/minds/api/home/findByUsername/' + username)
      .subscribe(
        (response) => {
          // Extract the idUser field from the response
          this.userId = response.idUser;
          // Log the idUser to the console
          console.log('User ID:', this.userId);
        },
        (error) => {
          // Handle errors if any
          console.error('Error fetching user:', error);
        }
      );
  }


  getOriginalPost(): Observable<any> {
    return this.postService.getPostById(this.idPost);
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  updatePost(): void {
    this.postService.updatePost(this.idUser, this.idPost, this.BlocForm.value.titre, this.BlocForm.value.description, this.BlocForm.value.typePost, this.imageFile)
      .subscribe(
        (response: any) => {
          this.updatedPost.image = response.imageUrl;
          console.log(response);
          this.router.navigate(['/blog-details', this.idPost]);

        },
        error => {
          console.log(error);
        }
      );
  }

  getErrorMessage(fieldName: string): string {
    const control = this.BlocForm.get(fieldName);
    return control?.hasError('required')? 'Ce champ est requis' : '';
  }

  navigateToUpdatePost() {
    const idPostParam = this.route.snapshot.paramMap.get('idPost');
    if (idPostParam !== null) {
      const postId = +idPostParam;
      this.router.navigate(['/blog-details', postId]); // Rediriger vers la page de détails du message mis à jour
    } else {
      console.error("Parameter 'idPost' is undefined");
    }
  }


}

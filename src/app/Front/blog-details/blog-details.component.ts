import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { PostService } from "../../service/Post/post.service";
import { CommentaireService } from "../../service/Commentaire/commentaire.service";
import { Post } from "../../model/Post";
import { Commentaire } from "../../model/Commentaire";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {


  postId?: number;
  post$?: Observable<Post>;
  commentaires$?: Observable<Commentaire[]>;
  formMessage: string = '';
  editingCommentId: number | null = null; // Ajouter une variable pour stocker l'ID du commentaire en cours d'édition

  userId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentaireService: CommentaireService,
    private router: Router,private httpClient: HttpClient,private cookieService: CookieService

  ) {}

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam!== null) {
      this.postId = +postIdParam;
      this.loadPostDetails();
      this.loadPostComments();
    } else {
      console.error("postId is undefined");
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
  loadPostDetails(): void {
    if (typeof this.postId === 'number') {
      this.post$ = this.postService.retrievePost(this.postId);
      this.post$.subscribe(post => console.log(post.titre));
    } else {
      console.error("postId is undefined");
    }
  }

  loadPostComments(): void {
    if (typeof this.postId === 'number') {
      this.commentaires$ = this.commentaireService.getCommentsByPostId(this.postId);
      this.commentaires$.subscribe(commentaires => console.log(commentaires));
    } else {
      console.error("postId is undefined");
    }
  }

  addCommentToPost(comment: string): void {
    if (this.postId) {

      const newComment = new Commentaire(undefined, comment, new Date());
      this.commentaireService.addComment(this.postId, this.userId, newComment).subscribe(
        res => {
          console.log('Commentaire ajouté avec succès:', res);
          this.loadPostDetails();
          this.loadPostComments();
        },
        err => {
          console.error('Erreur lors de l\'ajout du commentaire:', err);
          // Utilisation de window.alert pour afficher un message d'erreur
          window.alert("Your comment does not comply with the general rules of the group.");
        }
      );
    } else {
      console.error("postId is undefined");
    }
  }

  deleteComment(idComment: number): void {
    if (this.postId) {


      // Afficher une fenêtre de confirmation
      const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?');

      if (confirmDelete) {
        this.commentaireService.deleteComment(idComment, this.userId).subscribe(
          res => {
            console.log('Commentaire supprimé avec succès:', res);

          },
          err => {
            console.error('Erreur lors de la suppression du commentaire:', err);
          }
        );
      }
      this.loadPostDetails();
      this.loadPostComments();
    } else {
      console.error("postId is undefined");
    }
  }
  navigateToUpdatePost() {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam!== null) {
      const postId = +postIdParam;
      this.router.navigate(['/update-post', postId]);
    } else {
      console.error("postId is undefined");
    }
  }

  editComment(commentaire: Commentaire): void {
    this.editingCommentId = commentaire.idComment ?? null; // Activer le mode édition pour le commentaire sélectionné
    this.formMessage = commentaire.contenu ?? ''; // Pré-remplir le formulaire avec le contenu du commentaire
  }



  updateComment(): void {
    if (this.postId && this.editingCommentId !== null) {

      const updatedComment = new Commentaire(this.editingCommentId, this.formMessage, new Date());
      this.commentaireService.updateComment(this.userId, this.editingCommentId, updatedComment).subscribe(
        res => {
          console.log('Commentaire mis à jour avec succès:', res);
          this.loadPostDetails();
          this.loadPostComments();
          this.editingCommentId = null; // Réinitialiser l'ID du commentaire en cours d'édition
          this.formMessage = ''; // Réinitialiser le champ de texte du formulaire
          this.router.navigate(['/blog-details/:postId']); // Remplacez '/nouvelle-page' par l'URL de la nouvelle page

        },
        err => {
          console.error('Erreur lors de la mise à jour du commentaire:', err);

        }
      );

      this.loadPostDetails();
      this.loadPostComments();
    } else {
      console.error("postId is undefined or editingCommentId is null");
    }
  }

}

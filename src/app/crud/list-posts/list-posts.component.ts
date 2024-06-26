import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/service/Post/post.service';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {
  posts: Post[] = [];
  staticUserId: number = 3; // Exemple d'un userId statique

  userId: number = 0;
  constructor(private postService: PostService, private httpClient: HttpClient,private cookieService: CookieService) {}

  ngOnInit(): void {
    this.getAllPosts();
this.getUserByUsername()
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
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (posts: Post[]) => {
        this.posts = posts;
        console.log('Posts:', this.posts);

      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  toggleLike(postId: number) {
    this.postService.toggleLike(postId, this.userId).subscribe(
      response => {
        console.log(response); // Afficher la réponse de la requête
      },
      error => {
        console.error('Error while liking post:', error);
      }
    );
    this.getAllPosts(); // Récupérer à nouveau la liste des posts après la suppression

  }

  toggleDislike(postId: number) {
    this.postService.toggleDislike(postId, this.userId).subscribe(
      response => {
        console.log(response);
        this.getAllPosts();

      },
      error => {
        console.error('Error while disliking post:', error);
      }
    );
    this.getAllPosts();

  }

  confirmDeletePost(idPost: number): void {
    const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?');
    if (confirmation) {
      this.deletePost(idPost);
    }
    this.getAllPosts();

  }


  // Dans ListPostsComponent

  deletePost(idPost: number): void {
    this.postService.deletePost(idPost, this.userId).subscribe(
      response => {
        console.log(response); // Afficher la réponse de la requête
        this.getAllPosts(); // Récupérer à nouveau la liste des posts après la suppression

      },
      error => {
        console.error('Error while deleting post:', error);
      }
    );
    this.getAllPosts();

  }

  getPostImageUrl(post: Post): string {
    // Supposons que post contient un champ image qui représente le chemin d'accès de l'image dans le backend
    return `${post.image}`;
  }


  truncateDescription(description: string): string {
    // Vérifiez si la description est définie et non vide
    if (description && description.length > 0) {
      // Trouvez l'index du premier point ou point d'exclamation
      const endOfSentenceIndex = Math.max(description.indexOf('.'), description.indexOf('!'));
      // Si un point ou un point d'exclamation est trouvé, retournez la partie de la description jusqu'à cet index
      if (endOfSentenceIndex > 0) {
        return description.substring(0, endOfSentenceIndex + 1) + '...';
      }
    }
    // Si aucune phrase n'est trouvée ou si la description est vide, retournez la description complète
    return description;
  }



  // Dans votre composant Angular

  isLiked(post: any): boolean {
    // Vérifie si le nombre de likes du post est supérieur à 0
    return post.likes > 0;
  }

  isDisliked(post: any): boolean {
    // Vérifie si le nombre de dislikes du post est supérieur à 0
    return post.dislikes > 0;
  }


}

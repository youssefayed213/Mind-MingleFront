
import { Component, OnInit } from '@angular/core';
import { StatService } from "../../service/Stat/stat.service";
import { Post } from "../../model/Post";
import { PostService } from "../../service/Post/post.service";
import { Commentaire } from "../../model/Commentaire";
import { CommentaireService } from "../../service/Commentaire/commentaire.service";
import {BadWordsService} from "../../service/BadWords/bad-words.service";
import {BadWord} from "../../model/BadWord";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  top3Posts: Post[] = [];
  posts: Post[] = [];
  comments: Commentaire[] = [];
  recommendation: string = ''; // Variable to hold the recommendation
  content: string = ''; // Ajoutez la propriété 'content' pour lier le champ de texte

  badWords: BadWord[] = []; // Ajoutez cette ligne



  constructor(
    private statService: StatService,
    private postService: PostService,
    private commentaireService: CommentaireService,
  private badWordsService: BadWordsService // Injection du nouveau service

) { }

  ngOnInit(): void {
    // Appeler le service pour récupérer les trois premiers posts triés par likes
    this.statService.getTop3PostsByLikes().subscribe(
      (posts: Post[]) => {
        this.top3Posts = posts;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite :', error);
      }
    );

    // Appeler le service pour récupérer tous les posts
    this.getAllPosts();

    // Appeler le service pour récupérer tous les commentaires
    this.getAllComments();

    // Appeler le service pour récupérer la recommandation de post
    this.getPostRecommendation();

    this.getAllBadWords();

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

  getAllComments(): void {
    this.commentaireService.getAllComments().subscribe(
      (comments: Commentaire[]) => {
        this.comments = comments;
        console.log('Comments:', this.comments);
      },
      error => {
        console.error('Error fetching comments:', error);
      }
    );
  }







  getPostRecommendation(): void {
    this.statService.getPostRecommendation().subscribe(
      (recommendation: string) => {
        this.recommendation = recommendation;
      },
      (error: any) => {
        console.error('Une erreur s\'est produite lors de la récupération de la recommandation de post :', error);
      }
    );
  }

  truncateDescription(description: string | undefined): string {
    const maxLength = 100; // Définir la longueur maximale de la phrase
    // Vérifier si la description existe avant de la tronquer
    return description ? (description.length > maxLength ? description.substring(0, maxLength) + '...' : description) : '';
  }

  addBadWord(content: string) {
    const badWord: BadWord = {
      idBadWord: 0, // Remplacez la valeur par l'ID réel ou une valeur par défaut appropriée
      content: content

    };

    this.badWordsService.addBadWord(badWord).subscribe(
      (addedBadWord: BadWord) => {
        console.log('Bad word ajouté avec succès :', addedBadWord);
        // Effectuez les actions supplémentaires nécessaires après l'ajout du "bad word"
        this.getAllBadWords();

      },
      (error: any) => {
        console.error('Erreur lors de l\'ajout du bad word :', error);
        // Gérez l'erreur d'ajout du "bad word"
      }
    );
  }



  // Dans PostsComponent

  deleteBadWord(badWordId: number): void {
    if (confirm("Voulez-vous vraiment supprimer cette mauvaise parole?")) {
      this.badWordsService.deleteBadWord(badWordId).subscribe(
        () => {
          console.log('Mauvaise parole supprimée avec succès.');
          // Mettez à jour l'affichage ou effectuez d'autres actions après la suppression
          // Par exemple, rechargez la liste des mauvaises paroles
          this.getAllBadWords();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression de la mauvaise parole :', error);
          // Gérez l'erreur de suppression
        }
      );
    }
  }

// Exemple de méthode pour récupérer toutes les mauvaises paroles
  getAllBadWords(): void {
    this.badWordsService.getAllBadWords().subscribe(
      (badWords: BadWord[]) => {
        this.badWords = badWords;
        console.log('Updated bad words in component:', this.badWords);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des mauvaises paroles :', error);
      }
    );
  }


}

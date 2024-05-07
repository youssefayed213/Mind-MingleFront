import { Component, OnInit } from '@angular/core';
import {RendezVous} from "../../models/RendezVous";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Router} from "@angular/router";
import {style} from "@angular/animations";
import {FeedbackService} from "../../service/Feedback/feedback.service";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list-rendez-vous-back',
  templateUrl: './list-rendez-vous-back.component.html',
  styleUrls: ['./list-rendez-vous-back.component.css']
})
export class ListRendezVousBackComponent  {
  rendezvous: RendezVous[] = [];
  feedbackStats: Map<string, number> = new Map()// Initialisation du tableau

  constructor(  private cookieService: CookieService,
    private httpClient: HttpClient,private service: RendezVousService, private feedbackService: FeedbackService, private router: Router){ }

  ngOnInit(): void {
    this.getAllRendezVous();
    this.getUserByUsername();
  }

  getAllRendezVous(): void {
    this.service.getAllRendezVous().subscribe(
      (data: RendezVous[]) => {
        this.rendezvous = data;
        console.log('Rendez-vous:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des rendez-vous', error);
      }
    );
  }

userId: number = 0; 
getUserByUsername() {
  const username = this.cookieService.get('username');

  // Make the HTTP GET request to the provided URL
  this.httpClient.get<any>('http://localhost:8085/minds/api/home/findByUsername/' + username)
    .subscribe(
      (response) => {
        // Extract the idUser field from the response
        this.userId = response.idUser;
        // Log the idUser to the console
        console.log('User ID:', response);
      },
      (error) => {
        // Handle errors if any
        console.error('Error fetching user:', error);
      }
    );
}

  deleteRendezvous(idRdv: number): void {
    console.log('deleteRendezvous called with idRdv:', idRdv);
    if (this.userId && idRdv) {
      this.service.deleteRendezVous(this.userId, idRdv).subscribe(
        (response: any) => {
          console.log(response);
          // Filtrer le rendez-vous supprimé du tableau
          this.rendezvous = this.rendezvous.filter(rdv => rdv.idRdv !== idRdv);
          console.log(`Rendez-vous avec ID ${idRdv} supprimé pour l'utilisateur ${this.userId}.`);
        },
        error => {
          console.error('Erreur lors de la suppression du rendez-vous', error);
        }
      );
    } else {
      console.error('ID de l\'utilisateur ou de rendez-vous non défini.');
    }
  }

  getFeedbackStats(): void {
    this.feedbackService.getFeedbackStatsByNote().subscribe(
      (stats: Map<string, number>) => {
        console.log('Statistiques:', stats);
        this.feedbackStats = stats;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques', error);
      }
    );
  }
  protected readonly style = style;
}


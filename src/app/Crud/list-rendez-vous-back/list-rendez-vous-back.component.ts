import { Component, OnInit } from '@angular/core';
import {RendezVous} from "../../models/RendezVous";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Router} from "@angular/router";
import {style} from "@angular/animations";
import {FeedbackService} from "../../service/Feedback/feedback.service";


@Component({
  selector: 'app-list-rendez-vous-back',
  templateUrl: './list-rendez-vous-back.component.html',
  styleUrls: ['./list-rendez-vous-back.component.css']
})
export class ListRendezVousBackComponent  {
  rendezvous: RendezVous[] = [];
  feedbackStats: Map<string, number> = new Map()// Initialisation du tableau

  constructor(private service: RendezVousService, private feedbackService: FeedbackService, private router: Router){ }

  ngOnInit(): void {
    this.getAllRendezVous();
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

  deleteRendezvous(idRdv: number): void {
    console.log('deleteRendezvous called with idRdv:', idRdv);
    const idUser = 31;
    if (idUser && idRdv) {
      this.service.deleteRendezVous(idUser, idRdv).subscribe(
        (response: any) => {
          console.log(response);
          // Filtrer le rendez-vous supprimé du tableau
          this.rendezvous = this.rendezvous.filter(rdv => rdv.idRdv !== idRdv);
          console.log(`Rendez-vous avec ID ${idRdv} supprimé pour l'utilisateur ${idUser}.`);
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


import { Component } from '@angular/core';
import {RendezVous} from "../../models/RendezVous";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent {
  rendezvous: RendezVous[]=[];
  searchKeyword: string = '';
  p: number = 1;



  constructor(private service: RendezVousService, private router: Router) { }

  ngOnInit() {
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

  addFeedback(idRdv: number): void {
    // Rediriger vers le composant ou l'action pour ajouter un feedback avec l'idRdv spécifié
    this.router.navigate(['/add-feedback', idRdv]);
  }

  deleteRendezvous(idRdv: number): void {
    const idUser = 31;
    if (idUser && idRdv) {
      this.service.deleteRendezVous(idUser, idRdv).subscribe(
        (response: any) => {
          console.log(response); // Afficher la réponse du serveur (ex. "Rendez-vous avec l'id 48 pour l'utilisateur 31 a été supprimé")
          this.rendezvous = this.rendezvous.filter(rendezvous => rendezvous.idRdv !== idRdv);
          console.log(`Rendez-vous avec ID ${idRdv} supprimé pour l'utilisateur ${idUser}.`);
        },
        error => {
          console.error('Erreur lors de la suppression du rendez-vous', error);
        }
      );
    } else {
      console.error('ID de l\'utilisateur ou de rendez-vous non défini.');
    }
  }}

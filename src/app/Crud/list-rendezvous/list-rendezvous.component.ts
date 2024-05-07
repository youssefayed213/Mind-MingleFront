import { Component } from '@angular/core';
import {RendezVous} from "../../models/RendezVous";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-rendezvous',
  templateUrl: './list-rendezvous.component.html',
  styleUrls: ['./list-rendezvous.component.css']
})
export class ListRendezvousComponent {
  rendezvous: RendezVous[]=[];
  searchKeyword: string = '';
  p: number = 1;



  constructor(  private cookieService: CookieService,
    private httpClient: HttpClient,private service: RendezVousService, private router: Router) { }

  ngOnInit() {
    this.getAllRendezVous();
    this.getUserByUsername();
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
    if (this.userId && idRdv) {
      this.service.deleteRendezVous(this.userId, idRdv).subscribe(
        (response: any) => {
          console.log(response); // Afficher la réponse du serveur (ex. "Rendez-vous avec l'id 48 pour l'utilisateur 31 a été supprimé")
          this.rendezvous = this.rendezvous.filter(rendezvous => rendezvous.idRdv !== idRdv);
          console.log(`Rendez-vous avec ID ${idRdv} supprimé pour l'utilisateur ${this.userId}.`);
        },
        error => {
          console.error('Erreur lors de la suppression du rendez-vous', error);
        }
      );
    } else {
      console.error('ID de l\'utilisateur ou de rendez-vous non défini.');
    }
  }}

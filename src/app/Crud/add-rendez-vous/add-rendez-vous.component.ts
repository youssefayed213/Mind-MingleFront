import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVousService } from 'src/app/service/RendezVous/rendez-vous.service';
import { RendezVous } from '../../models/RendezVous';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from "../../models/User";
import {DatePipe, formatDate} from "@angular/common";
import {TypeRdv} from "../../models/TypeRdv";
import { CookieService } from 'ngx-cookie-service';

// Assurez-vous d'importer le modèle User ici

@Component({
  selector: 'app-add-rendez-vous',
  templateUrl: './add-rendez-vous.component.html',
  styleUrls: ['./add-rendez-vous.component.css']
})
export class AddRendezVousComponent {
  rendezVousForm: FormGroup;


  constructor(private cookieService: CookieService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private rendezVousService: RendezVousService,
    private dataPipe : DatePipe
  ) {
    this.rendezVousForm = this.formBuilder.group({
      dateRdv: ['', Validators.required],
      typeRdv: ['', Validators.required],
      lieu: ['', Validators.required],
    });
  }

  ngOnInit(): void {

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
  addRendezVous(): void {
    if (this.rendezVousForm.valid) {
      const rendezVousData = this.rendezVousForm.value;
      // Convertir la valeur de typeRdv en l'énumération TypeRdv
      const typeRdvEnum = Object.values(TypeRdv).find(value => value === rendezVousData.typeRdv);
      if (!typeRdvEnum) {
        console.error('TypeRdv invalide');
        return;
      }
      rendezVousData.typeRdv = typeRdvEnum;
      this.rendezVousService.addRendezVous(this.userId, rendezVousData)
        .subscribe(
          response => {
            console.log('Rendez-vous ajouté avec succès : ', response);
            this.rendezVousForm.reset();
          },
          error => {
            console.error('Erreur lors de l\'ajout du rendez-vous : ', error);
            // Gérez l'erreur ici
          }
        );
    } else {
      console.log('Formulaire invalide. Veuillez remplir correctement tous les champs.');
    }
  }
  submitAndNavigate(): void {
    if (this.rendezVousForm.valid) {
      this.addRendezVous(); // Soumettez le formulaire
      this.router.navigate(['/rendezvousfront']); // Naviguez vers la page des listes de rendez-vous
    }
  }
}

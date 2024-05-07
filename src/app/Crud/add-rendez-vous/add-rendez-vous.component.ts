import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RendezVousService } from 'src/app/service/RendezVous/rendez-vous.service';
import { RendezVous } from '../../models/RendezVous';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from "../../models/User";
import { RoleUser } from '../../models/Role';
import {DatePipe, formatDate} from "@angular/common";
import {TypeRdv} from "../../models/TypeRdv";

// Assurez-vous d'importer le modèle User ici

@Component({
  selector: 'app-add-rendez-vous',
  templateUrl: './add-rendez-vous.component.html',
  styleUrls: ['./add-rendez-vous.component.css']
})
export class AddRendezVousComponent {
  rendezVousForm: FormGroup;

  constructor(
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
      const userId = 31;
      this.rendezVousService.addRendezVous(userId, rendezVousData)
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

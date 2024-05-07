import {RendezVous} from "../../models/RendezVous";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-update-rendez-vous',
  templateUrl: './update-rendez-vous.component.html',
  styleUrls: ['./update-rendez-vous.component.css']
})
export class UpdateRendezVousComponent implements OnInit {
  idUser: number = 31; // Exemple d'ID utilisateur, ajustez selon votre cas d'utilisation
  idRdv: number | undefined;
  rendezVousForm: FormGroup;
  rendezVous: RendezVous | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rendezVousService: RendezVousService,
    private fb: FormBuilder
  ) {
    this.rendezVousForm = this.fb.group({
      dateRdv: [null, Validators.required],
      typeRdv: [null, Validators.required],
      lieu: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const idRdvParam = this.route.snapshot.paramMap.get('idRdv');
    if (idRdvParam) {
      this.idRdv = +idRdvParam;
      if (this.idRdv) {
        this.rendezVousService.getRendezVousByUserIdAndId(this.idUser, this.idRdv).subscribe(
          (data: RendezVous) => {
            if (data) {
              this.rendezVous = data;
              this.rendezVousForm.patchValue({
                dateRdv: this.rendezVous.dateRdv,
                typeRdv: this.rendezVous.typeRdv,
                lieu: this.rendezVous.lieu
              });
            } else {
              console.error('Rendez-vous non trouvé');
            }
          },
          (error: any) => {
            console.error('Erreur lors de la récupération du rendez-vous à mettre à jour', error);
          }
        );
      } else {
        console.error('ID du rendez-vous non spécifié dans l\'URL.');
      }
    } else {
      console.error('Paramètre idRdv non trouvé dans l\'URL.');
    }
  }

  updateRendezVous(): void {
    if (this.rendezVousForm.valid) {
      const updatedRendezVous: RendezVous = {
        idRdv: this.idRdv!,
        dateRdv: this.rendezVousForm.value.dateRdv,
        typeRdv: this.rendezVousForm.value.typeRdv,
        lieu: this.rendezVousForm.value.lieu
      };

      this.rendezVousService.updateRendezVous(this.idUser, updatedRendezVous).subscribe(
        (data: RendezVous) => {
          console.log('Rendez-vous mis à jour avec succès', data);
          this.router.navigate(['/list-rendezvous']);
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du rendez-vous', error);
        }
      );
    }
  }

  submitAndNavigate(): void {
    if (this.rendezVousForm.valid) {
      this.updateRendezVous(); // Soumettez le formulaire
      this.router.navigate(['/rendezvousfront']); // Naviguez vers la page des listes de rendez-vous
    }
  }
}

import {RendezVous} from "../../models/RendezVous";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RendezVousService} from "../../service/RendezVous/rendez-vous.service";
import {Component, OnInit} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-update-rendez-vous',
  templateUrl: './update-rendez-vous.component.html',
  styleUrls: ['./update-rendez-vous.component.css']
})
export class UpdateRendezVousComponent implements OnInit {
  idRdv: number | undefined;
  rendezVousForm: FormGroup;
  rendezVous: RendezVous | undefined;

  constructor(  private cookieService: CookieService,
    private httpClient: HttpClient,
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
  ngOnInit(): void {
    const idRdvParam = this.route.snapshot.paramMap.get('idRdv');
    if (idRdvParam) {
      this.idRdv = +idRdvParam;
      if (this.idRdv) {
        this.rendezVousService.getRendezVousByUserIdAndId(this.userId, this.idRdv).subscribe(
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

      this.rendezVousService.updateRendezVous(this.userId, updatedRendezVous).subscribe(
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

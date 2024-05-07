import { Component, OnInit } from '@angular/core';
import { Feedback } from "../../models/Feedback";
import { NoteFeedback } from "../../models/NoteFeedback";
import { FeedbackService } from "../../service/Feedback/feedback.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router'; // Importez ActivatedRoute
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {
  noteFeedbackValues = Object.values(NoteFeedback);
  selectedNote!: NoteFeedback;
  feedbackForm!: FormGroup;
  idRdv!: number;

  constructor(
    private cookieService: CookieService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
  private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserByUsername();
    this.route.params.subscribe(params => {
      if (params['idRdv']) {
        this.idRdv = +params['idRdv']; // Convertir l'identifiant en nombre (suppose 'id' est le paramètre d'URL)
        console.log('ID du rendez-vous :', this.idRdv); // Vérifiez la valeur de rdvId
      }
    });

    // Initialisation du formulaire avec des contrôles vides
    this.feedbackForm = this.formBuilder.group({
      commentaire: ['', Validators.required], // Champ requis pour le commentaire
      note: ['', Validators.required], // Champ requis pour la note
      dateFeedback: [new Date().toISOString(), Validators.required] // Champ requis pour la date du feedback
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
  addFeedback(): void {
    console.log('ID du rendez-vous :', this.idRdv);
    if (this.feedbackForm.valid && this.idRdv) { // Vérifiez que rdvId est définie
      const { commentaire, note, dateFeedback } = this.feedbackForm.value;

      const feedback = new Feedback(undefined, commentaire, note, dateFeedback);

      this.feedbackService.addFeedback(this.userId, this.idRdv, feedback)
        .subscribe(
          (newFeedback: Feedback) => {
            console.log('Feedback ajouté avec succès :', newFeedback);
            this.feedbackForm.reset(); // Réinitialiser le formulaire après l'ajout du feedback
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du feedback :', error);
            // Gérer les erreurs d'ajout de feedback ici
          }
        );
    } else {
      console.error('Formulaire invalide : veuillez remplir tous les champs requis ou vérifier l\'ID du rendez-vous.');
    }
  }

  submitAndNavigate(): void {
    if (this.feedbackForm.valid) {
      this.addFeedback(); // Soumettez le formulaire
      this.router.navigate(['/rendezvousfront']); // Naviguez vers la page des listes de rendez-vous
    }
  }
}

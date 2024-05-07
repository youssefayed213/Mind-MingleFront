import {Component, OnInit} from '@angular/core';
import {Feedback} from "../../models/Feedback";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedbackService} from "../../service/Feedback/feedback.service";

@Component({
  selector: 'app-list-feedback-par-rendez-vous',
  templateUrl: './list-feedback-par-rendez-vous.component.html',
  styleUrls: ['./list-feedback-par-rendez-vous.component.css']
})
export class ListFeedbackParRendezVousComponent implements OnInit {
  feedback: any;
  idUser = 31; // Exemple d'ID utilisateur, ajustez selon votre cas d'utilisation

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idRdvParam = this.route.snapshot.paramMap.get('idRdv');
    if (idRdvParam!== null) {
      const idRdv = +idRdvParam; // Convertit la chaîne en nombre
      this.feedbackService.getFeedbackByIdUserAndIdRdv(this.idUser, idRdv).subscribe(data => {
        this.feedback = data;
      });
    } else {
      console.error('ID du rendez-vous non trouvé dans l\'URL.');
      // Gérer le cas où l'ID du rendez-vous n'est pas trouvé
    }
  }
  goToList() {
    this.router.navigate(['/rendezvous']); // Ajustez l'URL selon votre configuration
  }





}


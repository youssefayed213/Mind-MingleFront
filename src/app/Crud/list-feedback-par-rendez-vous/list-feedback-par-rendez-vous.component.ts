import {Component, OnInit} from '@angular/core';
import {Feedback} from "../../models/Feedback";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedbackService} from "../../service/Feedback/feedback.service";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-feedback-par-rendez-vous',
  templateUrl: './list-feedback-par-rendez-vous.component.html',
  styleUrls: ['./list-feedback-par-rendez-vous.component.css']
})
export class ListFeedbackParRendezVousComponent implements OnInit {
  feedback: any;

  constructor(  private cookieService: CookieService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private router: Router
  ) { }

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
    this.getUserByUsername();
    const idRdvParam = this.route.snapshot.paramMap.get('idRdv');
    if (idRdvParam!== null) {
      const idRdv = +idRdvParam; // Convertit la chaîne en nombre
      this.feedbackService.getFeedbackByIdUserAndIdRdv(this.userId, idRdv).subscribe(data => {
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


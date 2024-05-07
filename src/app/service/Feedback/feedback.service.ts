import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Feedback} from "../../models/Feedback";


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8085/minds/feedback'; // URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  addFeedback(userId: number, rdvId: number, feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/${userId}/${rdvId}/add-feedback`, feedback);
  }

  updateFeedback(userId: number, rdvId: number, feedbackId: number, feedback: Feedback): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.baseUrl}/${userId}/${rdvId}/update-feedback/${feedbackId}`, feedback);
  }

  removeFeedback(userId: number, rdvId: number, idFeedback: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${rdvId}/delete-feedback/${idFeedback}`, { responseType: 'text' });
  }

  retrieveFeedback(userId: number, rdvId: number, idFeedback: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.baseUrl}/${userId}/${rdvId}/get-feedback/${idFeedback}`);
  }

  getFeedbackByIdUserAndIdRdv(idUser: number, idRdv: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/feedback/${idUser}/${idRdv}`);
  }

  retrieveAllFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/all-feedback`);
  }

  getFeedbackStatsByNote(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/stats`);
  }
}

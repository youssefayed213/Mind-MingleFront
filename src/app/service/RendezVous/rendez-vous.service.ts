import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RendezVous} from "../../models/RendezVous";


@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private baseUrl = 'http://localhost:8085/minds/RendezVous'; // URL de base de votre API Spring Boot

  constructor(private http: HttpClient) { }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.baseUrl}/getRendezVous`);
  }
  getRendezVousByUserIdAndId(userId: number, idRdv: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.baseUrl}/users/${userId}/rendezvous/${idRdv}`);
  }

  addRendezVous(userId: number, data:any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/${userId}/add-RendezVous`, data);
  }



  updateRendezVous(idUser: number, rdv: RendezVous): Observable<RendezVous> {
    // Construire l'URL avec le paramètre path
    const url = `${this.baseUrl}/update-RendezVous/${idUser}`;
    return this.http.put<RendezVous>(url, rdv);
  }


  deleteRendezVous(idUser: number, idRdv: number): Observable<any> {
    const url = `${this.baseUrl}/delete-RendezVous/${idUser}/${idRdv}`;
    return this.http.delete(url, { responseType: 'text' }); // Spécifier le type de réponse comme texte
  }
  searchRendezVous(date?: string, type?: string, lieu?: string): Observable<RendezVous[]> {
    const params: any = {};
    if (date) { params.date = date; }
    if (type) { params.type = type; }
    if (lieu) { params.lieu = lieu; }

    return this.http.get<RendezVous[]>(`${this.baseUrl}/search`, { params });
  }
}

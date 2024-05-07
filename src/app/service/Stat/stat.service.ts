import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from "../../model/Post";

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private baseUrl = 'http://localhost:8085/minds/Posts';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les trois premiers posts triés par likes
  getTop3PostsByLikes(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/top3`);
  }
  // Méthode pour récupérer la recommandation de post
  getPostRecommendation(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/recommendation`);
  }


}

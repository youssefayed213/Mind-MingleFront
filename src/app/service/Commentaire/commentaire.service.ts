import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Commentaire} from "../../model/Commentaire";

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private baseUrl = 'http://localhost:8085/minds'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  addComment(postId: number, userId: number, commentaire: Commentaire): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Comments/posts/${postId}/users/${userId}/add-Comment`, commentaire);
  }

  getCommentsByPostId(postId: number): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/Comments/posts/${postId}/comments`);
  }

  deleteComment(idComment: number, idUser: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Comments/comments/delete/${idComment}/${idUser}`);
  }

  updateComment(idUser: number, idComment: number, updatedComment: any): Observable<any> {
    const url = `${this.baseUrl}/Comments/comments/${idUser}/${idComment}`;
    return this.http.put(url, updatedComment);
  }


  getAllComments(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.baseUrl}/Comments/retrieve-all-comments`);
  }

}

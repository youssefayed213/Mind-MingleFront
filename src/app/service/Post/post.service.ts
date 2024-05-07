import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Post} from "../../model/Post";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8085/minds/Posts';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/retrieve-all-posts`);
  }
  retrievePost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }



  addPostWithImageToUser(userId: number, post: Post, imageFile: File): Observable<Post> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('titre', post.titre ? post.titre : '');
    formData.append('description', post.description ? post.description : '');
    // Ajoutez le type de poste à l'objet FormData
    formData.append('typePost', post.typePost?.toString() || '');
    return this.http.post<Post>(`${this.baseUrl}/users/${userId}/addPostToUserImage`, formData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }



  //deletePost(postId: number): Observable<string> {
    //return this.http.delete<string>(`${this.baseUrl}/delete-Post/${postId}`);
  //}

  //////like-deslike//////////

  toggleLike(idPost: number, idUser: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${idPost}/like/${idUser}`, {});
  }

  toggleDislike(idPost: number, idUser: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${idPost}/dislike/${idUser}`, {});
  }



// Dans PostService

  deletePost(idPost: number, idUser: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/posts/${idPost}/users/${idUser}`);
  }


  updatePost(idUser: number, idPost: number, titre: string, description: string, typePost: string, image: File | null): Observable<any> {
    const url = `${this.baseUrl}/${idUser}/${idPost}`;
    const formData: FormData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('typePost', typePost);
    if (image) {
      formData.append('image', image, image.name);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<any>(url, formData, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }


  getPostById(idPost: number): Observable<any> {
    const url = `${this.baseUrl}/${idPost}`;
    return this.http.get(url);
  }


}

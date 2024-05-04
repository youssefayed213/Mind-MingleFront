import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8085/minds/api/home';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  updateProfile(updatedUser: User): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/profile`, updatedUser);
  }

  uploadProfileImage(imageFile: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('imageFile', imageFile);

    return this.http.post<string>(`${this.baseUrl}/uploadImageProfile`, formData);
  }
}

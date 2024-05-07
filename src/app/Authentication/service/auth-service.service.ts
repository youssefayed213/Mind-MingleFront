import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {User} from "../../models/User";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8085/minds';
  constructor(private http: HttpClient,private cookieService: CookieService) { }


  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        map(response => {
          const token = response.token;
          if (token) {
            const expirationMillis = response.expiresIn * 1000; // expiresIn is in seconds, convert to milliseconds
            const expiresDate = new Date(Date.now() + expirationMillis);
            this.cookieService.set('token', token, expiresDate, '/', '', false, 'Strict');
          }
          return response;
        })
      );
  }

  logout() {

    // Remove token from cookie
    this.cookieService.delete('token', '/', '');

    this.cookieService.delete('username', '/', '');
    // Retrieve token from cookie
    const token = this.cookieService.get('token');

    // Send logout request to backend with token in Authorization header
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { headers }).pipe(
      catchError(error => {
        console.error('Logout failed:', error);
        return throwError(error);
      })
    );
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/forgot-password`, email);
  }

  resetPassword(newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/reset-password`, newPassword)

  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token is present in local storage
  }

}

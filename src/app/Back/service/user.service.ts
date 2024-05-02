import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8085/minds/api/users';
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/adduser`, user);
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  updateUser(user : User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/updateuser`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteuser/${userId}`);
  }

  getRegistrationStats(timePeriod: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/registration-stats?timePeriod=${timePeriod}`);
  }

}

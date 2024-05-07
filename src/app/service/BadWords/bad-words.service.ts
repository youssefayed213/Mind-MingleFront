import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BadWord} from "../../model/BadWord";

@Injectable({
  providedIn: 'root'
})
export class BadWordsService {


  private baseUrl = 'http://localhost:8085';
  constructor(private http: HttpClient) { }

  getAllBadWords(): Observable<BadWord[]> {
    return this.http.get<BadWord[]>(`${this.baseUrl}/minds/retrieve-all-badword`);
  }
  addBadWord(badWord: BadWord): Observable<BadWord> {
    return this.http.post<BadWord>(`http://localhost:8085/minds/badword/add`, badWord);
  }
  deleteBadWord(badWordId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/minds/badword/${badWordId}`);
  }
}

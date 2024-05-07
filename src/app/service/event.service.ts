import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from 'src/environement/environement';
import { MyEvent } from '../model/MyEvent ';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http:HttpClient) { }
event!:MyEvent []
 
  getallEvent():Observable<MyEvent[]>{
    return this.http.get<MyEvent []>(environement.baseUrl+"minds/evenement/retriveAllEvenement");
  }
  
  // Create
addEvent(event: MyEvent): Observable<MyEvent> {
  return this.http.post<MyEvent>(environement.baseUrl+"minds/evenement/addevenement", event);
}
// Update
updateEvent(eventId: number, updatedEvent: MyEvent): Observable<MyEvent> {
  return this.http.put<MyEvent>(`${environement.baseUrl}/minds/evenement/updateEvenement${eventId}`, updatedEvent);
}

// Delete
deleteEvent(id: number): Observable<any> {
  return this.http.delete(`${environement.baseUrl}minds/evenement/deleteEvenement/${id}`);
}
register(eventId:any ,userId : any):Observable<any>{
  return this.http.post(`${environement.baseUrl}minds/evenement/register_event/event/${eventId}/user/${userId}`,null);
}

}

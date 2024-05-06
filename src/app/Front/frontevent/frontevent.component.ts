import { Component } from '@angular/core';
import { MyEvent } from 'src/app/model/MyEvent ';
import { EventService } from 'src/app/service/event.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-frontevent',
  templateUrl: './frontevent.component.html',
  styleUrls: ['./frontevent.component.css']
})
export class FronteventComponent {
  events!:MyEvent[]
  userId: number = 0; 
  name: String = "";
  role: String = "";

  
  constructor(private eventService:EventService,private httpClient: HttpClient,private cookieService: CookieService){}

  ngOnInit(): void {
    this.getallEvent();
    this.getUserByUsername();
    
  }
  getUserByUsername() {
    const username = this.cookieService.get('username');

    // Make the HTTP GET request to the provided URL
    this.httpClient.get<any>('http://localhost:8085/minds/api/home/findByUsername/' + username)
      .subscribe(
        (response) => {
          // Extract the idUser field from the response
          this.userId = response.idUser;
          this.name = response.nomUser + ' ' + response.prenomUser;
          this.role= response.role;
          // Log the idUser to the console
          console.log('User ID:', this.userId);
        },
        (error) => {
          // Handle errors if any
          console.error('Error fetching user:', error);
        }
      );
}
  getallEvent(){
    this.eventService.getallEvent().subscribe((data: MyEvent[])=>{
      this.events=data;
      console.log(this.events);
    })
    console.log("--------------------");
    console.log(this.events);
  }
  onButtonClick(event: MyEvent): void {
    console.log(event.idEvent); 
    this.eventService.register(event.idEvent,this.userId).subscribe(()=>{
      console.log("sent");
    })
}
}

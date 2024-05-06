import { Component } from '@angular/core';
import { MyEvent } from 'src/app/model/MyEvent ';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-frontevent',
  templateUrl: './frontevent.component.html',
  styleUrls: ['./frontevent.component.css']
})
export class FronteventComponent {
  events!:MyEvent[]
  
  constructor(private eventService:EventService){}

  ngOnInit(): void {
    this.getallEvent();
    
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
    this.eventService.register(event.idEvent,1).subscribe(()=>{
      console.log("sent");
    })
}
}

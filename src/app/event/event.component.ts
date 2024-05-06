import { EventService } from './../service/event.service';
import {MyEvent}  from '../model/MyEvent ';

import { Component, OnInit } from '@angular/core';
//import { EventService } from '../service/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events!:MyEvent[]
  newEvent: MyEvent = {
    idEvent: 0,
    titre: '',
    description: '',
    dateEvent: new Date(),
    thematique: '',
    lieu: '',
    typeEvenement: ''
  };
  
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
 
  addEvent(formValues: any): void {
    const newEvent: MyEvent = {
      idEvent: formValues.idEvent,
      titre: formValues.titre,
      description: formValues.description,
      dateEvent: formValues.dateEvent,
      thematique: formValues.thematique,
      lieu: formValues.lieu,
      typeEvenement: formValues.typeEvenement
    };
    this.eventService.addEvent(newEvent).subscribe((event) => {
      console.log('Event added successfully:', event);
      this.getallEvent(); // Refresh event list after adding
    });
  }
  
 // Update
 updatingEvent: MyEvent | null = null;

 updateEvent(formValues: MyEvent): void {
  if (this.updatingEvent) {
    this.eventService.updateEvent(this.updatingEvent.idEvent, formValues).subscribe(() => {
      console.log('Event updated successfully');
      this.getallEvent(); // Refresh event list after updating
      this.updatingEvent = null; // Clear the form
    });
  }
}


    deleteEvent(eventId: number): void {
      this.eventService.deleteEvent(eventId).subscribe(() => {
        console.log('Event deleted successfully');
        this.getallEvent(); // Refresh event list after deletion
      });
    }
    
    
  
}

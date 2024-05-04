import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-groupes-back',
  templateUrl: './groupes-back.component.html',
  styleUrls: ['./groupes-back.component.css']
})
export class GroupesBackComponent {
  groups: any[] = [];
  groupesCount: any;
  messagesCount: any;
  categoriesCount: any;


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // Call method to fetch all groups when the component initializes
    this.getAllGroups();
    this.getAllCategories();
    this.getAllMessage();
  }

  // Method to fetch all groups
  getAllGroups() {
    this.httpClient.get<any[]>('http://localhost:8085/minds/api/Groupe/getAllGroupe').subscribe(
      (response: any[]) => {
        this.groups = response;
        this.groupesCount = response.length;
        console.log("total groups = ",this.groupesCount)
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
  getAllMessage() {
    this.httpClient.get<any[]>('http://localhost:8085/minds/api/Message/getAllMessage').subscribe(
      (response: any[]) => {
        this.messagesCount = response.length;
        console.log("total messages = ",this.messagesCount)
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }
  getAllCategories() {
    this.httpClient.get<any[]>('http://localhost:8085/minds/api/CatGr/getAllCatGr').subscribe(
      (response: any[]) => {
        this.categoriesCount = response.length;
        console.log("total categories = ",this.categoriesCount)
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }


  
  

}
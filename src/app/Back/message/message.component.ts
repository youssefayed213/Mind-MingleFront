import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';
// Define a TypeScript class for the Message object
export class Message {
  constructor(
    public idMsg: number,
    public contenuMsg: string,
    public createdAt: Date,
    public userName: string,
    public groupName: string
  ) {}
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  deleteId : number | undefined;
  messages: Message[] = [];
  groups: any[] = [];

  p: number = 1;
  totalMessages: number = 0;  
  searchTerm = ''; // Initialize searchTerm as an empty string


  constructor(private httpClient: HttpClient,  private modalService: NgbModal 
  ) {}

  ngOnInit(): void {
    this.getMessages();
    this.getAllGroups();

  }

  getMessages() {
    this.httpClient.get<Message[]>('http://localhost:8085/minds/api/Message/getAllMessage').subscribe(
      (response: Message[]) => {
        console.log('API Response:', response);
        // Sort messages by creation date in descending order
        this.messages = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.totalMessages = response.length; 
      },
      (error) => {
        console.error('Error fetching groupes:', error);
      }
    );
  }
  
  onDelete() {
    const deleteURL = 'http://localhost:8085/minds/api/Message/deleteMessage/' + this.deleteId;
    this.httpClient.delete(deleteURL, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Message deleted successfully:', response.body);
          // Filter out the deleted message from the current list
          this.messages = this.messages.filter(message => message.idMsg !== this.deleteId);
          this.modalService.dismissAll(); // Close the modal after deletion
        },
        (error) => {
          console.error('Error deleting message:', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Status:', error.status);
            console.error('Status Text:', error.statusText);
          }
          // Handle other error scenarios as needed
        }
      );
  }
  
  
  openDelete(targetModal: any, message: Message) {
    this.deleteId = message.idMsg;
   this.modalService.open(targetModal, {
     backdrop: 'static',
     size: 'lg'
   });
 }
 
 openStat(targetModal: any) {
 this.modalService.open(targetModal, {
   backdrop: 'static',
   size: 'lg'
 });
}
  // Method to get message count between dates
  getMessageCountBetweenDates(groupId: number, startDate: string, endDate: string) {
    const url = `http://localhost:8085/minds/api/Groupe/message-count-between-dates/${groupId}/${startDate}/${endDate}`;
    return this.httpClient.get<number>(url);
  }
  

  // Event handler for clicking the button to get message count
  async getMessageCount() {
    const startDateInput = document.getElementById('startDate') as HTMLInputElement;
    const endDateInput = document.getElementById('endDate') as HTMLInputElement;
    const messageCountDisplay = document.getElementById('messageCount');
  
    if (!messageCountDisplay) {
      console.error('Error: messageCountDisplay is null');
      return;
    }
  
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
  
    const groupSelect = document.getElementById('groupSelect') as HTMLSelectElement;
    const selectedGroupIdString = groupSelect.value; // Get the selected group ID as a string
  
    // Convert the selected group ID string to a number
    const selectedGroupId = parseInt(selectedGroupIdString, 10);
  
    if (isNaN(selectedGroupId)) {
      console.error('Error: Invalid group ID');
      return;
    }
  
    // Find the selected group object in the groups array
    const selectedGroup = this.groups.find(group => group.idGroupe === selectedGroupId);
  
    if (!selectedGroup) {
      console.error('Error: Selected group not found');
      return;
    }
  
    try {
      // Call getMessageCountBetweenDates with the selected group ID
      const messageCount = await this.getMessageCountBetweenDates(selectedGroupId, startDate, endDate).toPromise();
      messageCountDisplay.innerText = `Message Count between ${startDate} and ${endDate} for Group ${selectedGroup.nom} : ${messageCount}`;
    } catch (error) {
      console.error('Error fetching message count:', error);
      messageCountDisplay.innerText = 'Error fetching data';
    }
    
  }
  
  getAllGroups() {
    this.httpClient.get<any[]>('http://localhost:8085/minds/api/Groupe/getAllGroupe').subscribe(
      (response: any[]) => {
        this.groups = response;
      },
      (error) => {
        console.error('Error fetching groups:', error);
      }
    );
  }

}

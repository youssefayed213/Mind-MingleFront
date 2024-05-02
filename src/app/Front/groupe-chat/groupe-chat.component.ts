import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Groupe } from '../groupe/groupe.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Message {
  
  constructor(
    public idMsg : BigInteger,
    public contenuMsg: string,
    public owner: string,
    public createdAt: Date ,
    public idUser : BigInteger,
  ) {}
}
@Component({
  selector: 'app-groupe-chat',
  templateUrl: './groupe-chat.component.html',
  styleUrls: ['./groupe-chat.component.css']
  
})
export class GroupeChatComponent implements OnInit, OnDestroy {
  groupDetails: Groupe | undefined;
  private groupDetailsSubscription: Subscription | undefined;
  private groupIdSubject = new Subject<number | null>();
  groupId$ = this.groupIdSubject.asObservable();
  selectedMessage: Message | null = null;
  editForm!:FormGroup
  selectedMessageId: number | undefined; // Remove the null initialization
  searchTerm = ''; // Initialize searchTerm as an empty string

  messageContent: string = '';
  messages: any[] = [];




  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,private fb: FormBuilder,private modalService: NgbModal
    
  ) {}

  ngOnInit(): void {

    this.subscribeToGroupChanges();
    this.editForm = this.fb.group({
      idMessage: [null,], 
      contenuMsg: [''],
      createdAt: ['']
    } );
  }

  ngOnDestroy(): void {
    if (this.groupDetailsSubscription) {
      this.groupDetailsSubscription.unsubscribe();
    }

  }

  private webSocketMap: Map<string, WebSocket> = new Map<string, WebSocket>();

  private initializeWebSocket(groupId: string) {
    const webSocketUrl = `ws://localhost:8085/minds/chat/${groupId}`;
    const webSocket = new WebSocket(webSocketUrl);
  
    webSocket.onopen = (event) => {
      console.log('WebSocket opened:', event);
    };
  
    webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data) as Message;
      this.messages.push(chatMessageDto);
    };
  
    webSocket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };
  
    this.webSocketMap.set(groupId, webSocket);
  }
  




  


  private subscribeToGroupChanges(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const groupId = routeParams.get('id');

    if (groupId) {

      this.groupIdSubject.next(parseInt(groupId, 10));
      this.initializeWebSocket(groupId);

      const apiUrl = `http://localhost:8085/minds/api/Groupe/getGroupe/${groupId}`;
      this.groupDetailsSubscription = this.httpClient.get<Groupe>(apiUrl)
        .subscribe(
          (response: Groupe) => {
            this.groupDetails = response;
            console.log('Group Details (GroupeChatComponent):', response);
            this.fetchMessages(groupId); // Fetch messages after getting group details
            
          },
          (error) => {
            console.error('Error fetching group details:', error);
          }
        );
    } else {
      console.error('groupId not found in route parameters');
    }
  }

  private fetchMessages(groupId: string | null): void {
    if (!groupId) {
      console.error('Group ID not available');
      return;
    }

    const apiUrl = `http://localhost:8085/minds/api/Message/api/messages/${groupId}`;
    this.httpClient.get<any[]>(apiUrl).subscribe(
      (response) => {
        console.log('Messages Retrieved:', response);
        this.messages = response;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  // Your postMessage method here


  async postMessage(messageContent: string): Promise<void> {
    const groupId = this.activatedRoute.snapshot.paramMap.get('id');
    const now = new Date().toISOString();
  
    // Define a list of bad words
    const badWords = ['badword1', 'badword2', 'badword3']; // Add your bad words here
  
    // Function to filter out bad words
    const filterBadWords = (content: string): string => {
      return content.replace(new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi'), '***');
    };
  
    // Filter the message content
    const filteredMessageContent = filterBadWords(messageContent);
  
    const messagePayload = {
      contenuMsg: filteredMessageContent,
      createdAt: now,
      groupe: { idGroupe: groupId },
      user: { idUser: 1 } // Assuming fixed user ID
    };
  
    const messagePayload2 = {
      userName: 'Admin',
      contenuMsg: filteredMessageContent,
      createdAt: now,
      groupe: { idGroupe: groupId },
      user: { idUser: 1 } // Assuming fixed user ID
    };
  
    if (!groupId) {
      console.error('Group ID not available');
      return;
    }
  
    const webSocket = this.webSocketMap.get(groupId);
  
    if (!webSocket) {
      console.error('WebSocket not found for groupId:', groupId);
      return;
    }
  
    const url = 'http://localhost:8085/minds/api/Message/addMessage';
    try {
      const response = await this.httpClient.post<any>(url, messagePayload).toPromise();
      console.log('Message Posted:', response);
  
      // Send message via WebSocket after successful post
      if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(messagePayload2));
      } else {
        console.error('WebSocket is not open. Message not sent via WebSocket.');
      }
      this.messageContent = '';
      // Fetch the updated list of messages (assuming this.fetchMessages updates this.messages)
      this.fetchMessages(groupId);
    } catch (error) {
      console.error('Error posting message:', error);
    }
  }
  
  
  openEdit(targetModal: any, message: Message) {
    
    this.selectedMessage = message;
    const now = new Date().toISOString();

    // Populate the editForm with the selected category's data
    this.editForm.patchValue({
      contenuMessage: this.selectedMessage.contenuMsg // Set nomCatGroupe in the form
    });

    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    contenuMsg: message.contenuMsg, 
  });
 }
 async onSave(): Promise<void> {
  const formValue = this.editForm.value;
  const routeParams = this.activatedRoute.snapshot.paramMap;
  const groupId = routeParams.get('id'); // Assuming 'id' is the parameter name
  
  // Retrieve idMsg from selectedMessage
  const idMsg = this.selectedMessage?.idMsg;

  if (!idMsg) {
    console.error('No idMsg found in selected message');
    return;
  }

  const groupePayload = {
    idMsg: idMsg,
    contenuMsg: formValue.contenuMsg,
    createdAt: new Date().toISOString(),
    user: { idUser: 1 }, // Replace with actual user ID logic
    groupe: { idGroupe: groupId },
  };

  const url = 'http://localhost:8085/minds/api/Message/updateMessage';

  try {
    const newGroupe = await this.httpClient.put<Message>(url, groupePayload).toPromise();
    console.log('Message updated successfully:', newGroupe);
    this.fetchMessages(groupId); // Call fetchMessages with the groupId parameter
    this.modalService.dismissAll(); // Close the modal after form submission
  } catch (error) {
    console.error('Error updating message:', error);
  }
}

}


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';


// Define a TypeScript class for the Groupe object
export class Groupe {
  constructor(
    public idGroupe: number,
    public nom: string,
    public description: string,
    public dateGr: Date, 
    public creator: string,
    public categorieGroupe: string,
    public messages: Message[],
    public members: { [key: string]: string } = {}, 
  ) {}
}
// Define a TypeScript class for the Category object
export class Category {
  constructor(
    public idCatGroupe: number,
    public nomCatGroupe: string,
    
  ) {}
}
// Define a TypeScript class for the Message object
export class Message {
  constructor(
    public contenuMsg: string,
    public owner: string,
    public createdAt: Date 
  ) {}
}

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  groupes: Groupe[] = [];
  closeResult: string | undefined;
  selectedCategoryId: number | undefined; // Remove the null initialization
  categories: Category[] = [];
  userId: number = 0; 
  name: String = "";
  role: String = "";

  constructor(private httpClient: HttpClient,private router: Router,   private modalService: NgbModal ,private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.getUserByUsername();
    this.getGroupes();
    this.getAllCategories();

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
          console.log('User ID:', this.role);
        },
        (error) => {
          // Handle errors if any
          console.error('Error fetching user:', error);
        }
      );
}
  getAllCategories(): void {
    this.httpClient.get<Category[]>('http://localhost:8085/minds/api/CatGr/getAllCatGr')
      .subscribe(
        (response: Category[]) => {
          console.log('API Response:', response);
          this.categories = response;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }
  getGroupes() {
    this.httpClient.get<Groupe[]>('http://localhost:8085/minds/api/Groupe/getAllGroupe').subscribe(
      (response: Groupe[]) => {
        console.log('API Response:', response);
        this.groupes = response;

      },
      (error) => {
        console.error('Error fetching groupes:', error);
      }
    );
  }
  loadGroupDetails(groupId: number): void {
    const apiUrl = `http://localhost:8085/minds/api/Groupe/getGroupe/${groupId}`;
    this.httpClient.get<Groupe>(apiUrl).subscribe(
      (response: Groupe) => {
        console.log('Group Details:', response);
        this.router.navigate(['/groupesChat', groupId]); // Navigate with groupId
      },
      (error) => {
        console.error('Error fetching group details:', error);
      }
    );
  }
  countMembers(members: any): number {
    return Object.keys(members).length;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  isMemberOfGroup(members: { [key: number]: string }, memberIdToCheck: number): boolean {
    // Check if the member with ID 1 is part of the group
    return Object.keys(members).includes(memberIdToCheck.toString());
  }
  
  
  async onSubmit(f: NgForm): Promise<void> {
    const formValue = f.value;
    const categoryId = Number(this.selectedCategoryId);
  
    const groupePayload = {
      nom: formValue.nom,
      description: formValue.description,
      dateGr: new Date().toISOString(),
      creator: { idUser: this.userId }, 
      categorieGroupe: { idCatGroupe: categoryId },
    };
  
    const url = 'http://localhost:8085/minds/api/Groupe/addGroupe';
  
    const newGroupe = await this.httpClient.post<Groupe>(url, groupePayload).toPromise();
    console.log('Groupe added successfully:', newGroupe);
  
    this.getGroupes(); // Reload the groupes list
    this.modalService.dismissAll(); // Close the modal after form submission
  }
  
}
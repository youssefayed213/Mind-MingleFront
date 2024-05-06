
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '@stomp/stompjs';
import { CookieService } from 'ngx-cookie-service';




// Define a TypeScript class for the Groupe object
export class Groupe {
  constructor(
    public nom: string,
    public description: string,
    public dateGr: Date,
    public creator: { idUser: number },
    public categorieGroupe: { idCatGroupe: number ,nomCatGroupe : string},
    public messages: Message[] = [],
    public members: { [key: string]: string } = {}, // Change type to object
    public idGroupe?: number // Optional parameter for existing groupes
  ) {
    // Check if idGroupe is not provided (indicating a new Groupe)
    if (idGroupe === undefined) {
      this.idGroupe = -1; // Assign a default value for new groupes (can be anything, server will assign actual ID)
    } else {
      this.idGroupe = idGroupe; // Use the provided idGroupe for existing groupes
    }
  }
}

// Define a TypeScript class for the Message object
export class Message {
  constructor(
    public contenuMsg: string,
    public owner: string,
    public createdAt: Date 
  ) {}
}
// Define a TypeScript class for the Category object
export class Category {
  constructor(
    public idCatGroupe: number,
    public nomCatGroupe: string,
    
  ) {}
}


@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})

export class GroupesComponent implements OnInit{
  editForm!:FormGroup
  groupMembers: string[] = [];
  groupes: Groupe[] = [];
  categories: Category[] = [];
  deleteId : number | undefined;
  closeResult: string | undefined;
  selectedCategoryId: number | undefined; // Remove the null initialization
  selectedGroupe: Groupe | null = null;
  selectedGroupId : number | undefined;
  memberKeys: any[] = [];
  p: number = 1;
  totalGroupes: number = 0;  
  searchTerm : any; // Initialize searchTerm as an empty string
  userId: number = 0; 
  name: String = "";
  role: String = "";





  constructor(private httpClient: HttpClient,private modalService: NgbModal ,private fb: FormBuilder,private cookieService: CookieService

  ) {}


  ngOnInit(): void {
    this.getUserByUsername();

    this.getGroupes();
    this.getAllCategories();
    this.editForm = this.fb.group({
      idGroupe: [''], 
      nomGroupe: new FormControl('', Validators.required), 
      descGroupe:  new FormControl('', Validators.required),
      category:  new FormControl('', Validators.required), 
      creator: { value: '', disabled: true }, 
      dateGr: [''] 
    });
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

  countMembers(members: any): number {
    return Object.keys(members).length;
  }
  getGroupes() {
    this.httpClient.get<Groupe[]>('http://localhost:8085/minds/api/Groupe/getAllGroupe').subscribe(
      (response: Groupe[]) => {
        
        console.log('API Response:', response);
        this.groupes = response;
        this.totalGroupes = response.length; 

      },
      (error) => {
        console.error('Error fetching groupes:', error);
      }
    );
  }
  
 onDelete() {
   const deleteURL = 'http://localhost:8085/minds/api/Groupe/deleteGroupe/' + this.deleteId;
   this.httpClient.delete(deleteURL, { observe: 'response', responseType: 'text' })
      .subscribe(
        (response) => {
          console.log('Message deleted successfully:', response.body);
          // Filter out the deleted message from the current list
          this.groupes = this.groupes.filter(message => message.idGroupe !== this.deleteId);
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
 openDelete(targetModal: any, groupe: Groupe) {
  this.deleteId = groupe.idGroupe;
 this.modalService.open(targetModal, {
   backdrop: 'static',
   size: 'lg'
 });
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
openEdit(targetModal: any, groupe: Groupe) {
  this.selectedGroupe = groupe;

  // Access the category information from the selected group
  const selectedCategory = this.selectedGroupe.categorieGroupe;

  // Set selectedCategoryId to the selected category's ID
  this.selectedCategoryId = selectedCategory ? selectedCategory.idCatGroupe : undefined;

  // Populate the editForm with the selected group's data
  this.editForm.patchValue({
    idGroupe: this.selectedGroupe.idGroupe,
    nomGroupe: this.selectedGroupe.nom,
    descGroupe: this.selectedGroupe.description,
    category: this.selectedCategoryId, // Assign selectedCategoryId to category field
    creator: this.selectedGroupe.creator,
    dateGr: this.selectedGroupe.dateGr // Assign selectedGroupe's dateGr to dateGr field
  });

  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });
}

onSave(): void {
  const categoryId = Number(this.selectedCategoryId);

  // Construct the payload object based on the form values
  const formValue = this.editForm.value;
  const payload = {
    idGroupe: formValue.idGroupe,
    nom: formValue.nomGroupe,
    description: formValue.descGroupe,
    dateGr: formValue.dateGr,

    creator: { idUser: this.userId }, // Replace 1 with the actual user ID logic

    categorieGroupe: { idCatGroupe: categoryId } // Populate categorieGroupe with the selected category ID

  };

  // Make the PUT request to update the group
  const url = 'http://localhost:8085/minds/api/Groupe/updateGroupe';
  this.httpClient.put(url, payload).subscribe(
    (response) => {
      console.log('Group updated successfully:', response);
      // Optionally, handle success scenario (e.g., show success message)
      this.getGroupes();
      this.modalService.dismissAll(); //dismiss the modal

    },
    (error) => {
      console.error('Error updating group:', error);
      // Optionally, handle error scenario (e.g., show error message)
    }
  );
}
openEditMembersModal(targetModal: any, groupId: number, groupe: Groupe) {
  // Step 1: Extract members from the selected group
  this.selectedGroupe = groupe;
  const groupMembers = this.selectedGroupe.members;
  
  // Populate the groupMembers array with the values of groupMembers object
  this.groupMembers = Object.values(groupMembers);

  // Populate the memberKeys array with the keys of groupMembers
  this.memberKeys = Object.keys(groupMembers);

  // Step 3: Open the modal
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static',
    size: 'lg'
  });

  // Optionally, you can set the groupId in your component for later use
  this.selectedGroupId = groupId;
}



removeMember( groupId: number | undefined,memberId: number | undefined) {
  if (groupId !== undefined && memberId !== undefined) {
    const url = `http://localhost:8085/minds/api/Groupe/removeMember/${groupId}/${memberId}`;
    
    // Make an HTTP DELETE request to the API endpoint
    this.httpClient.delete(url).subscribe(
      (response) => {
        // Handle successful response, maybe update UI or reload data
        console.log('Member removed successfully:', response);
        this.modalService.dismissAll();
        this.getGroupes();

        // You may want to update the group members array or reload the list of members
      },
      (error) => {
        // Handle error
        console.error('Error removing member:', error);
      }
    );
  } else {
    console.error('groupId or memberId is undefined');
  }
}



}

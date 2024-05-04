import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, throwError } from 'rxjs';


// Define a TypeScript class for the Category object
export class Category {
  constructor(
    public idCatGroupe: number,
    public nomCatGroupe: string,
    
  ) {}
}

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{
  editForm!:FormGroup
  
  categories: Category[] = [];
  showUpdateForm = false; // Flag to control update form visibility
  selectedCategory: Category | null = null;
  closeResult : string | undefined;
  deleteId : number | undefined;
  p: number = 1;
  totalCategories: number = 0;  
  searchTerm : any; // Initialize searchTerm as an empty string


  constructor(private httpClient: HttpClient, private modalService: NgbModal ,private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories(),
    this.editForm = this.fb.group({
      idCatGroupe: [null, Validators.required], 
      nomCatGroupe: [''],
    } );
  }

  getCategories() {
    this.httpClient.get<Category[]>('http://localhost:8085/minds/api/CatGr/getAllCatGr').subscribe(
      (response: Category[]) => {
        console.log('API Response:', response);
        this.categories = response;
        this.totalCategories = response.length; 

      },
      (error) => {
        console.error('Error fetching groupes:', error);
      }
    );
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
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8085/minds/api/CatGr/addCatGr';
    this.httpClient.post(url, f.value)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }
  openDelete(targetModal: any, category: Category) {
     this.deleteId = category.idCatGroupe;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onDelete() {
    const deleteURL = 'http://localhost:8085/minds/api/CatGr/deleteCatGr/' + this.deleteId;
    this.httpClient.delete(deleteURL)
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
      });
  }
  openEdit(targetModal: any, category: Category) {
    this.selectedCategory = category;
    // Populate the editForm with the selected category's data
    this.editForm.patchValue({
      idCatGroupe: this.selectedCategory.idCatGroupe, // Set idCatGroupe in the form
      nomCatGroupe: this.selectedCategory.nomCatGroupe // Set nomCatGroupe in the form
    });

    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    nomCatGroupe: category.nomCatGroupe, 
  });
 }
 onSave() {
  const editURL = 'http://localhost:8085/minds/api/CatGr/updateCatGr';
  console.log(this.editForm.value);
  this.httpClient.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}
}

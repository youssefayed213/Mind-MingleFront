//import { RoleUser } from './RoleUser';
//import { Groupe } from './Groupe';
//import { Evenement } from './Evenement';
//import { Inscription } from './Inscription';
//import { Message } from './Message';
//import { Post } from './Post';
import { RendezVous } from './RendezVous';
import { RoleUser } from "./Role"; // Assurez-vous du bon chemin d'importation pour RoleUser

export class User {
  idUser: number;
  nomUser: string;
  prenomUser: string;
  email: string;
  password: string;
  dateNaiss: Date;
  tel: string;
  role: RoleUser;
  numEtudiant: number | null;
  numEnseignant: number | null;
  numExpert: number | null;
  description: string;



  constructor(
    idUser: number,
    nomUser: string,
    prenomUser: string,
    email: string,
    password: string,
    dateNaiss: Date,
    tel: string,
    numEtudiant: number | null,
    numEnseignant: number | null,
    numExpert: number | null,
    description: string,
    role: RoleUser, // Utilisez RoleUser pour le type de paramètre

  ) {
    this.idUser = idUser;
    this.nomUser = nomUser;
    this.prenomUser = prenomUser;
    this.email = email;
    this.password = password;
    this.dateNaiss = dateNaiss;
    this.tel = tel;
    this.role = role; // Utilisez le paramètre role pour assigner la valeur du champ role
    this.numEtudiant = numEtudiant;
    this.numEnseignant = numEnseignant;
    this.numExpert = numExpert;
    this.description = description;

  }
}

import {RoleUser} from "./RoleUser";

export interface User {
  idUser: number;
  nomUser: string;
  prenomUser: string;
  email: string;
  username: string;
  password: string;
  dateNaiss: Date;
  tel: string;
  role: RoleUser;
  numEtudiant: number | null;
  numEnseignant: number | null;
  numExpert: number | null;
  confirmationToken: string;
  blocked: boolean;
  failedLoginAttempts: number;
  imageProfil: ArrayBuffer | null;
  imageProfilBase64?: string; // New property for base64 representation of the image
  totalFeedbackScore: number;
  totalFeedbackSubmissions: number;



}

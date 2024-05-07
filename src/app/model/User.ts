import { Post } from "./Post";
import { Commentaire } from "./Commentaire";

export class User {
  constructor(
    public idUser?: number,
    public nomUser?: string,
    public prenomUser?: string,
    public email?: string,
    public password?: string,
    public dateNaiss?: string, // Assurez-vous que la date est correctement formatée en chaîne de caractères
    public tel?: string,
    public posts?: Post[],
    public commentaires?: Commentaire[]
  ) {}
}

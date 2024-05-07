import {User} from "./User";
import {Post} from "./Post";


export class Commentaire {
  constructor(
    public idComment?: number,
    public contenu?: string,
    public dateComment?: Date,
    public user?: User, // Relation ManyToOne avec l'utilisateur
    public post?: Post // Relation ManyToOne avec la publication
  ) {}
}

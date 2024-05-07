import {User} from "../models/User";
import {Commentaire} from "./Commentaire";

export enum TypePost {
  DEPRESSION,
  ANXIETE,
  TROUBLES_BIPOLAIRES,
  SCHIZOPHRENIE,
  TROUBLES_ALIMENTAIRES,
  TROUBLES_PERSONNALITE,
  TROUBLE_OBSESSIONNEL_COMPULSIF,
  TSPT,
  TROUBLES_AUTISTIQUES,
  TROUBLES_HUMEUR,
  ADDICTIONS,
  TROUBLES_SOMMEIL,
  TDAH,
  TROUBLES_DISSOCIATIFS,
  TROUBLES_PERSONNALITE_MULTIPLES,
  TROUBLES_COMPORTEMENT_ALIMENTAIRE,
  PHOBIES_SPECIFIQUES,
  TROUBLES_CONTROLE_IMPULSIONS,
  TROUBLES_LANGAGE_COMMUNICATION,
  TROUBLES_MEMOIRE
}


export class Post {
  constructor(
    public idPost?: number,
    public titre?: string,
    public description?: string,
    public typePost?: TypePost,
    public image?: string, // Ajout de l'attribut image
    public datePost?: Date,
    public likes?: number,
    public dislikes?: number,
    public user?: User, // Relation ManyToOne avec l'utilisateur
    public commentaires?: Commentaire[], // Relation OneToMany avec les commentaires
    // Ajoutez d'autres propriétés si nécessaire
  ) {}
}

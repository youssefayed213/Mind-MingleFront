import { NoteFeedback } from "./NoteFeedback";

export class Feedback {
  idFeedback?: number;
  commentaire: string;
  note: NoteFeedback;
  dateFeedback: string;

  constructor(
    idFeedback: number | undefined,
    commentaire: string,
    note: NoteFeedback,
    dateFeedback: string
  ) {
    this.idFeedback = idFeedback;
    this.commentaire = commentaire;
    this.note = note; // Utilisez la valeur passée en paramètre pour 'note'
    this.dateFeedback = dateFeedback;
  }
}

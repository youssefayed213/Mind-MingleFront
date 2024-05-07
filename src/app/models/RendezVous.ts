import { Feedback } from "./Feedback";
import {User} from "./User";
import {TypeRdv} from "./TypeRdv";


export class RendezVous {
  idRdv: number;
  dateRdv: Date;
  typeRdv!: TypeRdv;
  lieu: string;

  constructor(idRdv: number , dateRdv: Date, typeRdv: TypeRdv, lieu: string) {
    this.idRdv = idRdv;
    this.dateRdv = dateRdv;
    this.typeRdv = typeRdv;
    this.lieu = lieu;
  }
}


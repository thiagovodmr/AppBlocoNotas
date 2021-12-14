import { Nota } from "./nota";
import { Tag } from "./tag";

export class NotaTag {
  id : number;
  nota : Nota;
  tag: Tag;
  notaId : number;
  tagId: number;

  constructor(tagId:number, notaId: number){
    this.tagId = tagId;
    this.notaId = notaId;
  }
}

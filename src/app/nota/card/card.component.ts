import { Nota } from 'src/app/class/nota';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nota-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() titulo: string = "personalize";
  @Input() conteudo: string = "personalize";
  @Input() dataCriacao: Date;
  @Input() id: number = 0;
  @Input() showButtons : boolean = true;

  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){
    this.edit.emit({"id": this.id});
  }

  onDelete(){
    this.delete.emit({"id": this.id});
  }

}

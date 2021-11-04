import { Nota } from 'src/app/class/nota';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'nota-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() titulo: string;
  @Input() conteudo: string;
  @Input() id: number;

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

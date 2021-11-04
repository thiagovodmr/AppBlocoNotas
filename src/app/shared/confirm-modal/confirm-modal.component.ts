import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() msgBtnSuccess: string = "Sim";
  @Input() msgBtnDanger: string = "Não";

  constructor(public bsModalRef: BsModalRef) { }

  confirmResult: Subject<boolean>;

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onClose(){
    this.confirmAndClose(false);
  }

  onConfirm(){
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean){
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

}

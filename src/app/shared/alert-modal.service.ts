import { Injectable } from '@angular/core';
import { BsModalService , BsModalRef} from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})

export class AlertModalService {


  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: string, dismissTimeout?: number){
    const bsModalRef : BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(()=> bsModalRef.hide(), (dismissTimeout*1000));
    }
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3);
  }

  showConfirm(title: string, message:string , msgBtnSuccess?: string, msgBtnDanger?: string){
    const bsModalRef : BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.message = message;
    if(msgBtnSuccess){
      bsModalRef.content.msgBtnSuccess = msgBtnSuccess;
    }
    if(msgBtnDanger){
      bsModalRef.content.msgBtnDanger = msgBtnDanger;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;

  }

}

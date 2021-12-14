import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from './../shared/alert-modal.service';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Nota } from '../class/nota';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NotaService } from './nota.service';
import { catchError, switchMap, take } from 'rxjs/operators';


@Component({
  selector: 'notas',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})

export class NotaComponent implements OnInit {

  notas: Nota[] = [];
  notas$: Observable<Nota[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service : NotaService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ){ }

  ngOnInit(){
    //  async
    this.onRefresh();
  }

  onRefresh(){
    this.notas$ = this.service.get()
    .pipe(
      catchError(error => {
        console.error(error);
        this.handleError();
        this.error$.next(true);
        return EMPTY;
      })
    )
  }

  handleError(){
    this.alertService.showAlertDanger("Não está sendo possível carregar as anotações, tente novamente mais tarde");
  }

  onEdit(id: number){
    this.router.navigate(["atualizar", id], {relativeTo: this.route });
  }

  OnChildrenEdit(evento){
    this.onEdit(evento.id);
  }

  OnChildrenDelete(evento){
    this.onDelete(evento.id);
  }

  onDelete(id: number){
    const result$ = this.alertService.showConfirm("Confirmação","Tem certeza que deseja deletar esse registro?");
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.delete(id) : EMPTY)
    )
    .subscribe(
      success => {
        this.alertService.showAlertSuccess("Anotação deletada com sucesso");
        this.onRefresh();
      },
      error=>{
        this.alertService.showAlertDanger("Erro ao deletar registro, tente novamente mais tarde");
      }
    );
  }

}

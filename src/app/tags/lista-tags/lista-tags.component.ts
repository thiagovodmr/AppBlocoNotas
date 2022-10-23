import { AlertModalService } from './../../shared/alert-modal.service';
import { Tag } from './../../class/tag';
import { EMPTY, Observable, Subject } from 'rxjs';
import { TagService } from './../tag.service';
import { Component, OnInit } from '@angular/core';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-tags',
  templateUrl: './lista-tags.component.html',
  styleUrls: ['./lista-tags.component.css']
})
export class ListaTagsComponent implements OnInit {

  tags: Tag[] = [];
  tags$ : Observable<Tag[]>
  error$ = new Subject<boolean>();

  constructor(
    private service : TagService,
    private alertService : AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onRefresh();
  }

  onRefresh(){
    this.tags$ = this.service.get()
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
    this.alertService.showAlertDanger("Não está sendo possível carregar as tags, tente novamente mais tarde");
  }

  onEdit(id: number){
    this.router.navigate(["atualizar", id], {relativeTo: this.route });
  }

  onDelete(id: number){
    const result$ = this.alertService.showConfirm("Confirmação","Tem certeza que deseja deletar esse registro?");
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.delete(id) : EMPTY)
    )
    .subscribe(
      success => {
        this.alertService.showAlertSuccess("Tag deletada com sucesso");
        this.onRefresh();
      },
      error=>{
        this.alertService.showAlertDanger("Erro ao deletar registro, tente novamente mais tarde");
      }
    );
  }
}

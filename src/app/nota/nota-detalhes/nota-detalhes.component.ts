import { NotaTagService } from '../nota-tag/notaTag.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Subscription } from 'rxjs';
import { NotaTag } from 'src/app/class/nota-tag';
import { Tag } from 'src/app/class/tag';

import { Nota } from './../../class/nota';
import { NotaService } from './../nota.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-nota-detalhes',
  templateUrl: './nota-detalhes.component.html',
  styleUrls: ['./nota-detalhes.component.css']
})
export class NotaDetalhesComponent implements OnInit {
  id : number;
  inscricaoRota : Subscription;
  nota : Nota;
  categorias: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service : NotaService,
    private ntService: NotaTagService,
    private alertService: AlertModalService,
  ){}

  ngOnInit(){
    this.inscricaoRota = this.route.params.subscribe(
      (params: any) => {
        this.id = params["id"];

        this.service.getById(this.id)
        .subscribe(
          dados => (dados != null) ? this.nota = dados : this.router.navigate(["/notas/notaNaoEncontrada"])
        );
      }
    );
    this.onRefresh()
  }

  ngOnDestroy(){
    this.inscricaoRota.unsubscribe();
  }

  onRefresh(){
    this.ntService.getTags(this.id)
      .subscribe(
        dados => {
          this.categorias = dados;
        }
      );
  }

  desassociarTag(id:number){

      const result$ = this.alertService.showConfirm("Confirmação","Tem certeza que deseja deletar esse registro?");
      result$.asObservable().pipe(
        take(1),
        switchMap(result => result ? this.ntService.delete(id) : EMPTY)
      )
      .subscribe(
        success => {
          this.alertService.showAlertSuccess("categoria deletada com sucesso");
          this.onRefresh();
        },
        error=>{
          this.alertService.showAlertDanger("Erro ao deletar registro, tente novamente mais tarde");
        }
      );

  }

}

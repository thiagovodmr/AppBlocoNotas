import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Nota } from './../../class/nota';
import { NotaService } from './../nota.service';

@Component({
  selector: 'app-nota-detalhes',
  templateUrl: './nota-detalhes.component.html',
  styleUrls: ['./nota-detalhes.component.css']
})
export class NotaDetalhesComponent implements OnInit {
  id : number;
  inscricaoRota : Subscription;
  nota : Nota;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service : NotaService
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

  }

  ngOnDestroy(){
    this.inscricaoRota.unsubscribe();
  }

}

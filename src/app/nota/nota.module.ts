import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaService } from './nota.service';

import { NotaComponent } from './nota.component';
import { NotaDetalhesComponent } from './nota-detalhes/nota-detalhes.component';
import { NotaRoutingModule } from './nota.routing.modute';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotaFormComponent } from './nota-form/nota-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';



@NgModule({
  imports: [
    CommonModule,
    NotaRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    NotaComponent,
    NotaDetalhesComponent
  ]
  ,
  declarations: [
    NotaComponent,
    NotaDetalhesComponent,
    NotaFormComponent,
    CardComponent
  ],
  providers:[
    NotaService
  ]

})
export class NotaModule { }

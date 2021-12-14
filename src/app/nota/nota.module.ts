import { NotaTagService } from './nota-tag/notaTag.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaService } from './nota.service';

import { NotaComponent } from './nota.component';
import { NotaDetalhesComponent } from './nota-detalhes/nota-detalhes.component';
import { NotaRoutingModule } from './nota.routing.modute';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotaFormComponent } from './nota-form/nota-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CategoriaformComponent } from './categoriaform/categoriaform.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NotaRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule
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
    CardComponent,
    CategoriaformComponent
  ],
  providers:[
    NotaService,
    NotaTagService
  ]

})
export class NotaModule { }

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagService } from './tag.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTagsComponent } from './lista-tags/lista-tags.component';
import { TagRoutingModule } from './tag.routing/tag.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TagFormComponent } from './tag-form/tag-form.component';



@NgModule({
  declarations: [
    ListaTagsComponent,
    TagFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TagRoutingModule,
    FontAwesomeModule
  ],
  exports:[
    ListaTagsComponent
  ],
  providers:[
    TagService
  ]
})

export class TagModule { }

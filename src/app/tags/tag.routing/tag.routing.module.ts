import { TagFormComponent } from './../tag-form/tag-form.component';
import { ListaTagsComponent } from './../lista-tags/lista-tags.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TagResolverGuard } from '../guards/tag-resolver.guard';


const TAGS_ROUTES : Routes = [
  {path: '', component: ListaTagsComponent},
  {path: 'novo', component: TagFormComponent, resolve: {tag: TagResolverGuard} },
  {path: 'atualizar/:id', component: TagFormComponent, resolve: {tag: TagResolverGuard} }
];

@NgModule({
  imports: [RouterModule.forChild(TAGS_ROUTES)],
  exports: [RouterModule],
})

export class TagRoutingModule { }

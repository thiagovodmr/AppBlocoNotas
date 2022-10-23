import { NotaResolverGuard } from './guards/nota-resolver.guard';
import { NotaFormComponent } from './nota-form/nota-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { NotaDetalhesComponent } from './nota-detalhes/nota-detalhes.component';
import { NaoEncontradoComponent } from './erros/nao-encontrado/nao-encontrado.component';
import { NotaComponent } from './nota.component';


const NOTAS_ROUTES : Routes = [
    // {path: , component: }
    {path: '', component: NotaComponent},
    {path: 'novo', component: NotaFormComponent, resolve: {nota: NotaResolverGuard} },
    {path: 'atualizar/:id', component: NotaFormComponent,  resolve: {nota: NotaResolverGuard} },
    {path: 'notaNaoEncontrada', component: NaoEncontradoComponent},
    {path:':id', component: NotaDetalhesComponent}
];

@NgModule({
    imports: [RouterModule.forChild(NOTAS_ROUTES)],
    exports: [RouterModule],
})
export class NotaRoutingModule { }


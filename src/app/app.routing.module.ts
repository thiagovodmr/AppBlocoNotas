import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { LoginComponent } from './login/login.component';


const APP_ROUTES : Routes = [
    // Lazy loading exemplo: {path: 'notas' , loadChildren: () => import('./nota/nota.module').then(m => m.NotaModule)}
    // {path: , component: }

    // {path:'', component: HomeComponent, canActivate: [AuthGuard]},
    {path: '', redirectTo: 'notas', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path:'sobre', component: SobreComponent },
    {path: 'notas' , loadChildren: () => import('./nota/nota.module').then(n => n.NotaModule), canActivate: [AuthGuard]},
    {path: 'tags' , loadChildren: () => import('./tags/tag.module').then(t => t.TagModule), canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

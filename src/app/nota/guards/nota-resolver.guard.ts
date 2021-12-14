import { NotaService } from '../nota.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Nota } from 'src/app/class/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaResolverGuard implements Resolve<Nota> {

  constructor(private notaService: NotaService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nota>{
    if(route.params && route.params["id"]){
      return this.notaService.getById(route.params["id"])
    }

    return of({
      id: null,
      titulo: null,
      conteudo: null,
      dataCriacao: null
    });
  }
}

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { Tag } from 'src/app/class/tag';
import { Observable, of } from 'rxjs';
import { TagService } from '../tag.service';

@Injectable({
  providedIn: 'root'
})

export class TagResolverGuard implements Resolve<Tag>{

  constructor(private tagService: TagService){}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag>{
    if(route.params && route.params["id"]){
      return this.tagService.getById(route.params["id"])
    }

    return of({
      id: null,
      nome: null
    });
  }
}


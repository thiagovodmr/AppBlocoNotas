import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(protected http: HttpClient, @Inject(String) private API_URL: string) {
  }

  get(){
    let url : string  = this.API_URL;
    return this.http.get<T[]>(url).pipe(take(1))
  }

  getById(id: number){
   let url: string = `${this.API_URL}/${id}`;
   return this.http.get<T>(url).pipe(take(1));
  }

  private create(entity: T){
   return this.http.post(this.API_URL, entity).pipe(take(1));
  }

  private update(entity: T){
   return this.http.put(this.API_URL, entity).pipe(take(1));
  }

  save(entity: T){
     if(entity["id"]){
       return this.update(entity);
     }else{
       return this.create(entity);
     }
  }

  delete(id: number){
   let url: string = `${this.API_URL}/${id}`;
   return this.http.delete(url).pipe(take(1));
  }
}


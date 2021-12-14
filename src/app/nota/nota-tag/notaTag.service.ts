import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotaTagService {

  url : string;
  constructor(protected http: HttpClient) {
    this.url = `${environment.API}notaTag`
  }

  getTags(notaId: number){
    let url: string = `${this.url}/${notaId}`;
    return this.http.get<any[]>(url).pipe(take(1))
  }

  associarTags(id : number,  selectedTags : any[]){
    return this.create(id, selectedTags);
  }

  private create(id:number, nt: any){
    return this.http.post(this.url,{ "notaId": id, "tags": nt}).pipe(take(1));
  }

  delete(id: number){
    let url: string = `${this.url}/${id}`;
    return this.http.delete(url).pipe(take(1));
  }
}



import { CrudService } from './../shared/crud.service';
import { Injectable } from '@angular/core';
import { Tag } from '../class/tag';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService extends CrudService<Tag> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}tags`);
  }


}

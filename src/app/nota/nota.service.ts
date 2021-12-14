import { CrudService } from './../shared/crud.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Nota } from '../class/nota';
import { delay, take, tap } from 'rxjs/operators';
import { Tag } from '../class/tag';
import { NotaTag } from '../class/nota-tag';

@Injectable({
  providedIn: 'root'
})

export class NotaService extends CrudService<Nota>{

    constructor(protected http: HttpClient) {
      super(http, `${environment.API}notas`);
    }

}

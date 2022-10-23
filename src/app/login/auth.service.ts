import { Router } from '@angular/router';
import { Usuario } from './../class/usuario';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado : boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router : Router) { }

  fazerLogin(usuario: Usuario){
    if(usuario.nome == "root" && usuario.senha == "1234"){
      this.usuarioAutenticado = true;
      this.router.navigate([""]);
    }else{
      this.usuarioAutenticado = false;
    }

    this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}

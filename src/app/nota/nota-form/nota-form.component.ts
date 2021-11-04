import { TagService } from './../../tags/tag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { NotaService } from './../nota.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Tag } from 'src/app/class/tag';

@Component({
  selector: 'app-nota-form',
  templateUrl: './nota-form.component.html',
  styleUrls: ['./nota-form.component.css']
})

export class NotaFormComponent implements OnInit {

  form : FormGroup;
  submitted: boolean = false;
  error$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private notaService : NotaService,
              private modal: AlertModalService,
              private router: Router,
              private routeActive: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const nota = this.routeActive.snapshot.data['nota'];


    this.form = this.fb.group(
      {
        id: [Number(nota.id)],
        titulo: [ nota.titulo , [Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
        conteudo: [ nota.conteudo , [Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
      }
    )
  }


  onSubmit(){
    this.submitted = true;

    if(this.form.valid){
      let successMessage = "Nota criada com sucesso";
      let errorMessage = "Não foi possível criar nota, tente novamente";

      if(this.form.value.id){
         successMessage = "Nota atualizada com sucesso";
         errorMessage = "Não foi possível atualizar nota, tente novamente";
      }

      this.notaService.save(this.form.value).subscribe(
        success=>{
          this.modal.showAlertSuccess(successMessage);
              this.router.navigate(["/notas"]);
        },
        error => this.modal.showAlertDanger(errorMessage),
      );
    }
  }

  onCancel(){
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string){
    return this.form.get(field).errors
  }
}



// this.routeActive.params.subscribe(
    //   (params: any) =>{
    //     const id = params["id"];

    //     const curso$ = this.notaService.getNota(id);
    //     curso$.subscribe(
    //       curso => {
    //         this.updateForm(curso);
    //       }
    //     );
    //   }
    // );


    // this.routeActive.params
    // .pipe(
    //   map((params: any)=> params["id"]),
    //   switchMap(id => this.notaService.getNota(id))
    // )
    // .subscribe(curso => this.updateForm(curso));

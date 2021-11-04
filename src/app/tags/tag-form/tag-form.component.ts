import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})

export class TagFormComponent implements OnInit {

  form : FormGroup;
  submitted: boolean = false;


  constructor(private fb: FormBuilder,
    private tagService : TagService,
    private modal: AlertModalService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const tag = this.routeActive.snapshot.data['tag'];
    this.form = this.fb.group(
      {
        id: [Number(tag.id)],
        nome: [ tag.nome , [Validators.required, Validators.minLength(4), Validators.maxLength(250)]]
      }
    )
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.valid){
      let successMessage = "Tag criada com sucesso";
      let errorMessage = "Não foi possível criar a Tag, tente novamente";

      if(this.form.value.id){
        successMessage = "Tag atualizada com sucesso";
        errorMessage = "Não foi possível atualizar Tag, tente novamente";
      }

      this.tagService.save(this.form.value).subscribe(
        success=>{
          this.modal.showAlertSuccess(successMessage);
              this.router.navigate(["/tags"]);
          },
        error => this.modal.showAlertDanger(errorMessage)
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


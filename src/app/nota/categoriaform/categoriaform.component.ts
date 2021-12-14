import { Nota } from 'src/app/class/nota';
import { TagService } from './../../tags/tag.service';
import { NotaService } from './../nota.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { Tag } from 'src/app/class/tag';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NotaTagService } from '../nota-tag/notaTag.service';


@Component({
  selector: 'app-categoriaform',
  templateUrl: './categoriaform.component.html',
  styleUrls: ['./categoriaform.component.css']
})
export class CategoriaformComponent implements OnInit {

  form : FormGroup;
  submitted: boolean = false;
  error$ = new Subject<boolean>();

  tags: Tag[] = [];
  categoriasJaAssociadas : any[] = [];
  nota: Nota;

  dropdownList :any[] = [];
  selectedItems = [];
  dropdownSettings  : IDropdownSettings = {};


  constructor(
    private fb: FormBuilder,
    private notaTagService : NotaTagService,
    private tagService : TagService,
    private modal: AlertModalService,
    private router: Router,
    private routeActive: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.nota = this.routeActive.snapshot.data['nota'];

    this.configuracaoDropwdownList();
    this.loadSelectedTags();
  }

  onSubmit(){
    let notaId = this.nota.id;
    this.notaTagService.associarTags(notaId, this.selectedItems).subscribe(
      success=>{
          this.modal.showAlertSuccess("categorias associadas com sucesso");
          this.loadSelectedTags();
          this.router.navigate(["/notas", notaId]);
      },
      error => this.modal.showAlertDanger("erro nas categorias selecionadas"),
    );

  }

  onCancel(){
    this.submitted = false;
  }


  hasError(field: string){
    return this.form.get(field).errors;
  }

  loadTags(){
    this.tagService.get().subscribe(
      dados=>{
        this.dropdownList = dados;
        this.categoriasJaAssociadas.forEach(c=> {
          const index  = this.dropdownList.findIndex(x => x.id == c.tagId);
          this.dropdownList.splice(index, 1)
        })
      }
    )
  }

  loadSelectedTags(){
    this.notaTagService.getTags(this.nota.id)
        .subscribe(
          dados => {
            this.categoriasJaAssociadas = dados;
          },
          error =>{
            console.log("error");
          },
          () => {
              this.loadTags();
          }
        );
  }

  handleError(){
    this.modal.showAlertDanger("Não está sendo possível carregar as tags, tente novamente mais tarde");
  }


  configuracaoDropwdownList(){
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Selecionar tudo',
      unSelectAllText: 'deselecionar tudo',
      searchPlaceholderText: 'pesquisar',
      noDataAvailablePlaceholderText: "sem categorias, ou todas já foram associadas",
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    // this.selectedItems.push(item);
    console.log(this.selectedItems)
  }

  onSelectAll(items: any) {
    console.log(this.selectedItems)
  }

  onDeSelect(item: any){
    // const index  = this.selectedItems.findIndex(x => x.id == item.id)
    // this.selectedItems.splice(index, 1);

    console.log(this.selectedItems)
  }

  onDeSelectAll(){
    // this.selectedItems = []
    console.log(this.selectedItems)
  }

  backRoute(){
    this.router.navigate(["/notas", this.nota.id]);
  }
}

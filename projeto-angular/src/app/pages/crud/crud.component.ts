import { CrudService } from './services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  lista: any;
  novoProdutoForm: FormGroup | any;

  constructor(
    private serviceCrud: CrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLista();
  }

  //INICIA FORMULARIO
  initForm() {
    this.novoProdutoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      id: new FormControl(0),
    })
  }

  //LISTAR
  getLista() {
    this.serviceCrud.get().subscribe((respostaAPI) => {
      this.lista = respostaAPI;
    })
  }

  //ENVIAR
  async enviar() {
    const {
      nome,
      descricao,
      id,

    } = this.novoProdutoForm.value;

    const object = {
      nome: nome,
      descricao: descricao,
      id: id,
    };

    if (id === 0) {
      this.criarPost(object);
      this.limparCampos();
      this.getLista();

    } else {
      this.update(object, id);
      this.limparCampos();
      this.getLista();
    }
  }

  criarPost(object: object) {
    this.serviceCrud.post(object).subscribe();
  }

  //EDITAR
  editar(item: any) {
    const {
      nome,
      descricao,
      id,
    } = item;
    const object = {
      nome,
      descricao,
      id,
    };
    this.novoProdutoForm.patchValue(object);
  }

  update(object: any, id: any) {
    this.serviceCrud.put(object, id).subscribe();
  }

  //LIMPAR FORMULARIO
  limparCampos() {
    this.getLista();
    this.initForm();
  }

  //DELETE
  deletar(id: any) {
    this.serviceCrud.delete(id).subscribe(() => {
      this.getLista();
    });
  }
}

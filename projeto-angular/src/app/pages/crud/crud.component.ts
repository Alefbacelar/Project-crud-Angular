import { CrudService } from './services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  lista:any;
  mostrar: boolean = false;
  mostrarEditar: boolean = false;
  novoProdutoForm: FormGroup | any;
  id:any;

  constructor(
    private serviceCrud: CrudService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLista();
  }

//LISTAR

  getLista(){
    this.serviceCrud.get().subscribe((respostaAPI)=>{
      this.lista = respostaAPI
      console.log(respostaAPI)
    })
  }

  toggle () {
    this.mostrar = !this.mostrar;
  }
  mostrarEdit () {
    this.mostrarEditar = !this.mostrarEditar;
  }

//ENVIAR

  async post(){
    console.log('Cheguei no post')
    const{
      nome,
      descricao,
    } = this.novoProdutoForm.value;
    const objetoGroup = {
      nome,
      descricao,
    };
    this.criarPost(objetoGroup);
  }

  criarPost(objetoGroup: object){
    console.log('criando')
    this.serviceCrud.post(objetoGroup).subscribe()
  }

  initForm(){
    this.novoProdutoForm = this.formBuilder.group({
      nome: [''],
      descricao: ['']
    })
  }

//DELETE

async deletar(){
  this.serviceCrud.delete(this.id).subscribe(()=>{
    this.getLista();
  })
}

//EDITAR

editar(item:any){
  console.log('chegou no editar')
  const {
    nome,
    descricao
  } = item;
  const object = {
    nome,
    descricao
  };
  this.novoProdutoForm.patchValue(object)
}

atualizar(object: any){
  console.log('chegou no atualizar')
  this.serviceCrud.editar(object).subscribe(()=>{
    this.getLista();
  })
}

}

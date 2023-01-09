import { CrudService } from './services/crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  lista:any;
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

//ENVIAR

  async post(){
    console.log('Cheguei no post')
    const{
      nome,
      descricao,
      id
    } = this.novoProdutoForm.value;
    const object = {
      nome : nome,
      descricao : descricao,
      id : id
    };
     if (id === 0) {

       this.criarPost(object);
       this.limparCampos();
       this.getLista();


      } else {
        this.update(object,id);
        this.limparCampos();
        this.getLista();

    }
  }

  criarPost(object: object){
    console.log('criando')
    this.serviceCrud.post(object).subscribe(
      )
      console.log('Criado com sucesso')
  }

  initForm(){
    this.novoProdutoForm = this.formBuilder.group({
      nome: [''],
      descricao: [''],
      id: new FormControl(0),
    })
  }

//DELETE

deletar(id: any) {
  this.serviceCrud.delete(id).subscribe(() => {
    this.getLista();
  });
}

//EDITAR

editar(item:any){
  console.log('chegou no editar')
  const {
    nome,
    descricao,
    id
  } = item;
  const object = {
    nome,
    descricao,
    id
  };
  this.novoProdutoForm.patchValue(object)
}

update(object: any, id:any){
  console.log('chegou no atualizar')
  this.serviceCrud.editar(object,id).subscribe(()=>{
    console.log('update')
    //this.getLista();
    //this.initForm()
  })
}

limparCampos(){
  this.getLista();
  this.initForm();
}

}

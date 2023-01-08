import { CrudService } from './services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  lista:any;
  mostrar: boolean = false;

  constructor(
    private serviceCrud: CrudService
  ) { }

  ngOnInit(): void {
    this.getLista()
  }

  getLista(){
    this.serviceCrud.get().subscribe((respostaAPI)=>{
      this.lista = respostaAPI
      console.log(respostaAPI)
    })
  }

  toggle () {
    this.mostrar = !this.mostrar;
  }

}

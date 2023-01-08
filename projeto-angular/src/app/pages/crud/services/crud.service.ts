import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient
  ) { }

  get(){
    let lista = this.http.get('http://localhost:3000/produtos')
    return lista;
  }

  post(produtos: any){
    return this.http.post('http://localhost:3000/produtos/', produtos)
  }

  delete(id: any){
    console.log('Cheguei no deletar')
    return this.http.delete('http://localhost:3000/produtos/', id)
  }

  editar(id:any){
    return this.http.put('http://localhost:3000/produtos/', id)
  }

}

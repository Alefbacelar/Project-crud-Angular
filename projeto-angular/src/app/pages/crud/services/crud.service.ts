import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private http: HttpClient ) { }

  //GET PEGA A LISTA DA API
  get(){
    let lista = this.http.get('http://localhost:3000/produtos')
    return lista;
  }

  //POST ENVIA DADOS PARA API
  post(produtos: any){
    return this.http.post('http://localhost:3000/produtos/', produtos)
  }

  //DELETE EXCLUIR DADOS DA API
  delete(id: any) {
    return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
  }

  //PUT EDITA DADOS DA API
  put(produtos: any, id: any): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/produtos/${id}`,produtos )
  }

}

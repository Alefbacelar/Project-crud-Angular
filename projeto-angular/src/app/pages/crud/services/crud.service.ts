import { Produtos } from './../models/crud';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, take } from 'rxjs';

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

  delete(produtos: Produtos) {
    return this.http.delete<Produtos>('http://localhost:3000/produtos/'+ produtos.id)
  }

  editar(produtos: Produtos){
    return this.http.put<Produtos>('http://localhost:3000/produtos/'+ produtos.id, JSON.stringify(produtos))
  }

/*   editar(id: any): Observable<any>{
    return this.http.put<any>('http://localhost:3000/produtos/', id)
  } */

}

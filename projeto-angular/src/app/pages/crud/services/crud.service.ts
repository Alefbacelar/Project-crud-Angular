import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  delete(id: any) {
    return this.http.delete<any>(`http://localhost:3000/produtos/${id}`)
  }

  editar(produtos: any, id: any): Observable<any>{
    return this.http.put<any>(`http://localhost:3000/produtos/${id}`,produtos )
  }

}

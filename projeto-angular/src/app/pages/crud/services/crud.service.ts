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
    return this.http.post('http://localhost:3000/produtos/', produtos).pipe(take(1))
  }

}

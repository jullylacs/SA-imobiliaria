import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Imovel } from '../models/imoveis.models';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService {
  private apiUrl = 'http://localhost:3012/imoveis';

  constructor(private http: HttpClient) {}

  //& Métodos para conexão com a apiREST

  //* GET - obter a lista de imóveis
  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.apiUrl);
  }

  //* POST - cadastrar um novo imóvel
  postImovel(imovel: Imovel): Observable<Imovel> {
    return this.http.post<Imovel>(this.apiUrl, imovel);
  }

  //* PUT - atualizar imóvel existente
  putImovel(id: number, imovel: Imovel): Observable<Imovel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Imovel>(url, imovel);
  }

  //* DELETE - excluir imóvel
  deleteImovel(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  //* GET by ID - obter imóvel específico
  getImovelById(id: number): Observable<Imovel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Imovel>(url);
  }
}

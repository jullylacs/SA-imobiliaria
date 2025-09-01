// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, throwError, map, tap } from 'rxjs';
import { Usuario, UserTipo } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ajuste a porta conforme seu json-server (padrão: 3000)
  private apiUrl = 'http://localhost:3012/usuarios';
  private readonly CHAVE_AUTH = 'usuarioLogado';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Registro genérico: por padrão cria CLIENTE.
   * Para criar corretores, chame com tipo = 'corretor' (normalmente feito por um admin).
   */
  registrar(
    dados: Omit<Usuario, 'id' | 'tipo'>,
    tipo: UserTipo = 'usuario'
  ): Observable<Usuario> {
    const payload: Usuario = { ...dados, tipo };

    // Verifica se já existe usuário com o mesmo e-mail
    return this.http.get<Usuario[]>(`${this.apiUrl}?email=${encodeURIComponent(dados.email)}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return throwError(() => new Error('E-mail já cadastrado.'));
        }
        return this.http.post<Usuario>(this.apiUrl, payload).pipe(
          tap(user => {
            // Mantemos a sessão já autenticada após o cadastro
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(user));
          })
        );
      })
    );
  }

  /**
   * Login: retorna o usuário autenticado (ou null se inválido).
   * Armazena o usuário em localStorage como "sessão".
   */
  login(email: string, senha: string): Observable<Usuario | null> {
    const params = `?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;
    return this.http.get<Usuario[]>(`${this.apiUrl}${params}`).pipe(
      map(users => users.length ? users[0] : null),
      tap(user => {
        if (user) {
          localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(user));
        }
      })
    );
  }

  /**
   * Logout: limpa a sessão e redireciona para /login.
   */
  logout(): void {
    localStorage.removeItem(this.CHAVE_AUTH);
    this.router.navigate(['/login']);
  }

  /**
   * Autenticação: há usuário em sessão?
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.CHAVE_AUTH);
  }

  /**
   * Usuário atual (ou null).
   */
  getUsuario(): Usuario | null {
    const raw = localStorage.getItem(this.CHAVE_AUTH);
    return raw ? JSON.parse(raw) as Usuario : null;
  }

  /**
   * Perfil atual: 'cliente' | 'corretor' | 'admin' (ou null).
   * Usado pela guarda para autorização por perfil.
   */
  getPerfilUsuario(): UserTipo | null {
    return this.getUsuario()?.tipo ?? null;
  }

  /**
   * Verifica se o usuário atual possui algum dos perfis exigidos.
   * Útil para rotas com data: { perfis: ['corretor'] }.
   */
  hasPerfil(perfisAutorizados: UserTipo[]): boolean {
    const perfil = this.getPerfilUsuario();
    return perfil ? perfisAutorizados.includes(perfil) : false;
  }
}

// src/app/models/usuario.model.ts
export type UserTipo = 'corretor' | 'usuario';

export interface Usuario {
  id?: number | string;
  nome?: string;
  email: string;
  senha: string;     // no mock fica em texto puro
  tipo: UserTipo;    // 'corretor' | 'usuario'
}
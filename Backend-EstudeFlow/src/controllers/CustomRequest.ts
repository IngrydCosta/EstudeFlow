import { Request } from 'express';

export interface Usuario {
  id: number;        
  username: string;
  nome: string;

}

export interface CustomRequest extends Request {
  usuario?: Usuario;  
}

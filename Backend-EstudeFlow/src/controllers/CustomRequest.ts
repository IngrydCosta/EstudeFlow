import { Request } from 'express';

export interface CustomRequest extends Request {
  usuario?: {
    username: string;
    nome: string;
  };
}
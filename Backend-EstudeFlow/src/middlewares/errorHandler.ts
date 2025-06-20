import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro na aplicação:', err);
  
  // Verifica se é um erro conhecido
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  // Erro genérico
  return res.status(500).json({ error: 'Erro interno do servidor' });
};


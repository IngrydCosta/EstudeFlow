import { Request, Response, NextFunction } from 'express';

// Token simples para autenticação (em produção seria mais seguro)
const VALID_TOKEN = 'professor-token-123';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verifica se existe o token no cookie
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de autenticação não encontrado. Faça login novamente.' 
      });
    }
    
    // Verifica se o token é válido
    if (token !== VALID_TOKEN) {
      return res.status(401).json({ 
        error: 'Token de autenticação inválido. Faça login novamente.' 
      });
    }
    
    // Token válido, continua para a próxima função
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Erro na autenticação. Faça login novamente.' 
    });
  }
};


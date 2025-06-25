import { Request, Response, NextFunction } from 'express';

const VALID_TOKEN = 'professor-token-123';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      res.status(401).json({
        error: 'Token de autenticação não encontrado. Faça login novamente.'
      });
      return;
    }

    if (token !== VALID_TOKEN) {
      res.status(401).json({
        error: 'Token de autenticação inválido. Faça login novamente.'
      });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Erro na autenticação. Faça login novamente.'
    });
  }
};
import { Request, Response } from 'express';

// Credenciais fixas para acesso
const PROFESSOR_CREDENTIALS = {
  username: 'admin',
  senha: '123'
};

// Token fixo
const AUTH_TOKEN = 'professor-token-123';

export const authController = {
  // Login
  login(req: Request, res: Response) {
    try {
      const { username, senha } = req.body;

      // Validação dos campos
      if (!username || !senha) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
      }

      // Verificação das credenciais fixas
      if (username !== PROFESSOR_CREDENTIALS.username || senha !== PROFESSOR_CREDENTIALS.senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Definindo cookie com o token fixo
      res.cookie('authToken', AUTH_TOKEN, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite: 'lax',
        secure: false // lembrar de mudar para true quando subir para produção
      });

      // resposta de sucesso
      return res.json({
        message: 'Login realizado com sucesso',
        usuario: {
          username: PROFESSOR_CREDENTIALS.username,
          nome: 'Professor'
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro no processo de login' });
    }
  },

  // Logout
  logout(req: Request, res: Response) {
    try {
      res.clearCookie('authToken');
      return res.json({ message: 'Logout realizado com sucesso' });
    } catch (error) {
      console.error('Erro no logout:', error);
      return res.status(500).json({ error: 'Erro no processo de logout' });
    }
  },

  // Verificar autenticação
  verificar(req: Request, res: Response) {
    try {
      const token = req.cookies.authToken;

      if (token === AUTH_TOKEN) {
        return res.json({
          autenticado: true,
          usuario: {
            username: PROFESSOR_CREDENTIALS.username,
            nome: 'Professor'
          }
        });
      } else {
        return res.status(401).json({ autenticado: false, error: 'Não autenticado' });
      }
    } catch (error) {
      console.error('Erro na verificação:', error);
      return res.status(500).json({ error: 'Erro no processo de verificação' });
    }
  }
};

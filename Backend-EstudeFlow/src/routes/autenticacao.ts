import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Credenciais fixas para o professor
const PROFESSOR_CREDENTIALS = {
  username: 'admin',
  senha: '123'
};

// Token simples para autenticação
const AUTH_TOKEN = 'professor-token-123';

// Rota de login
router.post('/login', (req: Request, res: Response) => {
  try {
    const { username, senha } = req.body;
    
    // Validação básica
    if (!username || !senha) {
      return res.status(400).json({ 
        error: 'Usuário e senha são obrigatórios' 
      });
    }
    
    // Verifica as credenciais
    if (username !== PROFESSOR_CREDENTIALS.username || senha !== PROFESSOR_CREDENTIALS.senha) {
      return res.status(401).json({ 
        error: 'Credenciais inválidas' 
      });
    }
    
    // Define o cookie com o token
    res.cookie('authToken', AUTH_TOKEN, {
      httpOnly: true, // Cookie não acessível via JavaScript
      secure: false, // Para desenvolvimento local (em produção seria true)
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      sameSite: 'lax' // Proteção CSRF básica
    });
    
    res.json({ 
      message: 'Login realizado com sucesso',
      usuario: {
        username: PROFESSOR_CREDENTIALS.username,
        nome: 'Professor'
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota de logout
router.post('/logout', (req: Request, res: Response) => {
  try {
    // Remove o cookie
    res.clearCookie('authToken');
    
    res.json({ 
      message: 'Logout realizado com sucesso' 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

// Rota para verificar se está autenticado
router.get('/verificar', (req: Request, res: Response) => {
  try {
    const token = req.cookies.authToken;
    
    if (token === AUTH_TOKEN) {
      res.json({ 
        autenticado: true,
        usuario: {
          username: PROFESSOR_CREDENTIALS.username,
          nome: 'Professor'
        }
      });
    } else {
      res.status(401).json({ 
        autenticado: false,
        error: 'Não autenticado' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
});

export default router;


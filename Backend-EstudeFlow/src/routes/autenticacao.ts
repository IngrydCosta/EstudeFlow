// @ts-nocheck
import express from 'express';

const router = express.Router();

const PROFESSOR_CREDENTIALS = {
  username: 'admin',
  senha: '123'
};

const AUTH_TOKEN = 'professor-token-123';

// Rota de login
router.post('/login', (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  if (username !== PROFESSOR_CREDENTIALS.username || senha !== PROFESSOR_CREDENTIALS.senha) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  res.cookie('authToken', AUTH_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax'
  });

  return res.json({ message: 'Login realizado com sucesso' });
});

// Rota de logout
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
});

// Rota para verificar autenticação
router.get('/verificar', (req, res) => {
  const token = req.cookies?.authToken;

  if (token === AUTH_TOKEN) {
    return res.json({ autenticado: true });
  }
  return res.status(401).json({ autenticado: false, error: 'Não autenticado' });
});

export default router;
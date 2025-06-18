import { Request, Response } from 'express';
import models from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authController = {
  // Login de usuário
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      
      // Validações
      if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
      }
      
      // Busca o usuário pelo email
      const usuario = await models.usuario.findUnique({
        where: { email }
      });
      
      // Verifica se o usuário existe
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Verifica se a senha está correta
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Gera o token JWT
      const secret = process.env.JWT_SECRET || 'default_secret';
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        secret,
        { expiresIn: '24h' }
      );
      
      // Retorna os dados do usuário e o token
      return res.json({
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        },
        token
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ error: 'Erro no processo de login' });
    }
  },
  
  // Registro de novo usuário
  async registrar(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;
      
      // Validações
      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }
      
      // Verifica se o email já está em uso
      const usuarioExistente = await models.usuario.findUnique({
        where: { email }
      });
      
      if (usuarioExistente) {
        return res.status(400).json({ error: 'Este email já está em uso' });
      }
      
      // Hash da senha
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);
      
      // Cria o usuário
      const usuario = await models.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash
        },
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true
        }
      });
      
      // Gera o token JWT
      const secret = process.env.JWT_SECRET || 'default_secret';
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        secret,
        { expiresIn: '24h' }
      );
      
      // Retorna os dados do usuário e o token
      return res.status(201).json({
        usuario,
        token
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      return res.status(500).json({ error: 'Erro no processo de registro' });
    }
  }
};


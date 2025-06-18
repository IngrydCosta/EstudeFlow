import { Request, Response } from 'express';
import models from '../models';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

export const usuariosController = {
  // Obter perfil do usuário logado
  async perfil(req: Request, res: Response) {
    try {
      const usuarioId = req.usuario.id;
      
      const usuario = await models.usuario.findUnique({
        where: { id: usuarioId },
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      });
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      return res.json(usuario);
    } catch (error) {
      console.error('Erro ao obter perfil:', error);
      return res.status(500).json({ error: 'Erro ao obter perfil do usuário' });
    }
  },
  
  // Atualizar perfil do usuário
  async atualizarPerfil(req: Request, res: Response) {
    try {
      const usuarioId = req.usuario.id;
      const { nome, email, senhaAtual, novaSenha } = req.body;
      
      // Verifica se o usuário existe
      const usuario = await models.usuario.findUnique({
        where: { id: usuarioId }
      });
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      
      // Dados para atualização
      const dadosAtualizacao: any = {};
      
      if (nome) {
        dadosAtualizacao.nome = nome;
      }
      
      if (email && email !== usuario.email) {
        // Verifica se o email já está em uso
        const emailExistente = await models.usuario.findUnique({
          where: { email }
        });
        
        if (emailExistente) {
          return res.status(400).json({ error: 'Este email já está em uso' });
        }
        
        dadosAtualizacao.email = email;
      }
      
      // Se o usuário está tentando alterar a senha
      if (senhaAtual && novaSenha) {
        // Verifica se a senha atual está correta
        const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
        
        if (!senhaCorreta) {
          return res.status(400).json({ error: 'Senha atual incorreta' });
        }
        
        // Hash da nova senha
        const salt = await bcrypt.genSalt(10);
        dadosAtualizacao.senha = await bcrypt.hash(novaSenha, salt);
      }
      
      // Se não há nada para atualizar
      if (Object.keys(dadosAtualizacao).length === 0) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização' });
      }
      
      // Atualiza o usuário
      const usuarioAtualizado = await models.usuario.update({
        where: { id: usuarioId },
        data: dadosAtualizacao,
        select: {
          id: true,
          nome: true,
          email: true,
          createdAt: true,
          updatedAt: true
        }
      });
      
      return res.json(usuarioAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Este email já está em uso' });
        }
      }
      
      return res.status(500).json({ error: 'Erro ao atualizar perfil do usuário' });
    }
  }
};


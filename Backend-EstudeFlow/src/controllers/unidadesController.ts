import { Request, Response } from 'express';
import models from '../models';
import { Prisma } from '@prisma/client';

export const unidadesController = {
  // Listar todas as unidades
  listar: async (req: Request, res: Response) => {
    try {
      const unidades = await models.unidade.findMany();
      return res.json(unidades);
    } catch (error) {
      console.error('Erro ao listar unidades:', error);
      return res.status(500).json({ error: 'Erro ao listar unidades' });
    }
  },
  
  // Obter uma unidade específica
  async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const unidadeId = Number(id);
      
      const unidade = await models.unidade.findUnique({
        where: { id: unidadeId }
      });
      
      if (!unidade) {
        return res.status(404).json({ error: 'Unidade não encontrada' });
      }
      
      return res.json(unidade);
    } catch (error) {
      console.error('Erro ao obter unidade:', error);
      return res.status(500).json({ error: 'Erro ao obter unidade' });
    }
  },
  
  // Criar uma nova unidade
  async criar(req: Request, res: Response) {
    try {
      const { nome } = req.body;
      
      // Validações
      if (!nome) {
        return res.status(400).json({ error: 'Nome da unidade é obrigatório' });
      }
      
      const unidade = await models.unidade.create({
        data: { nome }
      });
      
      return res.status(201).json(unidade);
    } catch (error) {
      console.error('Erro ao criar unidade:', error);
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Já existe uma unidade com este nome' });
        }
      }
      
      return res.status(500).json({ error: 'Erro ao criar unidade' });
    }
  },
  
  // Atualizar uma unidade existente
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const unidadeId = Number(id);
      
      // Validações
      if (!nome) {
        return res.status(400).json({ error: 'Nome da unidade é obrigatório' });
      }
      
      // Verifica se a unidade existe
      const unidadeExistente = await models.unidade.findUnique({
        where: { id: unidadeId }
      });
      
      if (!unidadeExistente) {
        return res.status(404).json({ error: 'Unidade não encontrada' });
      }
      
      const unidade = await models.unidade.update({
        where: { id: unidadeId },
        data: { nome }
      });
      
      return res.json(unidade);
    } catch (error) {
      console.error('Erro ao atualizar unidade:', error);
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Já existe uma unidade com este nome' });
        }
      }
      
      return res.status(500).json({ error: 'Erro ao atualizar unidade' });
    }
  },
  
  // Excluir uma unidade
  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const unidadeId = Number(id);
      
      // Verifica se a unidade existe
      const unidadeExistente = await models.unidade.findUnique({
        where: { id: unidadeId }
      });
      
      if (!unidadeExistente) {
        return res.status(404).json({ error: 'Unidade não encontrada' });
      }
      // Verifica se existem tarefas associadas a esta unidade
      const tarefasAssociadas = await models.tarefa.findFirst({
        where: { unidadeId: unidadeId }
      });
      
      if (tarefasAssociadas) {
        return res.status(400).json({ 
          error: 'Não é possível excluir esta unidade pois existem tarefas associadas a ela' 
        });
      }
      await models.unidade.delete({
        where: { id: unidadeId }
      });
      
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir unidade:', error);
      return res.status(500).json({ error: 'Erro ao excluir unidade' });
    }
  }
};


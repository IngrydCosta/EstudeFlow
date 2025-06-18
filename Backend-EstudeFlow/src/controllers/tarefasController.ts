import { Request, Response } from 'express';
import models from '../models';
import { Prisma } from '@prisma/client';

export const tarefasController = {
  // Listar todas as tarefas do usuário
  async listar(req: Request, res: Response) {
    try {
      const usuarioId = req.usuario.id;
      
      const tarefas = await models.tarefa.findMany({
        where: {
          usuarioId
        },
        include: {
          unidade: true
        }
      });
      
      return res.json(tarefas);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      return res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
  },
  
  // Obter uma tarefa específica
  async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      
      const tarefa = await models.tarefa.findFirst({
        where: {
          id: Number(id),
          usuarioId
        },
        include: {
          unidade: true
        }
      });
      
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      return res.json(tarefa);
    } catch (error) {
      console.error('Erro ao obter tarefa:', error);
      return res.status(500).json({ error: 'Erro ao obter tarefa' });
    }
  },
  
  // Criar uma nova tarefa
  async criar(req: Request, res: Response) {
    try {
      const { nome, dataEntrega, unidadeId } = req.body;
      const usuarioId = req.usuario.id;
      
      // Validações
      if (!nome || !dataEntrega || !unidadeId) {
        return res.status(400).json({ error: 'Dados incompletos' });
      }
      
      // Verifica se a unidade existe
      const unidade = await models.unidade.findUnique({
        where: { id: unidadeId }
      });
      
      if (!unidade) {
        return res.status(404).json({ error: 'Unidade não encontrada' });
      }
      
      const tarefa = await models.tarefa.create({
        data: {
          nome,
          dataEntrega: new Date(dataEntrega),
          usuarioId,
          unidadeId,
          status: 'Pendente'
        }
      });
      
      return res.status(201).json(tarefa);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ error: 'Já existe uma tarefa com este nome' });
        }
      }
      
      return res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  },
  
  // Atualizar uma tarefa existente
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, dataEntrega, status, unidadeId } = req.body;
      const usuarioId = req.usuario.id;
      
      // Verifica se a tarefa existe e pertence ao usuário
      const tarefaExistente = await models.tarefa.findFirst({
        where: {
          id: Number(id),
          usuarioId
        }
      });
      
      if (!tarefaExistente) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      // Verifica se a unidade existe, se foi fornecida
      if (unidadeId) {
        const unidade = await models.unidade.findUnique({
          where: { id: unidadeId }
        });
        
        if (!unidade) {
          return res.status(404).json({ error: 'Unidade não encontrada' });
        }
      }
      
      const tarefa = await models.tarefa.update({
        where: { id: Number(id) },
        data: {
          nome: nome || undefined,
          dataEntrega: dataEntrega ? new Date(dataEntrega) : undefined,
          status: status || undefined,
          unidadeId: unidadeId || undefined
        }
      });
      
      return res.json(tarefa);
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },
  
  // Excluir uma tarefa
  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;
      
      // Verifica se a tarefa existe e pertence ao usuário
      const tarefaExistente = await models.tarefa.findFirst({
        where: {
          id: Number(id),
          usuarioId
        }
      });
      
      if (!tarefaExistente) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }
      
      await models.tarefa.delete({
        where: { id: Number(id) }
      });
      
      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      return res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  }
};

